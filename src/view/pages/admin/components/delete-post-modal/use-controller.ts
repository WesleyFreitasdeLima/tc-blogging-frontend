import { queryClient } from '@/shared/config/query-client'
import type { Post } from '@/shared/models/posts'
import { postsService } from '@/shared/services/post/post.service'
import { useMutation } from '@tanstack/react-query'

export interface DeletePostModalProps {
  post: Post | null
  open: boolean
  onOpenChange: (state: boolean) => void
}

export function useController({
  post,
  open,
  onOpenChange,
}: DeletePostModalProps) {
  const openIsValid = !!post && open

  const deleteMutation = useMutation({
    mutationFn: (id: number) => postsService.remove(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })

      onOpenChange(false)
    },
  })

  function onDeletePost() {
    if (!post) {
      return
    }

    deleteMutation.mutate(post.id)
  }

  return {
    openIsValid,
    onOpenChange,
    post,
    onDeletePost,

    isLoading: deleteMutation.isPending,
    isError: deleteMutation.isError,
    error: deleteMutation.error,
  }
}
