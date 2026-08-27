import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { authService } from '@/shared/services/auth/auth.service'

const FormAuthSchema = z.object({
  login: z.string().min(1, 'Informe o login'),
  password: z.string().min(1, 'Informe a senha'),
})

type FormAuthValues = z.infer<typeof FormAuthSchema>

export function useController() {
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate()

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
    mutationFn: authService.login,

    onSuccess: ({ accessToken }) => {
      authService.setToken(accessToken)
      navigate('/')
    },

    onError: (error) => {
      setError('root.serverError', {
        message: error.message,
      })

      return
    },
  })

  function onSubmitAuth(data: FormAuthValues) {
    loginMutation.mutate(data)
  }

  function handleViewPassword() {
    setPasswordView((state) => !state)
  }

  return {
    register,
    handleSubmit,
    errors,
    clearErrors,
    onSubmitAuth,
    handleViewPassword,
    passwordView,
  }
}
