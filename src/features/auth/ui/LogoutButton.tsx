import { useMutation } from '@tanstack/react-query'
import { logout } from '../model/auth.api'

const LogoutButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
  })

  return (
    <button
      onClick={() => {
        mutate()
      }}
      disabled={isPending}
    >
      LogOut
    </button>
  )
}

export default LogoutButton
