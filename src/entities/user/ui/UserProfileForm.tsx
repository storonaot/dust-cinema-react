import { useState, type FC } from 'react'
import { auth } from '@/shared/libs/firebase'
import { Button, Input } from '@/shared/ui'
import { useUserProfileActions } from '@/entities/user/hooks'

interface UserProfileFormProps {
  onSuccess?: () => void
}

const UserProfileForm: FC<UserProfileFormProps> = ({ onSuccess }) => {
  const user = auth.currentUser
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { createProfile } = useUserProfileActions()

  if (!user) return null // safety guard

  const handleSubmit = async () => {
    if (!name.trim() || !nickname.trim()) {
      setError('Введите имя и уникальный никнейм')
      return
    }

    setError(null)

    createProfile.mutate(
      {
        uid: user.uid,
        name,
        email: user.email || '',
        nickname,
      },
      {
        onSuccess,
        onError: (err: Error) => setError(err.message),
      }
    )
  }

  return (
    <div className="max-w-sm mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4">Создание профиля</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Ваш email</label>
        <div className="p-2 border rounded bg-muted text-muted-foreground">{user.email}</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Имя</label>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={createProfile.isPending}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Никнейм (уникальный)</label>
        <Input
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          disabled={createProfile.isPending}
        />
      </div>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

      <Button onClick={handleSubmit} disabled={createProfile.isPending}>
        Сохранить
      </Button>
    </div>
  )
}

export default UserProfileForm
