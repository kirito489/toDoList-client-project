<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '../components/auth/LoginForm.vue'
import SignUpForm from '../components/auth/SignUpForm.vue'

const route = useRoute()
const router = useRouter()

const authMode = ref('loginSection')

// 根據 query 參數設置初始模式
onMounted(() => {
  const mode = route.query.mode
  if (mode === 'signup') {
    authMode.value = 'signUpSection'
  } else {
    authMode.value = 'loginSection'
  }
})

const showLogin = () => {
  authMode.value = 'loginSection'
  router.replace({ query: { mode: 'login' } })
}

const showSignUp = () => {
  authMode.value = 'signUpSection'
  router.replace({ query: { mode: 'signup' } })
}
</script>

<template>
  <div class="px-6 py-4 bg-white rounded-sm shadow-sm">
    <!-- 導覽列 -->
    <nav class="flex justify-end pt-6 pb-3">
      <template v-if="authMode === 'loginSection'">
        <a
          href="#sign_up"
          @click.prevent="showSignUp"
          class="px-2 py-1 text-xl text-gray-800 hover:text-gray-500 sm:px-4"
        >
          註冊
        </a>
      </template>
      <template v-else>
        <a
          href="#login"
          @click.prevent="showLogin"
          class="px-2 py-1 text-xl text-gray-800 hover:text-gray-500 sm:px-4"
        >
          登入
        </a>
      </template>
    </nav>

    <!-- 認證表單區域 -->
    <section id="userSection">
      <!-- 登入表單 -->
      <template v-if="authMode === 'loginSection'">
        <LoginForm @switch-to-signup="showSignUp" />
      </template>

      <!-- 註冊表單 -->
      <template v-if="authMode === 'signUpSection'">
        <SignUpForm @switch-to-login="showLogin" />
      </template>
    </section>
  </div>
</template>
