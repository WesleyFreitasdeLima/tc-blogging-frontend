import type { Post } from '@/shared/models/posts'
import { useParams } from 'react-router'

export function useController() {
  const { id: postId } = useParams()

  console.log(postId)

  const post: Post = {
    id: 1,
    author: 'Prof. Teste',
    title: 'A universidade como espaço de escuta',
    content:
      'Reflexões sobre como a escuta ativa transforma a experiência de aprender e ensinar.',
    readTime: 1,
    createdAt: '18 ago 2026',
  }

  return {
    post,
  }
}
