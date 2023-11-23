import { CardItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useMutation, useQuery } from 'react-query'

export const addToCart = () => {
  return useMutation<string>(
    async () => {
      try {
        const { data } = await API.post('/add-to-cart')
        return data
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
  return useQuery<CardItemEntity[]>({
    queryKey: ['get-cart'],
    async queryFn() {
      try {
        const { data } = await API.get('/view-cart')
        return data
      } catch (e: any) {
        throw e
      }
    },
    retry: false,
  })
}
