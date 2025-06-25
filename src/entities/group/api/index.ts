import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { type Group, type NewGroup } from '@/entities/group/model'
import { GROUPS_COLLECTION_NAME, MEMBERSHIPS_COLLECTION_NAME } from '@/shared/constants'

export const createGroupAPI = async ({ name, owner }: NewGroup): Promise<string> => {
  return await runTransaction(db, async transaction => {
    const groupRef = doc(collection(db, GROUPS_COLLECTION_NAME))
    const membershipRef = doc(db, MEMBERSHIPS_COLLECTION_NAME, `${groupRef.id}_${owner}`)

    transaction.set(groupRef, {
      name,
      owner,
      createdAt: new Date(),
    })

    transaction.set(membershipRef, {
      groupId: groupRef.id,
      uid: owner,
      role: 'owner',
      createdAt: new Date(),
    })

    return groupRef.id
  })
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

// Firestore поддерживает max 10 ID в одном запросе in(...)
const getGroupsByIdsAPI = async (groupIds: string[]): Promise<Group[]> => {
  return withApiErrorHandling(async () => {
    const chunks = []
    const BATCH_SIZE = 10

    for (let i = 0; i < groupIds.length; i += BATCH_SIZE) {
      const chunk = groupIds.slice(i, i + BATCH_SIZE)

      const q = query(collection(db, GROUPS_COLLECTION_NAME), where('__name__', 'in', chunk))

      const snap = await getDocs(q)

      chunks.push(
        ...snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString(),
        }))
      )
    }

    return chunks as Group[]
  }, 'getGroupsByIdsAPI')
}

export { getGroupsByIdsAPI }
