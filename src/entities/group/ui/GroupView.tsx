import type { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { useGroup } from '@/entities/group/hooks'
import { useUserProfile } from '@/entities/user/hooks'
import { Button } from '@/shared/ui/button'

interface GroupViewProps {
  groupId: string
}

const GroupView: FC<GroupViewProps> = ({ groupId }) => {
  const { data: group, isLoading: groupLoading } = useGroup(groupId)
  const { data: user, isLoading: userLoading } = useUserProfile()

  if (groupLoading || userLoading) return <Loader2 className="animate-spin" />
  if (!group || !user) return <div>Группа не найдена или пользователь не определён</div>

  const isOwner = group.owner === user.uid

  const handleInviteClick = () => {
    // здесь может быть открытие модалки или переход к инвайтам
    console.log('Открыть модалку приглашения')
  }

  return (
    <div className="mt-4 p-4 border rounded space-y-4">
      <div>
        <h3 className="text-xl font-medium mb-1">Group Name: {group.name}</h3>
        <p className="text-sm text-muted-foreground">{isOwner ? 'U r Owner' : 'U r Member'}</p>
      </div>

      {isOwner && (
        <div>
          <Button onClick={handleInviteClick}>Send an invitation</Button>
        </div>
      )}
    </div>
  )
}

export default GroupView
