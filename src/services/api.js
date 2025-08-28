import axios from 'axios'

const API_BASE_URL = 'https://todoo.5xcamp.us'
const STORAGE_KEY = 'vue-todo-auth-token'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY)
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem('vue-todo-user-data')

      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        window.location.href = '/auth'
      }
    }

    return Promise.reject(error)
  },
)

export default api
