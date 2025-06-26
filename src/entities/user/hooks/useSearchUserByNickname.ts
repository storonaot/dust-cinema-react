import { useQuery } from '@tanstack/react-query'
import { searchUserByNicknameAPI } from '@/entities/user/api'
import { USER_SEARCH_CACHE_KEY } from '@/entities/user/model'

export const useSearchUserByNickname = (nickname: string) => {
  return useQuery({
    queryKey: [USER_SEARCH_CACHE_KEY, nickname],
    queryFn: () => searchUserByNicknameAPI(nickname),
    enabled: nickname.trim().length > 1, // или debounce в UI
  })
}
