import { collection, addDoc, serverTimestamp, where, getDocs, query } from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { MEMBERSHIP_FIELDS, type Membership, type NewMembership } from '@/entities/membership/model'
import { MEMBERSHIPS_COLLECTION_NAME } from '@/shared/constants'

export const createMembershipAPI = async ({
  groupId,
  uid,
  role,
}: NewMembership): Promise<string> => {
  return withApiErrorHandling(async () => {
    const docRef = await addDoc(collection(db, MEMBERSHIPS_COLLECTION_NAME), {
      groupId,
      uid,
      role,
      createdAt: serverTimestamp(),
    })

    return docRef.id
  }, 'createMembershipAPI')
}

export const getMembershipsByUidAPI = async (uid: string): Promise<Membership[]> => {
  return withApiErrorHandling(async () => {
    const q = query(
      collection(db, MEMBERSHIPS_COLLECTION_NAME),
      where(MEMBERSHIP_FIELDS.uid, '==', uid)
    )

    const snap = await getDocs(q)

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Membership[]
  }, 'getMembershipsByUserUidAPI')
}
