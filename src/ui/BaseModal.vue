<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['close'])

const modalClasses = computed(() => {
  const classes = [
    'relative',
    'bg-white',
    'rounded-lg',
    'shadow-xl',
    'w-full',
    'max-h-[90vh]',
    'overflow-y-auto',
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['max-w-sm'],
    md: ['max-w-md'],
    lg: ['max-w-lg'],
  }
  classes.push(...sizeClasses[props.size])

  return classes
})

const close = () => {
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop && props.closable) {
    close()
  }
}

// ESC 鍵支援
const handleEscape = (event) => {
  if (event.key === 'Escape' && props.closable && props.show) {
    close()
  }
}

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  },
)

// 清理
import { onUnmounted } from 'vue'
onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        @click="handleBackdropClick"
      >
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition-all duration-300"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div v-if="show" :class="modalClasses" @click.stop>
            <!-- 關閉按鈕 -->
            <button
              v-if="closable"
              @click="close"
              class="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <!-- 標題區域 -->
            <div v-if="title" class="p-6 pb-4">
              <h3 class="text-lg font-medium text-center text-gray-900">
                {{ title }}
              </h3>
            </div>

            <!-- 內容區域 -->
            <div class="px-6 pb-6">
              <slot></slot>
            </div>

            <!-- 底部操作區域 -->
            <div v-if="$slots.footer" class="px-6 pb-6">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
