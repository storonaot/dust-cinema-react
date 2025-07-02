import { type FC, type PropsWithChildren } from 'react'
import { LoginForm } from '@/features/auth/ui'
import { useAuthGate } from './useAuthGate'

export const AuthGate: FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading } = useAuthGate()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return (
      <div>
        <h2>Вход</h2>
        <LoginForm />
      </div>
    )
  }

  return <>{children}</>
}
