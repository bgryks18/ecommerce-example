import { useCurrentUser } from '@/hooks/useCurrentUser'
import { CartItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useMutation, useQuery } from 'react-query'

export const useAddToCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity>(
    async () => {
      await API.post(
        '/add-to-cart',
        {},
        {
          params: {
            id,
          },
        }
      )
      const { data: cartData }: { data: CartItemEntity[] } = await API.get(
        '/view-cart'
      )
      setCart(cartData)
      const updatedItem = cartData.find((item) => item.productId === id)
      return updatedItem as CartItemEntity
    },
    {
      retry: false,
    }
  )
}

export const useRemoveFromCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity | undefined>(
    async () => {
      await API.post(
        '/subtract-from-cart',
        {},
        {
          params: {
            id,
          },
        }
      )
      const { data: cartData }: { data: CartItemEntity[] } = await API.get(
        '/view-cart'
      )
      setCart(cartData)
      const updatedItem = cartData.find((item) => item.productId === id)

      return updatedItem
    },
    {
      retry: false,
    }
  )
}

export const useGetCart = () => {
  const { setCart } = useCurrentUser()
  return useQuery<CartItemEntity[]>({
    queryKey: ['get-cart'],
    async queryFn() {
      const { data } = await API.get('/view-cart')
      setCart(data)
      return data
    },
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })
}
