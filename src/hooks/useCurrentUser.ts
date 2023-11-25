import { useAtom, useAtomValue } from 'jotai'
import { cartState, currentUserState, isLoggedInState } from '@/store/user'

export const useCurrentUser = () => {
  const [curentUser, setCurrentUser] = useAtom(currentUserState)
  const [cart, setCart] = useAtom(cartState)
  const isLoggedIn = useAtomValue(isLoggedInState)
  return {
    curentUser,
    setCurrentUser,
    isLoggedIn,
    cart: Array.isArray(cart) ? cart.filter((item) => item.quantity > 0) : [],
    cartCount: Array.isArray(cart)
      ? cart.filter((item) => item.quantity > 0).length
      : 0,
    setCart,
  }
}
