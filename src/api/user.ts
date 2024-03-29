import API from '@/utils/axios'
import { useMutation } from 'react-query'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export const useGetSession = () => {
  const { setCart, setCurrentUser } = useCurrentUser()

  return useMutation<string>(
    async () => {
      const { data: token } = await API.get('/createsession')

      localStorage.setItem('authorization', token)

      const { data: cardData } = await API.get('/view-cart')

      setCart(cardData)
      setCurrentUser(token)

      return token
    },
    {
      retry: false,
    }
  )
}
