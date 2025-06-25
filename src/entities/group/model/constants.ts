export const GROUP_FIELDS = {
  id: 'id',
  name: 'name',
  owner: 'owner',
  members: 'members',
  invitedUsers: 'invitedUsers',
  createdAt: 'createdAt',
} as const satisfies Record<keyof Group, string>

import type { Group } from '@/entities/group/model'

export const GROUPS_CACHE_KEY = 'groups'
export const GROUPS_COLLECTION_NAME = 'groups'
