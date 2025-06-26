import type { FC } from 'react'
import { useUserProfile } from '@/entities/user/hooks'
import { Badge, Card } from '@/shared/ui'
import { useGroupInvites } from '@/entities/invite/hooks'
// import { Badge } from '@/shared/ui/badge'
// import { Card } from '@/shared/ui/card'

interface InvitePanelProps {
  groupId: string
}

const InvitePanel: FC<InvitePanelProps> = ({ groupId }) => {
  const { data: user } = useUserProfile()
  const { data: invites, isLoading } = useGroupInvites(groupId)

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading invites…</p>
  if (!invites || invites.length === 0)
    return <p className="text-sm text-muted-foreground">No invites</p>

  return (
    <div className="space-y-2">
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
