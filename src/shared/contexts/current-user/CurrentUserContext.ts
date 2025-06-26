import { createContext } from 'react'
import type { User } from '@/entities/user/model'
import type { Nullable } from '@/shared/libs/utils'

interface CurrentUserContextValue {
  currentUser?: Nullable<User>
}

export const CurrentUserContext = createContext<Nullable<CurrentUserContextValue>>(null)
