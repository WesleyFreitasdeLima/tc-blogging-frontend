import type { Post } from '@/shared/models/posts'
import { postsService } from '@/shared/services/post/post.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

export function useController() {
  const { id } = useParams<{ id: string }>()

  const postId = Number(id)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => postsService.findById(postId),
    enabled: Number.isInteger(postId) && postId > 0,
  })

  const post: Post | null = data ?? null

  return {
    post,
    isLoading,
    isError,
    error,
  }
}
