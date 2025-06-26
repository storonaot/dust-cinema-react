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
import { USER_FIELDS, type NewUser, type User } from '@/entities/user/model'
import { USERS_COLLECTION_NAME } from '@/shared/constants'

export const getUserProfileByUidAPI = async (uid: string): Promise<Nullable<User>> => {
  const ref = doc(db, USERS_COLLECTION_NAME, uid)

  return withApiErrorHandling(async () => {
    const snap = await getDoc(ref)

    if (!snap.exists()) return null

    const data = snap.data()
    return {
      [USER_FIELDS.uid]: uid,
      [USER_FIELDS.name]: data.name,
      [USER_FIELDS.email]: data.email,
      [USER_FIELDS.nickname]: data.nickname,
      [USER_FIELDS.createdAt]: data.createdAt?.toDate().toISOString(),
      [USER_FIELDS.isSuperUser]: data.isSuperUser,
    }
  }, 'getUserProfileByUidAPI')
}

const checkNicknameExists = async (nickname: string): Promise<boolean> => {
  const q = query(
    collection(db, USERS_COLLECTION_NAME),
    where(USER_FIELDS.nickname, '==', nickname)
  )

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
      [USER_FIELDS.uid]: uid,
      [USER_FIELDS.name]: name,
      [USER_FIELDS.email]: email,
      [USER_FIELDS.nickname]: nickname,
      [USER_FIELDS.createdAt]: serverTimestamp(),
    })
  }, 'createUserProfileAPI')
}

export const searchUserByNicknameAPI = async (nickname: string): Promise<User[]> => {
  const q = query(
    collection(db, USERS_COLLECTION_NAME),
    where(USER_FIELDS.nickname, '>=', nickname),
    where(USER_FIELDS.nickname, '<=', nickname + '\uf8ff') // для префиксного поиска
  )

  return withApiErrorHandling(async () => {
    const snap = await getDocs(q)

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as unknown as User[]
  }, 'searchUserByNicknameAPI')
}
