import type { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { useGroup } from '@/entities/group/hooks'

interface GroupViewProps {
  groupId: string
}

const GroupView: FC<GroupViewProps> = ({ groupId }) => {
  const { data: group, isLoading } = useGroup(groupId)

  if (isLoading) return <Loader2 className="animate-spin" />
  if (!group) return <div>Группа не найдена</div>

  return (
    <div className="mt-4 p-4 border rounded">
      <h3 className="text-xl font-medium mb-2">{group.name}</h3>
      <p className="text-sm text-muted-foreground">Admin: {group.owner}</p>
    </div>
  )
}

export default GroupView
