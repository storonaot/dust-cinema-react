import { useState, useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { GroupView } from '@/entities/group/ui'
import { useGroups } from '@/features/group/hooks'

const GroupSwitcher = () => {
  const { data: groups = [], isLoading } = useGroups()
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null)

  useEffect(() => {
    if (groups.length === 1) {
      setSelectedGroupId(groups[0].id)
    }
  }, [groups])

  if (isLoading) return <div>Загрузка групп...</div>
  if (!groups.length) return <div>У вас пока нет групп</div>

  return (
    <div className="space-y-6">
      {groups.length > 1 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Ваши группы</h2>
          <div className="flex flex-wrap gap-2">
            {groups.map(group => (
              <Button
                key={group.id}
                variant={selectedGroupId === group.id ? 'default' : 'outline'}
                onClick={() => setSelectedGroupId(group.id)}
              >
                {group.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedGroupId && <GroupView groupId={selectedGroupId} />}
    </div>
  )
}

export default GroupSwitcher
