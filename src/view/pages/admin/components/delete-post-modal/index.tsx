import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/view/components/ui/alert-dialog'
import { Button } from '@/view/components/ui/button'

import { useController, type DeletePostModalProps } from './use-controller'

export function DeletePostModal(props: DeletePostModalProps) {
  const {
    openIsValid,
    onOpenChange,
    post,
    onDeletePost,
    isLoading,
    isError,
    error,
  } = useController(props)

  return (
    <AlertDialog open={openIsValid} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja deletar?</AlertDialogTitle>

          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente{' '}
            <span className="text-foreground">{post?.title}</span> de nossos
            servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isError && (
          <p className="text-sm text-destructive">{error?.message}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              type="button"
              variant="destructive"
              disabled={isLoading}
              onClick={onDeletePost}
            >
              {isLoading ? 'Deletando...' : 'Deletar'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
