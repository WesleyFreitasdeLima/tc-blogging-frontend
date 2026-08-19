import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useNavigate } from 'react-router'
import { useState } from 'react'

const FormAuthSchema = z.object({
  email: z.string().email({ error: 'E-mail inválido' }),
  password: z.string().min(4, { error: 'Senha inválida' }),
})

type FormAuthValues = z.infer<typeof FormAuthSchema>

export function useController() {
  const [passwordView, setPasswordView] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAuthValues>({
    resolver: zodResolver(FormAuthSchema),
  })

  function onSubmitAuth(data: FormAuthValues) {
    console.log(data)
    navigate('/')
  }

  function handleViewPassword() {
    setPasswordView((state) => !state)
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmitAuth,
    handleViewPassword,
    passwordView,
  }
}
