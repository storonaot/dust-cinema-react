import { useQuery } from '@tanstack/react-query'
import { useUserProfile } from '@/entities/user/hooks'
import { GROUPS_CACHE_KEY, type Group } from '@/entities/group/model'
import { getMembershipsByUidAPI } from '@/entities/membership/api'
import { getGroupsByIdsAPI } from '@/entities/group/api'

export const useGroups = () => {
  const { data: user } = useUserProfile()

  return useQuery<Group[]>({
    queryKey: [GROUPS_CACHE_KEY],
    queryFn: async () => {
      if (!user?.uid) return []

      // 1. Получаем membership'ы текущего пользователя
      const memberships = await getMembershipsByUidAPI(user.uid)

      const groupIds = memberships.map(m => m.groupId)

      if (groupIds.length === 0) return []

      // 2. Получаем сами группы по ID
      return await getGroupsByIdsAPI(groupIds)
    },
    enabled: !!user?.uid,
  })
}
