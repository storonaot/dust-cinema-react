import { useQuery } from '@tanstack/react-query'
import { USER_INVITES_CACHE_KEY, type Invite } from '@/entities/invite/model'
import { getUserInvitesAPI } from '@/entities/invite/api'

export const useUserInvites = (userId?: string) => {
  return useQuery<Invite[]>({
    queryKey: [USER_INVITES_CACHE_KEY, userId],
    queryFn: () => (userId ? getUserInvitesAPI(userId) : Promise.resolve([])),
    enabled: !!userId,
  })
}
