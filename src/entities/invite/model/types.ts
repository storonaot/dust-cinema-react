export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export type Invite = {
  id: string
  groupId: string
  invitedUid: string
  inviterUid: string
  status: InviteStatus
  createdAt: string
}

export type NewInvite = Omit<Invite, 'id' | 'createdAt' | 'status'>
