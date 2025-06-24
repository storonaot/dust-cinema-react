export type Group = {
  id: string
  name: string
  owner: string // UID
  members: string[]
  invitedUsers: string[]
  createdAt: string // ISO
}

export type NewGroup = Omit<Group, 'id' | 'createdAt'>
