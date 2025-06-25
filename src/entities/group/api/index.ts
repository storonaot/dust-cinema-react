import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { GROUPS_COLLECTION_NAME, type Group, type NewGroup } from '@/entities/group/model'

export const createGroupAPI = async (group: NewGroup): Promise<string> => {
  return withApiErrorHandling(async () => {
    const docRef = await addDoc(collection(db, GROUPS_COLLECTION_NAME), {
      name: group.name,
      ownerUid: group.owner,
      members: [group.owner],
      createdAt: serverTimestamp(),
    })

    return docRef.id
  }, 'createGroupAPI')
}

export const getGroupsAPI = async (nickname: string): Promise<Group[]> => {
  const q = query(
    collection(db, GROUPS_COLLECTION_NAME),
    where('members', 'array-contains', nickname)
  )

  return withApiErrorHandling(async () => {
    const snap = await getDocs(q)
    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    })) as Group[]
  }, 'getGroupsAPI')
}

export const getGroupByIdAPI = async (id: string): Promise<Group> => {
  const ref = doc(db, GROUPS_COLLECTION_NAME, id)

  return withApiErrorHandling(async () => {
    const snap = await getDoc(ref)
    if (!snap.exists()) throw new Error('Group not found')

    return {
      id: snap.id,
      ...snap.data(),
      createdAt: snap.data().createdAt?.toDate().toISOString(),
    } as Group
  }, 'getGroupByIdAPI')
}

export const updateGroupAPI = async ({
  id,
  payload,
}: {
  id: string
  payload: Partial<Omit<Group, 'id' | 'createdAt'>>
}): Promise<void> => {
  return withApiErrorHandling(async () => {
    const ref = doc(db, GROUPS_COLLECTION_NAME, id)
    await updateDoc(ref, payload)
  }, 'updateGroupAPI')
}
