import api from './api.js'

export const authService = {
  async login(email, password) {
    const res = await api.post('/users/sign_in', {
      user: {
        email,
        password,
      },
    })

    return {
      token: res.headers.authorization,
      user: res.data.user,
      message: res.data.message,
    }
  },

  async signup(email, password, nickname) {
    const res = await api.post('/users', {
      user: {
        email,
        password,
        nickname,
      },
    })

    return {
      user: res.data.user,
      message: res.data.message,
    }
  },

  async logout() {
    await api.delete('/users/sign_out')
  },
}
