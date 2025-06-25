import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMembershipAPI } from '@/entities/membership/api'
import { MEMBERSHIPS_CACHE_KEY } from '@/entities/membership/model'

export const useMembershipActions = () => {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [MEMBERSHIPS_CACHE_KEY] })
  }

  const create = useMutation({
    mutationFn: createMembershipAPI,
    onSuccess: invalidate,
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  return {
    createMembership: create,
  }
}
