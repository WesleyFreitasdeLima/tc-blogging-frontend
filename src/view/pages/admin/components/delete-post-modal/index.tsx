import type { Post } from '@/shared/models/posts'
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

interface DeletePostModalProps {
  post: Post | null
  open: boolean
  onOpenChange: (state: boolean) => void
}

export function DeletePostModal({
  post,
  open,
  onOpenChange,
}: DeletePostModalProps) {
  const openIsValid = !post ? false : open

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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button variant="destructive">Deletar</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
