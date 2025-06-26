import { useMutation, useQueryClient } from '@tanstack/react-query'
import { acceptInviteAPI, createInviteAPI, updateInviteAPI } from '@/entities/invite/api'
import {
  InviteStatus,
  USER_INVITES_CACHE_KEY,
  type Invite,
  type NewInvite,
} from '@/entities/invite/model'
import { GROUPS_CACHE_KEY } from '@/entities/group/model'

export const useInviteActions = () => {
  const queryClient = useQueryClient()

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
    mutationFn: (invite: Invite) => acceptInviteAPI(invite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_CACHE_KEY] })
      queryClient.invalidateQueries({ queryKey: [USER_INVITES_CACHE_KEY] })
    },
    onError: error => {
      console.error('Failed to accept invitation:', error)
    },
  })

  const declineInvite = useMutation({
    mutationFn: (inviteId: string) => updateInviteAPI(inviteId, InviteStatus.DECLINED),
    onSuccess: () => {
      console.log('Invitation declined')
    },
    onError: error => {
      console.error('Failed to decline invitation:', error)
    },
  })

  return { createInvite, acceptInvite, declineInvite }
}
