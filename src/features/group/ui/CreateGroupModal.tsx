import { useState } from 'react'
import { DialogTrigger, Dialog, DialogContent, DialogTitle } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { GroupForm } from '@/entities/group/ui'

const CreateGroupModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create a group</Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Create a group">
        <DialogTitle>Group Creation Form</DialogTitle>
        <GroupForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupModal
