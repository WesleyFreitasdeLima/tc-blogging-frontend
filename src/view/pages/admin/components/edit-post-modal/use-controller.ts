import { queryClient } from '@/shared/config/query-client'
import type { Post } from '@/shared/models/posts'
import { postsService } from '@/shared/services/post/post.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export interface EditPostModalProps {
  post: Post | null
  open: boolean
  onOpenChange: (state: boolean) => void
}

const FormEditPostSchema = z.object({
  title: z
    .string({ error: 'Título é obrigatório' })
    .min(5, { error: 'Crie um título intuitivo' }),
  content: z
    .string({ error: 'Conteúdo é obrigatório' })
    .min(20, { error: 'O conteúdo deve ter no mínimo 20 caracteres' }),
})

type FormEditPostValues = z.infer<typeof FormEditPostSchema>

export function useController({
  open,
  onOpenChange,
  post,
}: EditPostModalProps) {
  const openIsValid = !post ? false : open

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormEditPostValues>({
    defaultValues: {
      content: post?.content,
      title: post?.title,
    },
    resolver: zodResolver(FormEditPostSchema),
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormEditPostValues }) =>
      postsService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      })

      onOpenChange(false)
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })
    },
  })

  function onSubmitEditPost(data: FormEditPostValues) {
    if (!post) {
      return
    }

    clearErrors('root.serverError')
    editMutation.mutate({
      id: post.id,
      data,
    })
  }

  useEffect(() => {
    if (!post) {
      reset({
        content: '',
        title: '',
      })

      return
    }

    reset({
      content: post.content,
      title: post.title,
    })
  }, [post, reset])

  const saveButtonIsDisabled = !isDirty

  return {
    openIsValid,
    onOpenChange,
    post,
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    onSubmitEditPost,
    saveButtonIsDisabled,
  }
}
