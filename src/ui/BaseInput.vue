<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'enter', 'clear'])

const isFocused = ref(false)

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const showClearButton = computed(() => {
  return props.clearable && props.modelValue && !props.disabled && !props.readonly
})

const inputClasses = computed(() => {
  const classes = [
    'block',
    'w-full',
    'border',
    'border-gray-300',
    'rounded-md',
    'focus:outline-none',
    'focus:border-blue-500',
    'disabled:bg-gray-100',
    'disabled:cursor-not-allowed',
  ]

  // 尺寸樣式
  const sizeClasses = {
    sm: ['px-3', 'py-1.5', 'text-sm'],
    md: ['px-3', 'py-2', 'text-base'],
    lg: ['px-4', 'py-3', 'text-lg'],
  }
  classes.push(...sizeClasses[props.size])

  // 錯誤狀態
  if (props.error) {
    classes.push('border-red-500', 'focus:border-red-500')
  }

  return classes
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleEnter = (event) => {
  emit('enter', event)
}

const clearInput = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" :for="inputId" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <!-- 左側圖示 -->
      <div
        v-if="$slots.prefix"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <slot name="prefix"></slot>
      </div>

      <!-- 輸入框 -->
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keyup.enter="handleEnter"
      />

      <!-- 右側圖示 -->
      <div
        v-if="$slots.suffix || showClearButton"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <button
          v-if="showClearButton"
          type="button"
          @click="clearInput"
          class="p-1 text-gray-400 hover:text-gray-600"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <!-- 自定義後綴 -->
        <slot name="suffix"></slot>
      </div>
    </div>

    <!-- 提示訊息 -->
    <div v-if="hint || error" class="mt-1 text-sm">
      <p v-if="error" class="text-red-600">⚠ {{ error }}</p>
      <p v-else-if="hint" class="text-gray-500">{{ hint }}</p>
    </div>
  </div>
</template>
