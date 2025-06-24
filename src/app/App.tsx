import { AuthGate } from './providers/auth-gate/AuthGate'
import { MainLayout } from './layouts'
import { useUserProfile } from '@/features/user-profile/model'
import { UserProfileForm } from '@/features/user-profile/ui'
import { CreateGroupModal } from '@/widgets/create-group/ui'
// import { useInvitedGroups, useUserGroups } from '@/features/user-profile/model/useUserGroups'

// const GroupSection = () => {
//   const { data: groups } = useUserGroups()
//   const { data: invited } = useInvitedGroups()

//   if (!groups?.length && !invited?.length) {
//     return <p>Вы пока не состоите ни в одной группе</p>
//   }

//   return (
//     <div>
//       {groups?.length > 0 && (
//         <div>
//           <h2 className="font-semibold mb-2">Мои группы</h2>
//           <ul>{groups?.map(g => <li key={g.id}>{g.name}</li>)}</ul>
//         </div>
//       )}

//       {invited?.length > 0 && (
//         <div className="mt-4">
//           <h2 className="font-semibold mb-2">Приглашения</h2>
//           <ul>{invited?.map(g => <li key={g.id}>{g.name}</li>)}</ul>
//         </div>
//       )}
//     </div>
//   )
// }

const App = () => {
  const { data: user, isLoading, refetch } = useUserProfile()

  if (isLoading) return <div>isLoading...</div>

  return (
    <>
      <AuthGate>
        <MainLayout>
          {!user ? <UserProfileForm onSuccess={refetch} /> : <CreateGroupModal />}
          <div>{user?.nickname}</div>
          {/* <GroupSection /> */}
        </MainLayout>
      </AuthGate>
    </>
  )
}

export { App }
