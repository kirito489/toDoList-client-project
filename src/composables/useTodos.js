import { useTodoStore } from '../stores/todo.js'
import { todoService } from '../services/todoService.js'
import Swal from 'sweetalert2'

export function useTodos() {
  const todoStore = useTodoStore()

  const loadTodos = async () => {
    todoStore.setLoading(true)

    try {
      const todos = await todoService.getTodos()
      todoStore.setTodos(todos)
      return { success: true, todos }
    } catch (error) {
      await Swal.fire('載入失敗', '無法載入待辦事項，請稍後再試', 'error')
      return { success: false, error: error.message }
    } finally {
      todoStore.setLoading(false)
    }
  }

  const addTodo = async (content) => {
    if (!content || !content.trim()) {
      await Swal.fire('錯誤', '請輸入待辦事項內容', 'error')
      return { success: false }
    }

    try {
      const todo = await todoService.addTodo(content.trim())
      todoStore.addTodo(todo)
      return { success: true, todo }
    } catch (error) {
      await Swal.fire('新增失敗', '無法新增待辦事項，請稍後再試', 'error')
      return { success: false, error: error.message }
    }
  }

  const updateTodo = async (id, content) => {
    if (!content || !content.trim()) {
      await Swal.fire('錯誤', '請輸入待辦事項內容', 'error')
      return { success: false }
    }

    try {
      await todoService.updateTodo(id, content.trim())
      todoStore.updateTodo(id, { content: content.trim() })
      await Swal.fire('更新成功', '', 'success')
      return { success: true }
    } catch (error) {
      await Swal.fire('更新失敗', '無法更新待辦事項，請稍後再試', 'error')
      return { success: false, error: error.message }
    }
  }

  const deleteTodo = async (todo) => {
    const result = await Swal.fire({
      title: '確定要刪除嗎？',
      text: `「${todo.content}」`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '刪除',
      cancelButtonText: '取消',
      confirmButtonColor: '#ef4444',
    })

    if (!result.isConfirmed) {
      return { success: false, cancelled: true }
    }

    try {
      await todoService.deleteTodo(todo.id)
      todoStore.removeTodo(todo.id)
      await Swal.fire('刪除成功', '', 'success')
      return { success: true }
    } catch (error) {
      await Swal.fire('刪除失敗', '無法刪除待辦事項，請稍後再試', 'error')
      return { success: false, error: error.message }
    }
  }

  const toggleTodo = async (id) => {
    try {
      await todoService.toggleTodo(id)
      todoStore.toggleTodo(id)
      return { success: true }
    } catch (error) {
      await Swal.fire('操作失敗', '無法更新待辦狀態，請稍後再試', 'error')
      return { success: false, error: error.message }
    }
  }

  const startEdit = (todo) => {
    todoStore.setEditingTodo(todo)
  }

  const cancelEdit = () => {
    todoStore.clearEditingTodo()
  }

  return {
    todos: todoStore.todos,
    isLoading: todoStore.isLoading,
    editingTodo: todoStore.editingTodo,
    todoCount: todoStore.todoCount,
    completedCount: todoStore.completedCount,
    pendingCount: todoStore.pendingCount,

    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    startEdit,
    cancelEdit,
  }
}
