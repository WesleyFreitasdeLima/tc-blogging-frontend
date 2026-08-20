import { zodResolver } from '@hookform/resolvers/zod'
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormNewPostValues>({
    resolver: zodResolver(FormNewPostSchema),
  })

  function onSubmitNewPost(data: FormNewPostValues) {
    console.log(data)
    navigate('/')
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitNewPost,
  }
}
