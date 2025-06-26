import type { User } from '@/entities/user/model'

export const USER_FIELDS = {
  uid: 'uid',
  name: 'name',
  email: 'email',
  createdAt: 'createdAt',
  nickname: 'nickname',
} as const satisfies Record<keyof User, string>

export const USER_PROFILE_CACHE_KEY = 'userProfile'
export const USER_SEARCH_CACHE_KEY = 'searchUser'
