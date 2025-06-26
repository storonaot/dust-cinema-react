import { Loader2 } from 'lucide-react'
import { CreateGroupModal } from '@/features/group/ui'
import { useGroups } from '@/features/group/hooks'
import { GroupSwitcher, GroupView } from '@/widgets/groups/ui'
import { useCurrentUser } from '@/shared/contexts/current-user/useUserContext'

const GroupsPanel = () => {
  const { data: groups, isLoading } = useGroups()
  const { currentUser } = useCurrentUser()

  const renderGroupModal = () => {
    return currentUser?.isSuperUser && <CreateGroupModal />
  }

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
        {renderGroupModal()}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">{renderGroupModal()}</div>

      {groups.length === 1 ? <GroupView groupId={groups[0].id} /> : <GroupSwitcher />}
    </div>
  )
}

export default GroupsPanel
