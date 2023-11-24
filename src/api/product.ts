import { ProductItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useQuery } from 'react-query'

export const getProducts = (searchParams?: Record<string, unknown>) => {
  const key = searchParams ? 'search-products' : 'get-products'
  const endpoint = searchParams ? '/search' : '/products'
  return useQuery<ProductItemEntity[]>({
    queryKey: [key],
    async queryFn() {
      try {
        const { data } = await API.get(endpoint, searchParams)
        return data
      } catch (e: any) {
        throw e
      }
    },
    retry: false,
  })
}
