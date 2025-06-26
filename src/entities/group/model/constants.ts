import type { Group } from '@/entities/group/model'

export const GROUP_FIELDS = {
  id: 'id',
  name: 'name',
  owner: 'owner',
  createdAt: 'createdAt',
} as const satisfies Record<keyof Group, string>

export const GROUP_CACHE_KEY = 'group'
export const GROUPS_CACHE_KEY = 'groups'
