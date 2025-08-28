import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'vue-todo-auth-token'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const userName = computed(() => user.value?.nickname || user.value?.email || '用戶')

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setAuth = (authToken, userData = null) => {
    token.value = authToken
    user.value = userData

    localStorage.setItem(STORAGE_KEY, authToken)
    if (userData) {
      localStorage.setItem('vue-todo-user-data', JSON.stringify(userData))
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null

    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('vue-todo-user-data')
  }

  const initAuth = () => {
    const savedToken = localStorage.getItem(STORAGE_KEY)
    const savedUser = localStorage.getItem('vue-todo-user-data')

    if (savedToken) {
      token.value = savedToken

      if (savedUser) {
        try {
          user.value = JSON.parse(savedUser)
        } catch (error) {
          console.error('解析用戶資料失敗:', error)
          clearAuth()
        }
      }
    }
  }

  return {
    user,
    token,
    isLoading,

    isAuthenticated,
    userName,

    setLoading,
    setAuth,
    clearAuth,
    initAuth,
  }
})
