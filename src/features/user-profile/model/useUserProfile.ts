import { useQuery } from '@tanstack/react-query'
import { auth } from '@/shared/libs/firebase'
import { getUserProfileByUidAPI, USERS_COLLECTION_NAME, type User } from '@/entities/user/model'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import type { Nullable } from '@/shared/libs/utils'

export const useAuthUid = () => {
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUid(user?.uid || null)
    })

    return () => unsubscribe()
  }, [])

  return uid
}

export const useUserProfile = () => {
  const uid = useAuthUid()

  return useQuery<Nullable<User>>({
    queryKey: [USERS_COLLECTION_NAME, uid],
    queryFn: async () => {
      if (!uid) return null
      return getUserProfileByUidAPI(uid)
    },
    enabled: !!uid,
    staleTime: 1000 * 60 * 5, // 5 минут
  })
}
