import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { GROUPS_COLLECTION_NAME, type NewGroup } from '@/entities/group/model'

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
