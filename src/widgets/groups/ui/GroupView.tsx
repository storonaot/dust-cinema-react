import type { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { useGroup } from '@/entities/group/hooks'
import { useUserProfile } from '@/entities/user/hooks'
import { InvitePanel } from '@/widgets/invites/ui'
import { useCurrentUser } from '@/shared/contexts/current-user'

interface GroupViewProps {
  groupId: string
}

const GroupView: FC<GroupViewProps> = ({ groupId }) => {
  const { data: group, isLoading: groupLoading } = useGroup(groupId)
  const { data: user, isLoading: userLoading } = useUserProfile()
  const { currentUser } = useCurrentUser()

  if (groupLoading || userLoading) return <Loader2 className="animate-spin" />
  if (!group || !user) return <div>Группа не найдена или пользователь не определён</div>

  const isOwner = group.owner === user.uid

  return (
    <div className="mt-4 p-4 border rounded space-y-4">
      <div>
        <h3 className="text-xl font-medium mb-1">
          Welcome to <b>{group.name}</b>{' '}
        </h3>
        <p className="text-sm text-muted-foreground">{isOwner ? 'U r Owner' : 'U r Member'}</p>
      </div>
      {currentUser?.isSuperUser && <InvitePanel groupId={group.id} allowMemberInvite />}
    </div>
  )
}

export default GroupView
