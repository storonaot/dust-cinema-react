import { createGroupAPI, GROUPS_CACHE_KEY } from '@/entities/group/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useGroupActions = () => {
  const queryClient = useQueryClient()

  const createGroup = useMutation({
    mutationFn: createGroupAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_CACHE_KEY] })
    },
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  return {
    createGroup,
  }
}
