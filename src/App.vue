<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.js'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 應用標題 -->
    <header class="px-4 py-6 banner">
      <h1
        class="text-6xl font-thin text-center text-gray-800"
        style="font-family: 'Shadows Into Light', cursive"
      >
        <router-link to="/" class="no-underline transition-colors hover:text-rose-500">
          TODO!
        </router-link>
      </h1>
      <div class="flex items-center justify-between mt-2 text-sm">
        <p class="px-2 text-gray-500">Simple TODO App</p>
        <div class="hidden px-2 text-gray-500 sm:block">
          powered by
          <p class="underline hover:text-rose-500 author"
            >Alan TSAI</p
          >
          |
          <a href="https://todoo.5xcamp.us" class="underline hover:text-rose-500" target="_blank"
            >API文件</a
          >
          |
          <a
            href="https://github.com/kirito489/toDoList-client-project"
            class="underline hover:text-rose-500"
            target="_blank"
            >GitHub</a
          >
        </div>
      </div>
    </header>

    <!-- 主要內容 -->
    <main class="container max-w-4xl px-4 py-6 mx-auto">
      <router-view />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');

.author {
  display: inline;
}
</style>
