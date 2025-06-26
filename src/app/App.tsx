import { AuthGate } from './providers/auth-gate/AuthGate'
import { MainLayout } from './layouts'
import { useUserProfile } from '@/entities/user/hooks'
import { UserProfileForm } from '@/entities/user/ui'
import { GroupsPanel } from '@/widgets/groups/ui'
import { InviteBannerList } from '@/widgets/invites/ui'

const App = () => {
  const { data: user, isLoading, refetch } = useUserProfile()

  if (isLoading) return <div>isLoading...</div>

  return (
    <>
      <AuthGate>
        <MainLayout>
          {!user ? (
            <UserProfileForm onSuccess={refetch} />
          ) : (
            <div>
              <InviteBannerList />
              <GroupsPanel />
            </div>
          )}
        </MainLayout>
      </AuthGate>
    </>
  )
}

export { App }
