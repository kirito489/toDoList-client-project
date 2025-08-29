import api from './api.js'

export const todoService = {
  async getTodos() {
    const response = await api.get('/todos')
    console.log('getTodos response:', response.data)
    return response.data.todos || []
  },

  async addTodo(content) {
    const response = await api.post('/todos', {
      todo: {
        content,
      },
    })
    console.log('addTodo response:', response.data)
    return response.data
  },

  async updateTodo(id, content) {
    const response = await api.put(`/todos/${id}`, {
      todo: {
        content,
      },
    })
    console.log('updateTodo response:', response.data)
    return response.data
  },

  async deleteTodo(id) {
    const response = await api.delete(`/todos/${id}`)
    console.log('deleteTodo response:', response.data)
  },

  async toggleTodo(id) {
    const response = await api.patch(`/todos/${id}/toggle`)
    console.log('toggleTodo response:', response.data)
  },
}
