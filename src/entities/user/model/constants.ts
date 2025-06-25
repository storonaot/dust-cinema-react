import type { User } from '@/entities/user/model'

export const USER_FIELDS = {
  uid: 'uid',
  name: 'name',
  email: 'email',
  createdAt: 'createdAt',
  nickname: 'nickname',
} as const satisfies Record<keyof User, string>

export const USERS_COLLECTION_NAME = 'users'

export const USER_PROFILE_CACHE_KEY = 'user-profile'
