import { http } from '@/shared/lib/http'

const TOKEN_KEY = 'accessToken'

export interface LoginRequest {
  login: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export const authService = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    return http<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
