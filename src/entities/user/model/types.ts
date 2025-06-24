export type UserProfile = {
  uid: string
  name: string
  email: string
  createdAt: string // ISO timestamp или toDate().toISOString()
  nickname: string
}

export type NewUserProfile = Omit<UserProfile, 'createdAt'>
