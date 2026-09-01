import {
  UserRoleEnum,
  type UpdateUserRequest,
  type User,
} from '@/shared/models/user'
import { userService } from '@/shared/services/users/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import z from 'zod'

export interface EditUserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (state: boolean) => void
}

const FormEditPostSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().optional(),
  email: z.string(),
  role: z.enum(UserRoleEnum),
})

type FormEditUserValues = z.infer<typeof FormEditPostSchema>

export function useController() {
  const navigate = useNavigate()
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
    resolver: zodResolver(FormEditPostSchema),
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: () => userService.getUser(),
  })

  const user: User | null = data ?? null

  const editMutation = useMutation({
    mutationFn: (data: UpdateUserRequest) => userService.update(data),

    onSuccess: () => {
      navigate('/')
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
      password: data.password,
      email: data.email,
      role: data.role,
    }

    if (!data.password) {
      payload.password = data.password
    }

    editMutation.mutate(payload)
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

  return {
    user,
    register,
    handleSubmit,
    setError,
    clearErrors,
    isLoading,
    isError,
    error,
    errors,
    onSubmitEditUser,
    isSaving: editMutation.isPending,
    saveButtonIsDisabled: !isDirty,
  }
}
