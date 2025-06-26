export type User = {
  uid: string
  name: string
  email: string
  createdAt: string // ISO timestamp или toDate().toISOString()
  nickname: string
  isSuperUser?: boolean
}

export type NewUser = Omit<User, 'createdAt'>
