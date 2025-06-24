import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { auth } from '@/shared/libs/firebase'
import { useUserProfile } from '@/features/user-profile/model'
import { DialogTrigger, Dialog, DialogContent } from '@/shared/ui/dialog'
import { useGroupActions } from '@/features/group/useGroupActions'

const CreateGroupModal = () => {
  const { data: user } = useUserProfile()
  const { createGroup } = useGroupActions()

  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [inviteNicknames, setInviteNicknames] = useState('')

  const handleCreate = () => {
    if (!user) return

    const invited = inviteNicknames
      .split(',')
      .map(n => n.trim())
      .filter(n => !!n && n !== user.nickname)

    createGroup.mutate(
      {
        name: groupName,
        owner: auth.currentUser?.uid || '',
        members: [user.nickname],
        invitedUsers: invited,
      },
      {
        onSuccess: () => {
          setOpen(false)
          setGroupName('')
          setInviteNicknames('')
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Создать группу</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-medium mb-4">Создание группы</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Название группы</label>
          <Input value={groupName} onChange={e => setGroupName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Пригласить (никнеймы через запятую)</label>
          <Input value={inviteNicknames} onChange={e => setInviteNicknames(e.target.value)} />
        </div>

        <Button onClick={handleCreate} disabled={createGroup.isPending}>
          Создать
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupModal
