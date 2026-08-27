import { Button } from '@/view/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/view/components/ui/sheet'
import { useController, type EditUserModalProps } from './use-controller'
import { UserRoleEnum } from '@/shared/models/user'

export function EditUserModal(props: EditUserModalProps) {
  const {
    openIsValid,
    onOpenChange,
    errors,
    handleSubmit,
    clearErrors,
    register,
    onSubmitEditUser,
    saveButtonIsDisabled,
  } = useController(props)

  return (
    <Sheet open={openIsValid} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmitEditUser)}>
          <SheetHeader>
            <SheetTitle>Editar postagem</SheetTitle>
            <SheetDescription>
              Faça alterações do usuário aqui. Clique em{' '}
              <span className="text-foreground">salvar alterações</span> quando
              terminar.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="space-y-2">
              {errors.root?.serverError && (
                <div className="text-red-500">
                  {errors.root.serverError.message}
                </div>
              )}
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Login
                <input
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  placeholder="Nome do usuário"
                  {...register('username', {
                    onChange: () => clearErrors('root.serverError'),
                  })}
                />
              </label>

              {errors.username?.message && (
                <p className="text-sm text-destructive">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Nome
                <input
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  placeholder="Nome do usuário"
                  {...register('name', {
                    onChange: () => clearErrors('root.serverError'),
                  })}
                />
              </label>

              {errors.name?.message && (
                <p className="text-sm text-destructive">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                E-mail
                <input
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  placeholder="teste@teste.com"
                  type="email"
                  {...register('email', {
                    onChange: () => clearErrors('root.serverError'),
                  })}
                />
              </label>

              {errors.email?.message && (
                <p className="text-sm text-destructive">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Permissão
                <select
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  {...register('role')}
                >
                  <option value={UserRoleEnum.TEACHER}>Professor</option>

                  <option value={UserRoleEnum.ADMIN}>Administrador</option>
                </select>
              </label>

              {errors.role?.message && (
                <p className="text-sm text-destructive">
                  {errors.role?.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Nova senha
                <input
                  type="password"
                  placeholder="Deixe vazio para não alterar"
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  {...register('password', {
                    onChange: () => clearErrors('root.serverError'),
                  })}
                />
              </label>

              {errors.password?.message && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={saveButtonIsDisabled}>
              Salvar alterações
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Cancelar</Button>
            </SheetClose>
          </SheetFooter>
        </form>{' '}
      </SheetContent>
    </Sheet>
  )
}
