import API from '@/utils/axios'
import { useMutation } from 'react-query'

export const getSession = () => {
  return useMutation<string>(
    async () => {
      try {
        const { data } = await API.get('/createsession')
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
