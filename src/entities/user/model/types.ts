export type UserProfile = {
  uid: string
  name: string
  email: string
  createdAt: Date | string
  nickname: string
}

export type NewUserProfile = Omit<UserProfile, 'createdAt'>
