import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { GROUPS_COLLECTION_NAME, type Group } from '@/entities/group/model'
import { useUserProfile } from '@/entities/user/hooks'

export const useGroups = () => {
  const { data: user } = useUserProfile()

  return useQuery<Group[]>({
    queryKey: ['user-groups', user?.nickname],
    queryFn: async () => {
      if (!user?.nickname) return []

      const q = query(
        collection(db, GROUPS_COLLECTION_NAME),
        where('members', 'array-contains', user.nickname)
      )

      const snap = await getDocs(q)

      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
      })) as Group[]
    },
    enabled: !!user?.nickname,
  })
}
