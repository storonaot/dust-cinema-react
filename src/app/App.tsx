import { AuthGate } from './providers/auth-gate/AuthGate'
import { MainLayout } from './layouts'
import { Button } from '@/shared/ui'
import { useUserProfile } from '@/features/user-profile/model'
import { UserProfileForm } from '@/features/user-profile/ui'

const App = () => {
  const { data: user, isLoading, refetch } = useUserProfile()

  return (
    <>
      <AuthGate>
        <MainLayout>
          {!user ? (
            <UserProfileForm onSuccess={refetch} />
          ) : (
            <>
              <Button>Create a Group</Button>
              {/* <InvitationsPanel user={user} /> // тут можно показывать, если приглашён */}
            </>
          )}
        </MainLayout>
      </AuthGate>
    </>
  )
}

export { App }
