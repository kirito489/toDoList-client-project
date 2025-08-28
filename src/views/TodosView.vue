<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth.js'
import { useTodos } from '../composables/useTodos.js'

const router = useRouter()
const { logout, userName } = useAuth()
const {
  todos,
  isLoading,
  editingTodo,
  loadTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  startEdit,
  cancelEdit,
} = useTodos()

const task = ref('')
const todoText = ref('')
const showEditModal = ref(false)

onMounted(() => {
  loadTodos()
})

// 新增待辦事項
const handleAddTodo = async () => {
  const result = await addTodo(task.value)
  if (result.success) {
    task.value = ''
  }
}

// 開始編輯
const handleEdit = (todo) => {
  startEdit(todo)
  todoText.value = todo.content
  showEditModal.value = true
}

// 更新待辦事項
const handleUpdate = async () => {
  if (!editingTodo.value) return

  const result = await updateTodo(editingTodo.value.id, todoText.value)
  if (result.success) {
    showEditModal.value = false
    cancelEdit()
    todoText.value = ''
  }
}

// 取消編輯
const handleCancelEdit = () => {
  showEditModal.value = false
  cancelEdit()
  todoText.value = ''
}

// 登出
const handleLogout = async () => {
  await logout()
  router.push('/auth')
}
</script>

<template>
  <div>
    <!-- 導覽列 -->
    <header>
      <nav class="flex justify-end pt-6 pb-3">
        <a
          href="#logout"
          @click.prevent="handleLogout"
          class="px-2 py-1 text-xl text-gray-800 border-r border-gray-300 sm:px-4 hover:text-gray-500"
        >
          登出
        </a>
      </nav>
    </header>

    <!-- 新增待辦事項表單 -->
    <section id="taskSection" class="justify-center pt-4 pb-8">
      <form @submit.prevent="handleAddTodo" class="flex justify-center">
        <input
          type="text"
          id="taskInput"
          v-model="task"
          autocomplete="off"
          spellcheck="false"
          placeholder="做點重要的事吧..."
          class="w-8/12 px-3 py-2 text-xl placeholder-gray-300 border border-gray-300 rounded-l sm:w-10/12 sm:px-5 sm:py-3 sm:text-2xl focus:outline-none"
        />
        <button
          type="submit"
          class="px-6 py-2 text-xl text-white rounded-sm rounded-r cursor-pointer bg-rose-500 hover:bg-rose-400"
        >
          新增
        </button>
      </form>
    </section>

    <!-- 待辦事項列表 -->
    <section class="px-4 my-2 bg-white rounded-sm shadow-sm todo-list sm:px-8">
      <div v-if="isLoading" class="py-8 text-center text-gray-500">載入中...</div>

      <div v-else-if="todos.length === 0" class="py-8 text-center text-gray-500">
        還沒有待辦事項，開始新增一個吧！
      </div>

      <ul v-else class="py-1">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between py-5 mb-4 text-lg border-b border-gray-200 sm:text-2xl last:border-none last:mb-0"
          :class="{ completed: todo.completed_at !== null }"
        >
          <!-- 左側：checkbox 和內容 -->
          <div class="flex items-center sm:px-2">
            <label class="flex items-center px-2 cursor-pointer">
              <input
                type="checkbox"
                :checked="todo.completed_at !== null"
                @click="toggleTodo(todo.id)"
                class="w-6 h-6 mr-2 border border-gray-400 rounded"
              />
              <p
                class="content"
                :class="{
                  'text-gray-400 line-through': todo.completed_at !== null,
                  'text-gray-800': todo.completed_at === null,
                }"
              >
                {{ todo.content }}
              </p>
            </label>
          </div>

          <!-- 右側：操作按鈕 -->
          <div class="flex">
            <!-- 編輯按鈕 (未完成時才顯示) -->
            <a
              v-if="todo.completed_at === null"
              href="#"
              @click.prevent="handleEdit(todo)"
              class="px-2 py-2 mx-1 bg-gray-100 rounded-sm sm:px-4 sm:py-3 hover:bg-gray-200"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
            </a>

            <!-- 刪除按鈕 -->
            <a
              href="#"
              @click.prevent="deleteTodo(todo)"
              class="px-2 py-2 mx-1 bg-gray-100 rounded-sm sm:px-4 sm:py-3 hover:bg-gray-200"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </section>

    <!-- 編輯模態框 -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click="handleCancelEdit"
    >
      <div class="w-full max-w-md p-6 mx-4 bg-white rounded-lg" @click.stop>
        <h3 class="mb-4 text-lg font-bold">編輯待辦事項</h3>

        <form @submit.prevent="handleUpdate">
          <input
            type="text"
            v-model="todoText"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="請輸入待辦事項內容"
            required
          />

          <div class="flex justify-end gap-3 mt-4">
            <button
              type="button"
              @click="handleCancelEdit"
              class="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              取消
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed .edit {
  display: none;
}
</style>
