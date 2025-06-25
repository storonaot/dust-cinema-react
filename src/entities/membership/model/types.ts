export type Membership = {
  id: string // Firestore document ID
  groupId: string
  uid: string
  role: 'owner' | 'member'
  createdAt: string // ISO
}

export type NewMembership = Omit<Membership, 'id' | 'createdAt'>
