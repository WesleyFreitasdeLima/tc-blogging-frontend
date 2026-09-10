import { AppError } from '../erros/error'
import { authService } from '../services/auth/auth.service'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

type HttpParam = string | number | boolean

type HttpParams = Record<string, HttpParam>

interface RequestOptions extends RequestInit {
  params?: HttpParams
}
export interface ApiResponse<T> {
  message: string
  data: T
}

export async function http<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options

  const url = new URL(`${API_URL}${endpoint}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const token = authService.getToken()

  let response: Response
  try {
    response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),

        ...fetchOptions.headers,
      },
    })
  } catch {
    throw new AppError('Não foi possível conectar ao servidor.', 400)
  }

  const body = await response.json().catch(() => null)
  console.log('Retorno: ' + JSON.stringify(body))

  if (!response.ok) {
    if (response.status == 401) authService.logout()
    throw new AppError(
      body?.message ?? 'Ocorreu um erro na comunicação com a API.',
      response.status,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (body as ApiResponse<T>).data
}
