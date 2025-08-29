<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success', 'outline'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-md',
    'focus:outline-none',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-4', 'py-2', 'text-base'],
    lg: ['px-6', 'py-3', 'text-lg'],
  }
  classes.push(...sizeClasses[props.size])

  // 變體樣式
  const variantClasses = {
    primary: ['bg-blue-500', 'text-white', 'hover:bg-blue-600', 'active:bg-blue-700'],
    secondary: ['bg-gray-200', 'text-gray-900', 'hover:bg-gray-300', 'active:bg-gray-400'],
    danger: ['bg-red-500', 'text-white', 'hover:bg-red-600', 'active:bg-red-700'],
    success: ['bg-green-500', 'text-white', 'hover:bg-green-600', 'active:bg-green-700'],
    outline: [
      'border',
      'border-gray-300',
      'bg-white',
      'text-gray-700',
      'hover:bg-gray-50',
      'active:bg-gray-100',
    ],
  }
  classes.push(...variantClasses[props.variant])

  if (props.block) {
    classes.push('w-full')
  }

  return classes
})

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses" @click="handleClick">
    <!-- loading 圓圈 -->
    <span
      v-if="loading"
      class="w-4 h-4 mr-2 border-2 border-current rounded-full border-t-transparent animate-spin opacity-70"
    ></span>
    <!-- 按鈕文字 -->
    <span>
      <slot></slot>
    </span>
  </button>
</template>
