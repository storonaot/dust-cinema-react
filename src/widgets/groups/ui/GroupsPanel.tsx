import { Loader2 } from 'lucide-react'
import { CreateGroupModal, GroupSwitcher } from '@/features/group/ui'
import { GroupView } from '@/entities/group/ui'
import { useGroups } from '@/features/group/hooks'

const GroupsPanel = () => {
  const { data: groups, isLoading } = useGroups()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!groups || groups.length === 0) {
    return (
      <div className="py-8 text-center space-y-4">
        <p className="text-muted-foreground">U don't have any groups yet.</p>
        <CreateGroupModal />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CreateGroupModal />
      </div>

      {groups.length === 1 ? <GroupView groupId={groups[0].id} /> : <GroupSwitcher />}
    </div>
  )
}

export default GroupsPanel
