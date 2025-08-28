<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth.js'

const emit = defineEmits(['switch-to-login'])
const router = useRouter()
const { signup, isLoading } = useAuth()

const email = ref('')
const nickname = ref('')
const password = ref('')

const handleSubmit = async () => {
  const result = await signup(email.value, password.value, nickname.value)

  if (result.success) {
    // 註冊成功後清空表單並切換到登入
    email.value = ''
    nickname.value = ''
    password.value = ''
    emit('switch-to-login')
  }
}
</script>

<template>
  <section id="signUpSection" class="w-full pt-4 pb-8">
    <h1 class="mb-4 ml-1 text-3xl">註冊帳號</h1>

    <form
      id="signUpForm"
      @submit.prevent="handleSubmit"
      class="w-full px-0 py-3 border border-gray-100 shadow-sm sm:px-3 sm:py-6"
    >
      <!-- Email -->
      <div class="px-2 py-2">
        <label>
          <h3 class="text-xl">Email</h3>
          <input
            type="email"
            id="signUpEmail"
            v-model="email"
            autocomplete="off"
            spellcheck="false"
            placeholder="Email 信箱"
            class="w-full px-4 py-3 text-xl border border-gray-200 rounded-sm"
            required
          />
        </label>
      </div>

      <!-- 暱稱 -->
      <div class="px-2 py-2">
        <label>
          <h3 class="text-xl">暱稱</h3>
          <input
            type="text"
            id="signUpNickname"
            v-model="nickname"
            autocomplete="off"
            spellcheck="false"
            placeholder="要怎麼稱呼你呢？"
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
            id="signUpPassword"
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
          {{ isLoading ? '註冊中...' : '註冊' }}
        </button>

        <div class="text-xl text-gray-600">
          已經有帳號了？
          <a
            href="#"
            @click.prevent="emit('switch-to-login')"
            class="text-blue-500 underline hover:text-blue-600"
          >
            登入
          </a>
        </div>
      </div>
    </form>
  </section>
</template>
