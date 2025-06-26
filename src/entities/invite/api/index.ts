import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { INVITES_COLLECTION_NAME } from '@/shared/constants'
import { INVITE_FIELDS, type Invite, InviteStatus, type NewInvite } from '@/entities/invite/model'

export const createInviteAPI = async (invite: NewInvite): Promise<string> => {
  return withApiErrorHandling(async () => {
    const docRef = await addDoc(collection(db, INVITES_COLLECTION_NAME), {
      groupId: invite.groupId,
      invitedUid: invite.invitedUid,
      inviterUid: invite.inviterUid,
      status: 'pending',
      createdAt: serverTimestamp(),
    })

    return docRef.id
  }, 'createInviteAPI')
}

export const getUserInvitesAPI = async (userId: string): Promise<Invite[]> => {
  const q = query(
    collection(db, INVITES_COLLECTION_NAME),
    where(INVITE_FIELDS.invitedUid, '==', userId),
    where(INVITE_FIELDS.status, '==', 'pending')
  )

  return withApiErrorHandling(async () => {
    const snap = await getDocs(q)

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Invite[]
  }, 'getUserInvitesAPI')
}

export const updateInviteAPI = async (
  inviteId: string,
  status: InviteStatus.ACCEPTED | InviteStatus.DECLINED
) => {
  return withApiErrorHandling(async () => {
    const ref = doc(db, INVITES_COLLECTION_NAME, inviteId)
    await updateDoc(ref, { status })
  }, 'updateInviteAPI')
}
