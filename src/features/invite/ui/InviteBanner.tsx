import { useGroup } from '@/entities/group/hooks'
import { Button } from '@/shared/ui'

const InviteBanner = ({
  inviteId,
  groupId,
  onAccept,
  onDecline,
}: {
  inviteId: string
  groupId: string
  onAccept: () => void
  onDecline: () => void
}) => {
  const { data: group, isLoading } = useGroup(groupId)

  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <h4 className="text-sm font-medium mb-1">
          {isLoading ? 'Loading group...' : `Invite to: ${group?.name ?? 'Unknown group'}`}
        </h4>
        <p className="text-xs text-muted-foreground">You have been invited to join a group</p>
      </div>
      <div className="flex space-x-2">
        <Button size="sm" onClick={onAccept}>
          Accept
        </Button>
        <Button size="sm" variant="outline" onClick={onDecline}>
          Decline
        </Button>
      </div>
    </div>
  )
}

export default InviteBanner
