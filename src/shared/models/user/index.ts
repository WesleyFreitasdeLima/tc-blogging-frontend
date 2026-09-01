export enum UserRoleEnum {
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

export interface User {
  id?: number
  name: string
  username: string
  password: string
  email: string
  role: UserRoleEnum
  createdAt: Date
  isActive: boolean
}

export interface CreateUserRequest {
  name: string
  username: string
  password?: string
  email: string
  role: UserRoleEnum
}

export interface UpdateUserRequest {
  name?: string
  username?: string
  password?: string
  email?: string
  role?: UserRoleEnum
  isActive?: boolean
}

export type UserListParams = {
  page?: number
  limit?: number
  search?: string
}
