import { useQuery } from '@tanstack/react-query'
import { GROUP_CACHE_KEY } from '@/entities/group/model'
import { getGroupByIdAPI } from '@/entities/group/api'

export const useGroup = (groupId?: string) => {
  return useQuery({
    queryKey: [GROUP_CACHE_KEY, groupId],
    queryFn: () => (groupId ? getGroupByIdAPI(groupId) : Promise.reject('No groupId')),
    enabled: !!groupId,
  })
}
