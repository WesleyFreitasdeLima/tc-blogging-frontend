import type { User } from '@/shared/models/user'
import { userService } from '@/shared/services/users/user.service'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function useController() {
  const navigate = useNavigate()

  const [deleteUserModalIsOpen, setDeleteUserModalIsOpen] = useState(false)
  const [editUserModalIsOpen, setEditUserModalIsOpen] = useState(false)

  const [userSelected, setUserSelected] = useState<User | null>(null)

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
    queryKey: ['Users'],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      userService.list({
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

  const users: User[] = data?.pages.flatMap((page) => page) ?? []

  const filtered = users.filter((p) =>
    `${p.name} ${p.username} ${p.email}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  function loadMore() {
    fetchNextPage()
  }

  function toggleDeleteUserModal(state: boolean | null, user: User | null) {
    if (!deleteUserModalIsOpen) {
      setDeleteUserModalIsOpen(true)
      setUserSelected(user)
    } else {
      setDeleteUserModalIsOpen(state ?? false)

      setTimeout(() => {
        setUserSelected(null)
      }, 300)
    }
  }

  function toggleEditUserModal(state: boolean | null, user: User | null) {
    if (!editUserModalIsOpen) {
      setEditUserModalIsOpen(true)
      setUserSelected(user)
    } else {
      setEditUserModalIsOpen(state ?? false)

      setTimeout(() => {
        setUserSelected(null)
      }, 300)
    }
  }

  return {
    navigate,

    users,
    filtered,

    query,
    setQuery,

    isLoading,
    isError,
    error,

    loadMore,
    hasNextPage,
    isLoadingMore: isFetchingNextPage,

    userSelected,

    toggleDeleteUserModal,
    deleteUserModalIsOpen,

    toggleEditUserModal,
    editUserModalIsOpen,
  }
}
