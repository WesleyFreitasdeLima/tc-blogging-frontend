export type UserRole = 'admin' | 'teacher'

export interface User {
  id: number
  name: string
  username: string
  email: string
  role: UserRole
}

export interface LoginRequest {
  login: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}
