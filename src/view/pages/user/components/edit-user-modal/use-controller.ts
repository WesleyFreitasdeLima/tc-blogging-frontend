import { queryClient } from '@/shared/config/query-client'
import {
  UserRoleEnum,
  type UpdateUserRequest,
  type User,
} from '@/shared/models/user'
import { userService } from '@/shared/services/users/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export interface EditUserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (state: boolean) => void
}

const FormEditUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),

  username: z.string().min(1, 'Usuário é obrigatório'),

  password: z.string(),

  email: z.email('E-mail inválido'),

  role: z.enum(UserRoleEnum),
})

type FormEditUserValues = z.infer<typeof FormEditUserSchema>

export function useController({
  open,
  onOpenChange,
  user,
}: EditUserModalProps) {
  const openIsValid = !user ? false : open

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormEditUserValues>({
    defaultValues: {
      name: '',
      username: '',
      password: '',
      email: '',
      role: UserRoleEnum.TEACHER,
    },
    resolver: zodResolver(FormEditUserSchema),
  })

  const editMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) =>
      userService.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })

      onOpenChange(false)
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })
    },
  })

  function onSubmitEditUser(data: FormEditUserValues) {
    if (!user?.id) {
      return
    }

    clearErrors('root.serverError')

    const payload: UpdateUserRequest = {
      name: data.name,
      username: data.username,
      email: data.email,
      role: data.role,
    }

    if (data.password.trim()) {
      payload.password = data.password
    }

    editMutation.mutate({
      id: user.id,
      data: payload,
    })
  }

  useEffect(() => {
    if (!user) {
      reset({
        name: '',
        username: '',
        password: '',
        email: '',
        role: UserRoleEnum.TEACHER,
      })

      return
    }

    reset({
      name: user.name,
      username: user.username,
      password: '',
      email: user.email,
      role: user.role,
    })
  }, [user, reset])

  const saveButtonIsDisabled = !isDirty
  console.log(errors)
  return {
    openIsValid,
    onOpenChange,
    user,
    register,
    handleSubmit,
    setError,
    clearErrors,
    errors,
    onSubmitEditUser,
    saveButtonIsDisabled,
  }
}
