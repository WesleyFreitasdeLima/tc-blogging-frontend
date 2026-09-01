import { postsService } from '@/shared/services/post/post.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'

const FormNewPostSchema = z.object({
  title: z
    .string({ error: 'Título é obrigatório' })
    .min(5, { error: 'Crie um título intuitivo' }),

  content: z
    .string({ error: 'Conteúdo é obrigatório' })
    .min(20, { error: 'O conteúdo deve ter no mínimo 20 caracteres' }),
})

type FormNewPostValues = z.infer<typeof FormNewPostSchema>

export function useController() {
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormNewPostValues>({
    resolver: zodResolver(FormNewPostSchema),

    defaultValues: {
      title: '',
      content: '',
    },
  })

  const createMutation = useMutation({
    mutationFn: postsService.create,

    onSuccess: () => {
      navigate('/admin/posts')
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })
    },
  })

  function onSubmitNewPost(data: FormNewPostValues) {
    createMutation.mutate(data)
  }

  return {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    onSubmitNewPost,
  }
}
