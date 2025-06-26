import { useQuery } from '@tanstack/react-query'
import { getGroupInvitesAPI } from '@/entities/invite/api'
import { GROUP_INVITES_CACHE_KEY, type Invite } from '@/entities/invite/model'

export const useGroupInvites = (groupId: string) => {
  return useQuery<Invite[]>({
    queryKey: [GROUP_INVITES_CACHE_KEY, groupId],
    queryFn: () => getGroupInvitesAPI(groupId),
    enabled: !!groupId,
  })
}
