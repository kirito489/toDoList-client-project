import { useAuthStore } from '../stores/auth.js'
import { authService } from '../services/authService.js'
import Swal from 'sweetalert2'

export function useAuth() {
  const authStore = useAuthStore()

  const login = async (email, password) => {
    if (!email || !password) {
      await Swal.fire('錯誤', '請填寫完整資訊', 'error')
      return { success: false }
    }

    authStore.setLoading(true)

    try {
      const result = await authService.login(email, password)

      if (!result.token) {
        throw new Error('登入失敗，請檢查帳號密碼')
      }

      authStore.setAuth(result.token, result.user)
      await Swal.fire('登入成功!', '', 'success')

      return { success: true, user: result.user }
    } catch (error) {
      const message = error.response?.data?.message || error.message || '登入失敗'
      await Swal.fire('登入失敗', message, 'error')

      return { success: false, error: message }
    } finally {
      authStore.setLoading(false)
    }
  }

  const signup = async (email, password, nickname) => {
    if (!email || !password || !nickname) {
      await Swal.fire('錯誤', '請填寫所有欄位', 'error')
      return { success: false }
    }

    authStore.setLoading(true)

    try {
      const result = await authService.signup(email, password, nickname)
      await Swal.fire('註冊成功!', '請登入您的帳號', 'success')

      return { success: true, user: result.user }
    } catch (error) {
      const errorMessages = error.response?.data?.error
      const message = Array.isArray(errorMessages)
        ? errorMessages.join('、')
        : error.response?.data?.message || error.message || '註冊失敗'

      await Swal.fire('註冊失敗', message, 'error')

      return { success: false, error: message }
    } finally {
      authStore.setLoading(false)
    }
  }

  const logout = async () => {
    authStore.setLoading(true)

    try {
      await authService.logout()
    } catch (error) {
      console.error('登出請求失敗:', error)
    }

    authStore.clearAuth()
    await Swal.fire('登出成功!', '', 'success')

    authStore.setLoading(false)
    return { success: true }
  }

  return {
    isAuthenticated: authStore.isAuthenticated,
    isLoading: authStore.isLoading,
    user: authStore.user,
    userName: authStore.userName,

    login,
    signup,
    logout,
  }
}
