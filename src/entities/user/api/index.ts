import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import type { Nullable } from '@/shared/libs/utils'
import { USERS_COLLECTION_NAME, type NewUser, type User } from '@/entities/user/model'

export const getUserProfileByUidAPI = async (uid: string): Promise<Nullable<User>> => {
  const ref = doc(db, USERS_COLLECTION_NAME, uid)

  return withApiErrorHandling(async () => {
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    const data = snap.data()
    return {
      uid,
      name: data.name,
      email: data.email,
      nickname: data.nickname,
      createdAt: data.createdAt?.toDate().toISOString(),
    }
  }, 'getUserProfileByUidAPI')
}

const checkNicknameExists = async (nickname: string): Promise<boolean> => {
  const q = query(collection(db, USERS_COLLECTION_NAME), where('nickname', '==', nickname))

  return withApiErrorHandling(async () => {
    const snapshot = await getDocs(q)
    return !snapshot.empty
  }, 'checkNicknameExists')
}

export const createUserProfileAPI = async (profile: NewUser): Promise<void> => {
  return withApiErrorHandling(async () => {
    const { uid, name, email, nickname } = profile

    const nicknameTaken = await checkNicknameExists(nickname)
    if (nicknameTaken) {
      throw new Error('Никнейм уже занят')
    }

    const ref = doc(db, USERS_COLLECTION_NAME, uid)
    await setDoc(ref, {
      uid,
      name,
      email,
      nickname,
      createdAt: serverTimestamp(),
    })
  }, 'createUserProfileAPI')
}
