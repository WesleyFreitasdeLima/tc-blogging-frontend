import type { Post } from '@/shared/models/posts'
import { postsService } from '@/shared/services/post/post.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function useController() {
  const navigate = useNavigate()

  const [deletePostModalIsOpen, setDeletePostModalIsOpen] = useState(false)
  const [editPostModalIsOpen, setEditPostModalIsOpen] = useState(false)

  const [postSelected, setPostSelected] = useState<Post | null>(null)

  const [query, setQuery] = useState('')

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      postsService.list({
        page: pageParam,
        limit: 9,
      }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) {
        return undefined
      }

      return allPages.length + 1
    },
  })

  const posts: Post[] = data?.pages.flatMap((page) => page) ?? []

  const filtered = posts.filter((p) =>
    `${p.title} ${p.createdBy.name}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  function loadMore() {
    fetchNextPage()
  }

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
    filtered,

    query,
    setQuery,

    isLoading,
    isError,
    error,

    loadMore,
    hasNextPage,
    isLoadingMore: isFetchingNextPage,

    postSelected,

    toggleDeletePostModal,
    deletePostModalIsOpen,

    toggleEditPostModal,
    editPostModalIsOpen,
  }
}
