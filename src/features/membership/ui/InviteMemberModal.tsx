import { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useSearchUserByNickname } from '@/entities/user/hooks'
import { useDebounce } from '@/shared/hooks'
import { useInviteActions } from '@/entities/invite/hooks'
import { auth } from '@/shared/libs/firebase'

interface InviteMemberModalProps {
  groupId: string
}

const InviteMemberModal = ({ groupId }: InviteMemberModalProps) => {
  const [open, setOpen] = useState(false)
  const [nickname, setNickname] = useState('')
  const debouncedNickname = useDebounce(nickname, 300)

  const { data: foundUsers, isLoading } = useSearchUserByNickname(debouncedNickname)
  const { createInvite } = useInviteActions()

  const handleSendInvite = (invitedUid: string) => {
    const inviterUid = auth.currentUser?.uid

    if (!inviterUid) throw new Error('Current user is not authenticated')

    createInvite.mutate(
      { groupId, invitedUid, inviterUid: inviterUid },
      {
        onSuccess: () => {
          setNickname('')
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Invite a member</Button>
      </DialogTrigger>
      <DialogContent className="space-y-4" aria-describedby="Send an invitation">
        <DialogTitle>Send an invitation</DialogTitle>

        <Input
          placeholder="Search by nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />

        {isLoading && <p className="text-sm text-muted-foreground">Searching...</p>}

        {foundUsers?.length === 0 && !isLoading && (
          <p className="text-sm text-muted-foreground">No users found</p>
        )}

        <div className="space-y-2">
          {foundUsers?.map(user => (
            <div key={user.uid} className="flex items-center justify-between border p-2 rounded">
              <span>{user.nickname}</span>
              <Button size="sm" onClick={() => handleSendInvite(user.uid)}>
                Send invite
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InviteMemberModal
