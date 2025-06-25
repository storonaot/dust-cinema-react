import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_PROFILE_CACHE_KEY } from '@/entities/user/model'
import { createUserProfileAPI } from '@/entities/user/api'

export const useUserProfileActions = () => {
  const queryClient = useQueryClient()

  const create = useMutation({
    mutationFn: createUserProfileAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE_CACHE_KEY] })
    },
    onError: (error: Error) => {
      alert(error.message)
    },
  })

  return {
    createProfile: create,
  }
}
