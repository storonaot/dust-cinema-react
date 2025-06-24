import { useQuery } from '@tanstack/react-query'
import { auth } from '@/shared/libs/firebase'
import { getUserProfileByUidAPI, type UserProfile } from '@/entities/user/model'

export const useUserProfile = () => {
  const uid = auth.currentUser?.uid

  return useQuery<UserProfile | null>({
    queryKey: ['user-profile', uid],
    queryFn: async () => {
      if (!uid) return null
      return getUserProfileByUidAPI(uid)
    },
    enabled: !!uid,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}
