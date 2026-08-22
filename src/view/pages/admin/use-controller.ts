import type { Post } from '@/shared/models/posts'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function useController() {
  const navigate = useNavigate()

  const [deletePostModalIsOpen, setDeletePostModalIsOpen] = useState(false)
  const [editPostModalIsOpen, setEditPostModalIsOpen] = useState(false)

  const [postSelected, setPostSelected] = useState<Post | null>(null)

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

  const [query, setQuery] = useState('')

  const isLoading = false

  const filtered = posts.filter((p) =>
    `${p.title} ${p.author}`.toLowerCase().includes(query.toLowerCase()),
  )

  function toggleDeletePostModal(state: boolean | null, post: Post | null) {
    if (!deletePostModalIsOpen) {
      setDeletePostModalIsOpen(true)
      setPostSelected(post)
    } else {
      setDeletePostModalIsOpen(state ?? false)
      setTimeout(() => {
        setPostSelected(null)
      }, 300)
    }
  }

  function toggleEditPostModal(state: boolean | null, post: Post | null) {
    if (!editPostModalIsOpen) {
      setEditPostModalIsOpen(true)
      setPostSelected(post)
    } else {
      setEditPostModalIsOpen(state ?? false)
      setTimeout(() => {
        setPostSelected(null)
      }, 300)
    }
  }

  return {
    navigate,
    posts,
    query,
    setQuery,
    isLoading,
    filtered,
    postSelected,
    toggleDeletePostModal,
    deletePostModalIsOpen,
    toggleEditPostModal,
    editPostModalIsOpen,
  }
}
