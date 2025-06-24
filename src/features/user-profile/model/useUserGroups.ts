import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
// import { useUserProfile } from '@/entities/user/hooks/useUserProfile'
import { GROUPS_COLLECTION_NAME, type Group } from '@/entities/group/model'
import { useUserProfile } from './useUserProfile'

export const useUserGroups = () => {
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

export const useInvitedGroups = () => {
  const { data: user } = useUserProfile()

  return useQuery<Group[]>({
    queryKey: ['invited-groups', user?.nickname],
    queryFn: async () => {
      if (!user?.nickname) return []

      const q = query(
        collection(db, GROUPS_COLLECTION_NAME),
        where('invitedNicknames', 'array-contains', user.nickname)
      )

      const snap = await getDocs(q)

      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toISOString(),
      })) as Group[]
    },
    enabled: !!user?.nickname,
  })
}
