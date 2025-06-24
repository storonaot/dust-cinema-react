import { createUserProfileAPI, USER_PROFILE_CACHE_KEY } from '@/entities/user/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
