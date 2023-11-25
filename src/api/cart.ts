import { useCurrentUser } from '@/hooks/useCurrentUser'
import { CartItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useMutation, useQuery } from 'react-query'

export const useAddToCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity>(
    async () => {
      await API.post(
        '/add-asdasdto-cart',
        {},
        {
          params: {
            id,
          },
        }
      )
      const { data: cardData }: { data: CartItemEntity[] } = await API.get(
        '/view-cart'
      )
      setCart(cardData)
      const updatedItem = cardData.find((item) => item.productId === id)
      return updatedItem as CartItemEntity
    },
    {
      retry: false,
    }
  )
}

export const useRemoveFromCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity[]>(
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
      const { data: cardData }: { data: CartItemEntity[] } = await API.get(
        '/view-cart'
      )
      setCart(cardData)
      return cardData
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
    refetchOnWindowFocus: false,
  })
}
