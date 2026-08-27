import { http } from '@/shared/lib/http'

import type {
  CreatePostRequest,
  Post,
  PostListParams,
  UpdatePostRequest,
} from '@/shared/models/posts'

export const postsService = {
  async list(params?: PostListParams | undefined): Promise<Post[]> {
    return http<Post[]>('/posts', {
      method: 'GET',
      params,
    })
  },

  async search(params: PostListParams): Promise<Post[]> {
    return http<Post[]>('/posts/search', {
      method: 'GET',
      params,
    })
  },

  async findById(id: number): Promise<Post> {
    return http<Post>(`/posts/${id}`, {
      method: 'GET',
    })
  },

  async create(data: CreatePostRequest): Promise<Post> {
    return http<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async update(id: number, data: UpdatePostRequest): Promise<Post> {
    return http<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  async remove(id: number): Promise<void> {
    return http<void>(`/posts/${id}`, {
      method: 'DELETE',
    })
  },
}
