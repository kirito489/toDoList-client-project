<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'

const emit = defineEmits(['switch-to-signup'])
const router = useRouter()
const { login, isLoading } = useAuth()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  const result = await login(email.value, password.value)

  if (result.success) {
    // 登入成功後重定向到待辦事項頁面
    router.push('/todos')
  }
}
</script>

<template>
  <section id="loginSection" class="w-full pt-4 pb-8">
    <h1 class="mb-4 ml-1 text-3xl">登入</h1>

    <form
      id="loginForm"
      @submit.prevent="handleSubmit"
      class="w-full px-0 py-3 border border-gray-100 shadow-sm sm:px-3 sm:py-6"
    >
      <!-- Email -->
      <div class="px-2 py-2">
        <label>
          <h3 class="text-xl">Email</h3>
          <input
            type="email"
            id="loginEmail"
            v-model="email"
            autocomplete="off"
            spellcheck="false"
            placeholder="Email 信箱"
            class="w-full px-4 py-3 text-xl border border-gray-200 rounded-sm"
            required
          />
        </label>
      </div>

      <!-- 密碼 -->
      <div class="px-2 py-2">
        <label>
          <h3 class="text-xl">密碼</h3>
          <input
            type="password"
            id="loginPassword"
            v-model="password"
            autocomplete="off"
            spellcheck="false"
            placeholder="密碼，至少需要 6 個字"
            class="w-full px-4 py-3 text-xl border border-gray-200 rounded-sm"
            required
          />
        </label>
      </div>

      <!-- 提交按鈕和切換連結 -->
      <div class="items-center justify-between block px-2 py-2 sm:flex">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full px-3 py-2 my-2 text-2xl text-white bg-blue-500 rounded-sm cursor-pointer sm:w-1/2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? '登入中...' : '登入' }}
        </button>

        <div class="text-xl text-gray-600">
          還沒有帳號嗎？
          <a
            href="#"
            @click.prevent="emit('switch-to-signup')"
            class="text-blue-500 underline hover:text-blue-600"
          >
            註冊 </a
          >一個吧！
        </div>
      </div>
    </form>
  </section>
</template>
