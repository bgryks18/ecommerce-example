import { ProductItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useQuery } from 'react-query'

export const getProducts = () => {
  return useQuery<ProductItemEntity[]>({
    queryKey: ['get-products'],
    async queryFn() {
      try {
        const { data } = await API.get('/products')
        return data
      } catch (e: any) {
        throw e
      }
    },
    retry: false,
  })
}

export const searchProducts = (searchParams: Record<string, unknown>) => {
  return useQuery<ProductItemEntity[]>({
    queryKey: ['search-products'],
    async queryFn() {
      try {
        const { data } = await API.get('/search', {
          params: {
            ...searchParams,
          },
        })
        return data
      } catch (e: any) {
        throw e
      }
    },
    retry: false,
  })
}
