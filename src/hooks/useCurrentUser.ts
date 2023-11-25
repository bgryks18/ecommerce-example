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
    cart: cart ? cart.filter((item) => item.quantity > 1) : null,
    cartCount: Array.isArray(cart)
      ? cart.filter((item) => item.quantity > 1).length
      : 0,
    setCart,
  }
}
