import { useCurrentUser } from '@/hooks/useCurrentUser'
import { CartItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useMutation, useQuery } from 'react-query'

export const addToCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity>(
    async () => {
      try {
        await API.post(
          '/add-to-cart',
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
      } catch (e: any) {
        throw e
      }
    },
    {
      retry: false,
    }
  )
}

export const removeFromCart = (id: string) => {
  const { setCart } = useCurrentUser()
  return useMutation<CartItemEntity[]>(
    async () => {
      try {
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
      } catch (e: any) {
        throw e
      }
    },
    {
      retry: false,
    }
  )
}

export const getCart = () => {
  const { setCart } = useCurrentUser()
  return useQuery<CartItemEntity[]>({
    queryKey: ['get-cart'],
    async queryFn() {
      try {
        const { data } = await API.get('/view-cart')
        setCart(data)
        return data
      } catch (e: any) {
        throw e
      }
    },
    retry: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}
