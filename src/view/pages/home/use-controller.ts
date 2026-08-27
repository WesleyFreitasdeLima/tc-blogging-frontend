import type { Post } from '@/shared/models/posts'
import { postsService } from '@/shared/services/post/post.service'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useController() {
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
    queryKey: ['posts', query],

    initialPageParam: 1,

    queryFn: ({ pageParam }) => {
      if (query.trim()) {
        return postsService.search({
          page: pageParam,
          search: query.trim(),
          limit: 9,
        })
      }

      return postsService.list({
        page: pageParam,
        limit: 9,
      })
    },

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 9) {
        return undefined
      }

      return allPages.length + 1
    },

    placeholderData: keepPreviousData,
  })

  const posts: Post[] = data?.pages.flatMap((page) => page) ?? []

  function loadMore() {
    fetchNextPage()
  }

  return {
    query,
    setQuery,

    posts,

    isLoading,
    isError,
    error,

    loadMore,
    hasNextPage,
    isLoadingMore: isFetchingNextPage,
  }
}
