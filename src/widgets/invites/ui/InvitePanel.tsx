import type { FC } from 'react'
import { Badge, Card } from '@/shared/ui'
import { useGroupInvites } from '@/entities/invite/hooks'
import { InviteMemberModal } from '@/features/membership/ui'

interface InvitePanelProps {
  groupId: string
  allowMemberInvite?: boolean
}

const InvitePanel: FC<InvitePanelProps> = ({ groupId, allowMemberInvite = false }) => {
  const { data: invites, isLoading } = useGroupInvites(groupId)

  const renderInviteModal = () => {
    return allowMemberInvite && <InviteMemberModal groupId={groupId} />
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading invites…</p>
  if (!invites || invites.length === 0)
    return (
      <div>
        {renderInviteModal()}
        <p className="text-sm text-muted-foreground">No invites</p>
      </div>
    )

  return (
    <div className="space-y-2">
      {renderInviteModal()}
      <h4 className="font-medium">Sent Invitations</h4>
      {invites.map(invite => (
        <Card key={invite.id} className="p-3 flex justify-between items-center">
          <div>
            <p className="font-medium">To: {invite.invitedUid}</p>
            <p className="text-sm text-muted-foreground">
              Status: <Badge>{invite.status}</Badge>
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default InvitePanel
