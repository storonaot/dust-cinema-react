import type { FC, PropsWithChildren } from 'react'
import { LogoutButton } from '@/features/auth/ui'
import { useCurrentUser } from '@/shared/contexts/current-user'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useCurrentUser()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-xl font-semibold">Dust CINEMA</h1>

        <div className="flex items-center">
          {currentUser && <h3>{currentUser.nickname}</h3>}
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 px-6 py-4">{children}</main>
    </div>
  )
}

export default MainLayout
