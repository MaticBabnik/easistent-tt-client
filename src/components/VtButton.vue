<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text?: string
    disabled?: boolean
    styling?: 'normal' | 'primary' | 'danger'
  }>(),
  {
    disabled: false,
    styling: 'normal'
  }
)

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <button
    @click="!disabled && emit('click')"
    class="button"
    :class="`vtb-${props.styling}`"
    :disabled="props.disabled"
  >
    <slot name="icon" />

    <span v-if="props.text" class="button-label">
      {{ props.text }}
    </span>
  </button>
</template>

<style lang="less" scoped>
@reference "../assets/main.less";

.button {
  @apply cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed p-1 px-2 flex flex-row items-center gap-2 bg-gray-100 enabled:hover:bg-gray-200 rounded-md text-gray-700 enabled:hover:text-gray-900 font-medium shadow-sm;

  &.vtb-primary {
    @apply bg-blue-500 enabled:hover:bg-blue-600 text-white enabled:hover:text-white;
  }

  &.vtb-danger {
    @apply bg-rose-500 enabled:hover:bg-rose-600 text-white enabled:hover:text-white;
  }
}
</style>
