import { type FC, useEffect, useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useUserProfile } from '@/entities/user/hooks'
import { Loader2 } from 'lucide-react'
import { useGroup, useGroupActions } from '@/entities/group/hooks'

interface GroupFormProps {
  groupId?: string
  onSuccess?: () => void
}

const GroupForm: FC<GroupFormProps> = ({ groupId, onSuccess }) => {
  const { data: user } = useUserProfile()
  const { updateGroup, createGroup } = useGroupActions()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)

  const [groupName, setGroupName] = useState('')

  useEffect(() => {
    if (group) {
      setGroupName(group.name)
    }
  }, [group])

  const handleSubmit = () => {
    if (!user) return

    if (!groupName.trim()) return

    if (groupId) {
      updateGroup.mutate(
        {
          id: groupId,
          payload: {
            name: groupName,
          },
        },
        { onSuccess }
      )
    } else {
      createGroup.mutate(
        {
          name: groupName,
          owner: user.uid,
        },
        { onSuccess }
      )
    }
  }

  if (groupId && isLoadingGroup) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Group Name</label>
        <Input
          value={groupName}
          onChange={e => setGroupName(e.target.value)}
          placeholder="Dust Cinema"
        />
      </div>

      <Button onClick={handleSubmit} disabled={createGroup.isPending || updateGroup.isPending}>
        {groupId ? 'Save' : 'Create'}
      </Button>
    </div>
  )
}

export default GroupForm
