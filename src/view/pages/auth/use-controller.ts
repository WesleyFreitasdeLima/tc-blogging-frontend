import { authService } from '@/shared/services/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import z from 'zod'

const FormAuthSchema = z.object({
  login: z.string().min(1, 'Informe o login'),
  password: z.string().min(1, 'Informe a senha'),
})

type FormAuthValues = z.infer<typeof FormAuthSchema>

export function useController() {
  const navigate = useNavigate()

  if (authService.isAuthenticated()) {
    navigate('/')
  }
  const [passwordView, setPasswordView] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormAuthValues>({
    resolver: zodResolver(FormAuthSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: (data: FormAuthValues) => authService.login(data),

    onSuccess: ({ accessToken, user }) => {
      authService.setToken(accessToken)
      authService.setUser(user)
      navigate('/')
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })
    },
  })

  function onSubmitAuth(data: FormAuthValues) {
    clearErrors('root.serverError')

    loginMutation.mutate(data)
  }

  function handleViewPassword() {
    setPasswordView((state) => !state)
  }

  function handleFieldChange() {
    clearErrors('root.serverError')
  }

  return {
    register,
    handleSubmit,

    errors,
    clearErrors,

    onSubmitAuth,

    handleViewPassword,
    passwordView,

    handleFieldChange,

    isLoading: loginMutation.isPending,
  }
}
