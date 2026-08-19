import type { Post } from '@/shared/models/posts'
import { useState } from 'react'

export function useController() {
  const [query, setQuery] = useState('')

  const isLoading = false

  const posts: Post[] = [
    {
      id: 1,
      author: 'Prof. Teste',
      content:
        'Reflexões sobre como a escuta ativa transforma a experiência de aprender e ensinar.',
      title: 'A universidade como espaço de escuta',
      createdAt: '18 ago 2026',
      readTime: 2,
    },
  ]

  return {
    query,
    setQuery,
    isLoading,
    posts,
  }
}
