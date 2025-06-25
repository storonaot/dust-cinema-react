export type User = {
  uid: string
  name: string
  email: string
  createdAt: string // ISO timestamp или toDate().toISOString()
  nickname: string
}

export type NewUser = Omit<User, 'createdAt'>
