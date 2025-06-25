import { useMutation, useQueryClient } from '@tanstack/react-query'

import { GROUPS_CACHE_KEY } from '@/entities/group/model'
import { createGroupAPI, updateGroupAPI } from '@/entities/group/api'

export const useGroupActions = () => {
  const queryClient = useQueryClient()

  const invalidateGroups = () => {
    queryClient.invalidateQueries({ queryKey: [GROUPS_CACHE_KEY] })
  }

  const createGroup = useMutation({
    mutationFn: createGroupAPI,
    onSuccess: invalidateGroups,
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  const updateGroup = useMutation({
    mutationFn: updateGroupAPI,
    onSuccess: invalidateGroups,
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  return {
    createGroup,
    updateGroup,
  }
}
