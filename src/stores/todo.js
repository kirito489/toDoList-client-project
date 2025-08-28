import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const isLoading = ref(false)
  const editingTodo = ref(null)

  const todoCount = computed(() => todos.value.length)

  const completedCount = computed(
    () => todos.value.filter((todo) => todo.completed_at !== null).length,
  )

  const pendingCount = computed(() => todoCount.value - completedCount.value)

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setTodos = (todoList) => {
    todos.value = todoList
  }

  const addTodo = (todo) => {
    todos.value.unshift(todo)
  }

  const updateTodo = (id, updates) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index] = { ...todos.value[index], ...updates }
    }
  }

  const removeTodo = (id) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  const toggleTodo = (id) => {
    const todo = todos.value.find((todo) => todo.id === id)
    if (todo) {
      const isCompleted = todo.completed_at !== null
      updateTodo(id, {
        completed_at: isCompleted ? null : new Date().toISOString(),
      })
    }
  }

  const setEditingTodo = (todo) => {
    editingTodo.value = todo
  }

  const clearEditingTodo = () => {
    editingTodo.value = null
  }

  const clearTodos = () => {
    todos.value = []
  }

  return {
    todos,
    isLoading,
    editingTodo,

    todoCount,
    completedCount,
    pendingCount,

    setLoading,
    setTodos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodo,
    setEditingTodo,
    clearEditingTodo,
    clearTodos,
  }
})
