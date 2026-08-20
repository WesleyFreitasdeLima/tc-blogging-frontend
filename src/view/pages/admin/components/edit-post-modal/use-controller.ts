import type { Post } from '@/shared/models/posts'
import { zodResolver } from '@hookform/resolvers/zod'
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
    formState: { errors, isDirty },
    setValues,
  } = useForm<FormEditPostValues>({
    defaultValues: {
      content: post?.content,
      title: post?.title,
    },
    resolver: zodResolver(FormEditPostSchema),
  })

  function onSubmitEditPost(data: FormEditPostValues) {
    console.log(data)
  }

  useEffect(() => {
    setValues({
      content: post?.content,
      title: post?.title,
    })
  }, [post])

  const saveButtonIsDisabled = !isDirty

  return {
    openIsValid,
    onOpenChange,
    post,
    register,
    handleSubmit,
    errors,
    onSubmitEditPost,
    saveButtonIsDisabled,
  }
}
