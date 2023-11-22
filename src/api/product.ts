import { ProductItemEntity } from '@/types/type'
import API from '@/utils/axios'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'

export const getProducts = () => {
  return useQuery<ProductItemEntity[]>({
    queryKey: ['get-products'],
    queryFn() {
      return new Promise((resolve, reject) => {
        return API.get('/products')
          .then(({ data }) => {
            console.log('data', data)
            return resolve(data)
          })
          .catch((err: AxiosError) => {
            console.log('err', err)
            return reject(err)
          })
      })
    },
    retry: false,
  })
}

export const searchProducts = (searchParams: Record<string, unknown>) => {
  return useQuery<ProductItemEntity[]>({
    queryKey: ['search-products'],
    queryFn() {
      return new Promise((resolve, reject) => {
        return API.get('/search', {
          params: {
            ...searchParams,
          },
        })
          .then(({ data }) => {
            console.log('data', data)
            return resolve(data)
          })
          .catch((err: AxiosError) => {
            console.log('err', err)
            return reject(err)
          })
      })
    },
    retry: false,
  })
}
