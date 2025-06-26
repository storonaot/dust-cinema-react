import { type FC, type PropsWithChildren } from 'react'
import type { User } from '@/entities/user/model'
import { CurrentUserContext } from './CurrentUserContext'
import type { Nullable } from '@/shared/libs/utils'

interface CurrentUserProviderProps {
  user?: Nullable<User>
}

const CurrentUserProvider: FC<PropsWithChildren<Nullable<CurrentUserProviderProps>>> = ({
  children,
  user,
}) => {
  return (
    <CurrentUserContext.Provider value={{ currentUser: user }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider
