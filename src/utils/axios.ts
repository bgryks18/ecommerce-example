import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import qs from 'qs'

export const API_URL = import.meta.env.VITE_API_URL

const API = axios.create({
  baseURL: API_URL,
  paramsSerializer(params) {
    return qs.stringify(params, { indices: false })
  },
})

const requestBefore = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { params = {} } = config
  const token = localStorage.getItem('authorization')
  if (token) {
    config.headers['Session-ID'] = token
  }
  return config
}

const requestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

const responseBefore = (response: AxiosResponse): AxiosResponse => {
  const token = response?.headers?.authorization
  if (token) localStorage.setItem('authorization', token)
  return response
}

const responseError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error)

API.interceptors.request.use(requestBefore, requestError)
API.interceptors.response.use(responseBefore, responseError)

export default API
