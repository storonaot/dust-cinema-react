export enum MembershipRole {
  OWNER = 'owner',
  MEMBER = 'member',
}

export type Membership = {
  id: string // Firestore document ID
  groupId: string
  uid: string
  role: MembershipRole
  createdAt: string // ISO
}

export type NewMembership = Omit<Membership, 'id' | 'createdAt'>
