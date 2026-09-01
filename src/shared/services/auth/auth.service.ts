import { http } from '@/shared/lib/http'
import { UserRoleEnum, type User } from '@/shared/models/user'

const TOKEN_KEY = 'accessToken'
const USER_KEY = 'user'

export interface LoginRequest {
  login: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
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

  setUser(user: User) {
    user.password = ''

    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY)

    if (!user) {
      return null
    }

    try {
      return JSON.parse(user)
    } catch {
      return null
    }
  },

  isAdmin() {
    return this.getUser()?.role === UserRoleEnum.ADMIN
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
