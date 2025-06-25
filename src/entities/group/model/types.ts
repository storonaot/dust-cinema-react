export type Group = {
  id: string
  name: string
  owner: string // UID
  createdAt: string // ISO
}

export type NewGroup = Omit<Group, 'id' | 'createdAt'>
