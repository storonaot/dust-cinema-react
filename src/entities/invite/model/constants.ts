import type { Invite } from '@/entities/invite/model'

export const INVITE_FIELDS = {
  id: 'id',
  groupId: 'groupId',
  invitedUid: 'invitedUid',
  inviterUid: 'inviterUid',
  status: 'status',
  createdAt: 'createdAt',
} as const satisfies Record<keyof Invite, string>

export const GROUP_INVITES_CACHE_KEY = 'groupInvites'
export const USER_INVITES_CACHE_KEY = 'userInvites'
