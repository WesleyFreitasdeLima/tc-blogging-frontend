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
import { useController, type EditPostModalProps } from './use-controller'

export function EditPostModal(props: EditPostModalProps) {
  const {
    openIsValid,
    onOpenChange,
    errors,
    handleSubmit,
    register,
    onSubmitEditPost,
    saveButtonIsDisabled,
  } = useController(props)

  return (
    <Sheet open={openIsValid} onOpenChange={onOpenChange}>
      <form onSubmit={handleSubmit(onSubmitEditPost)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar postagem</SheetTitle>
            <SheetDescription>
              Faça alterações da postagem aqui. Clique em{' '}
              <span className="text-foreground">salvar alterações</span> quando
              terminar.
            </SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Título
                <input
                  className="rounded-lg border border-input bg-card px-4 py-3 font-normal outline-none ring-primary focus:ring-2"
                  placeholder="Um título que desperte curiosidade"
                  {...register('title')}
                />
              </label>

              {errors.title?.message && (
                <p className="text-sm text-destructive">
                  {errors.title?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex flex-col gap-2 text-sm font-semibold">
                Conteúdo
                <textarea
                  className="min-h-64 resize-y rounded-lg border border-input bg-card px-4 py-3 font-normal leading-7 outline-none ring-primary focus:ring-2"
                  placeholder="Escreva a sua reflexão..."
                  {...register('content')}
                />
              </label>

              {errors.content?.message && (
                <p className="text-sm text-destructive">
                  {errors.content?.message}
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
        </SheetContent>
      </form>
    </Sheet>
  )
}
