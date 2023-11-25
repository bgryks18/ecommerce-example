import { ProductItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { useQuery } from 'react-query'

export const useGetProducts = (searchParams?: Record<string, unknown>) => {
  const key = searchParams ? 'search-products' : 'get-products'
  const endpoint = searchParams ? '/search' : '/products'
  return useQuery<ProductItemEntity[]>({
    queryKey: [key],
    async queryFn() {
      const { data } = await API.get(endpoint, { params: searchParams })
      return data
    },
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}
