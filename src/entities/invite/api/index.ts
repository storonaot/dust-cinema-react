import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { auth, db } from '@/shared/libs/firebase'
import { withApiErrorHandling } from '@/shared/libs/error-handling'
import { INVITES_COLLECTION_NAME, MEMBERSHIPS_COLLECTION_NAME } from '@/shared/constants'
import { INVITE_FIELDS, type Invite, InviteStatus, type NewInvite } from '@/entities/invite/model'
import { MEMBERSHIP_FIELDS, MembershipRole, type NewMembership } from '@/entities/membership/model'

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

// export const getGroupInvitesAPI = async (groupId: string): Promise<Invite[]> => {
//   return withApiErrorHandling(async () => {
//     const q = query(collection(db, INVITES_COLLECTION_NAME), where('groupId', '==', groupId))

//     const snap = await getDocs(q)

//     return snap.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       createdAt: doc.data().createdAt?.toDate().toISOString(),
//     })) as Invite[]
//   }, 'getGroupInvitesAPI')
// }

export const getGroupInvitesAPI = async (groupId: string): Promise<Invite[]> => {
  return withApiErrorHandling(async () => {
    const q = query(
      collection(db, INVITES_COLLECTION_NAME),
      where(INVITE_FIELDS.groupId, '==', groupId)
    )

    const snap = await getDocs(q)
    const currentUid = auth.currentUser?.uid

    return snap.docs
      .map(doc => {
        const raw = doc.data()
        const data = raw as Omit<Invite, 'id' | 'createdAt'>
        const createdAt = raw.createdAt?.toDate().toISOString()

        return {
          id: doc.id,
          ...data,
          createdAt,
        } satisfies Invite
      })
      .filter(invite => invite.invitedUid !== currentUid)
  }, 'getGroupInvitesAPI')
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

export const acceptInviteAPI = async (invite: Invite): Promise<void> => {
  const inviteRef = doc(db, INVITES_COLLECTION_NAME, invite.id)
  const membershipRef = doc(collection(db, MEMBERSHIPS_COLLECTION_NAME)) // auto-id

  await runTransaction(db, async transaction => {
    // 1. Добавляем membership

    const newMembership: NewMembership = {
      groupId: invite.groupId,
      uid: invite.invitedUid,
      role: MembershipRole.MEMBER,
    }

    transaction.set(membershipRef, {
      ...newMembership,
      [MEMBERSHIP_FIELDS.createdAt]: serverTimestamp(),
    })

    // 2. Обновляем invite
    transaction.update(inviteRef, {
      [INVITE_FIELDS.status]: InviteStatus.ACCEPTED,
    })
  })
}
