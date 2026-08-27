import { http } from '@/shared/lib/http'

import type {
  CreateUserRequest,
  User,
  UserListParams,
  UpdateUserRequest,
} from '@/shared/models/user'

export const userService = {
  async list(params?: UserListParams | undefined): Promise<User[]> {
    return http<User[]>('/users/', {
      method: 'GET',
      params,
    })
  },

  async search(params: UserListParams): Promise<User[]> {
    return http<User[]>('/users/search', {
      method: 'GET',
      params,
    })
  },

  async findById(id: number): Promise<User> {
    return http<User>(`/users/${id}`, {
      method: 'GET',
    })
  },

  async create(data: CreateUserRequest): Promise<User> {
    return http<User>('/users/', {
      method: 'User',
      body: JSON.stringify(data),
    })
  },

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    return http<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async remove(id: number): Promise<void> {
    return http<void>(`/users/${id}`, {
      method: 'DELETE',
    })
  },
}
