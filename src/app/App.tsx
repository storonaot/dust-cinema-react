import { AuthGate } from './providers/auth-gate/AuthGate'
import { MainLayout } from './layouts'

const App = () => {
  return (
    <>
      <AuthGate>
        <MainLayout>Hello Dust Cinema</MainLayout>
      </AuthGate>
    </>
  )
}

export { App }
