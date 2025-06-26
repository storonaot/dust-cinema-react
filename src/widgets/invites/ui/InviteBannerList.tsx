import { useUserProfile } from '@/entities/user/hooks'
import { useUserInvites } from '@/entities/invite/hooks'
import { useInviteActions } from '@/entities/invite/hooks'
import { Loader2 } from 'lucide-react'
import { InviteBanner } from '@/features/invite/ui'

const InviteBannerList = () => {
  const { data: user, isLoading: loadingUser } = useUserProfile()
  const { data: invites, isLoading: loadingInvites } = useUserInvites(user?.uid)
  const { acceptInvite, declineInvite } = useInviteActions()

  if (loadingUser || loadingInvites) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!invites || invites.length === 0) return null

  return (
    <div className="space-y-4">
      {invites.map(invite => (
        <InviteBanner
          key={invite.id}
          inviteId={invite.id}
          groupId={invite.groupId}
          onAccept={() => acceptInvite.mutate({ inviteId: invite.id })}
          onDecline={() => declineInvite.mutate({ inviteId: invite.id })}
        />
      ))}
    </div>
  )
}

export default InviteBannerList
