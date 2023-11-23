import { useAtom, useAtomValue } from 'jotai'
import { cardState, currentUserState, isLoggedInState } from '@/store/user'

export const useCurrentUser = () => {
  const [curentUser, setCurrentUser] = useAtom(currentUserState)
  const [card, setCard] = useAtom(cardState)
  const isLoggedIn = useAtomValue(isLoggedInState)
  return {
    curentUser,
    setCurrentUser,
    isLoggedIn,
    card,
    setCard,
  }
}
