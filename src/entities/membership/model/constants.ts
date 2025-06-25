import type { Membership } from '@/entities/membership/model'

export const MEMBERSHIP_FIELDS = {
  id: 'id',
  groupId: 'groupId',
  uid: 'uid',
  role: 'role',
  createdAt: 'createdAt',
} as const satisfies Record<keyof Membership, string>

export const MEMBERSHIPS_CACHE_KEY = 'memberships'
