import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { GROUPS_COLLECTION_NAME, type Group, type NewGroup } from '@/entities/group/model'

export const createGroupAPI = async (group: NewGroup): Promise<string> => {
  return withApiErrorHandling(async () => {
    const docRef = await addDoc(collection(db, GROUPS_COLLECTION_NAME), {
      name: group.name,
      ownerUid: group.owner,
      members: group.members,
      invitedUsers: group.invitedUsers,
      createdAt: serverTimestamp(),
    })

    return docRef.id
  }, 'createGroupAPI')
}

export const getUserGroupsAPI = async (nickname: string): Promise<Group[]> => {
  const q = query(
    collection(db, GROUPS_COLLECTION_NAME),
    where('members', 'array-contains', nickname)
  )
  const snap = await getDocs(q)
  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate().toISOString(),
  })) as Group[]
}
