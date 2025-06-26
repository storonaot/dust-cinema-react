import { useMutation } from '@tanstack/react-query'
import { createInviteAPI } from '@/entities/invite/api'
import type { NewInvite } from '@/entities/invite/model'

export const useInviteActions = () => {
  const createInvite = useMutation({
    mutationFn: (payload: NewInvite) => createInviteAPI(payload),
    onSuccess: () => {
      console.log('Invitation sent successfully')
    },
    onError: error => {
      console.error('Failed to send invitation:', error)
    },
  })

  const acceptInvite = useMutation({
    mutationFn: (inviteId: string) => updateInviteAPI(inviteId, 'accepted'),
    onSuccess: () => {
      console.log('Invitation accepted')
    },
    onError: error => {
      console.error('Failed to accept invitation:', error)
    },
  })

  const declineInvite = useMutation({
    mutationFn: (inviteId: string) => updateInviteAPI(inviteId, 'declined'),
    onSuccess: () => {
      console.log('Invitation declined')
    },
    onError: error => {
      console.error('Failed to decline invitation:', error)
    },
  })

  return { createInvite }
}
