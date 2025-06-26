import { useQuery } from '@tanstack/react-query'
import type { Invite } from '@/entities/invite/model'

export const useUserInvites = (userId?: string) => {
  return useQuery<Invite[]>({
    queryKey: ['user-invites', userId],
    queryFn: () => (userId ? getUserInvitesAPI(userId) : Promise.resolve([])),
    enabled: !!userId,
  })
}
