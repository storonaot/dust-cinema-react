import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useQuery } from '@tanstack/react-query'

import { getUserProfileByUidAPI } from '@/entities/user/api'
import { type User } from '@/entities/user/model'
import type { Nullable } from '@/shared/libs/utils'
import { auth } from '@/shared/libs/firebase'
import { USERS_COLLECTION_NAME } from '@/shared/constants'

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
