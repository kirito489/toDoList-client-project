import api from './api.js'

export const todoService = {
  async getTodos() {
    const response = await api.get('/todos')
    return response.data.todos
  },

  async addTodo(content) {
    const response = await api.post('/todos', {
      todo: {
        content,
      },
    })
    return response.data
  },

  async updateTodo(id, content) {
    const response = await api.put(`/todos/${id}`, {
      todo: {
        content,
      },
    })
    return response.data
  },

  async deleteTodo(id) {
    await api.delete(`/todos/${id}`)
  },

  async toggleTodo(id) {
    await api.patch(`/todos/${id}/toggle`)
  },
}
