import { UserRoleEnum } from '@/shared/models/user'
import { userService } from '@/shared/services/users/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'

const FormNewUserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  role: z.enum(UserRoleEnum),
})

type FormNewUserValues = z.infer<typeof FormNewUserSchema>

export function useController() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormNewUserValues>({
    resolver: zodResolver(FormNewUserSchema),
  })

  const createMutation = useMutation({
    mutationFn: userService.create,

    onSuccess: () => {
      navigate('/admin/users')
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })

      return
    },
  })

  function onSubmitNewUser(data: FormNewUserValues) {
    createMutation.mutate(data)
  }

  return {
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    onSubmitNewUser,
  }
}
