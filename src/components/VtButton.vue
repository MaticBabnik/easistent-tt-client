<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
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
  <button class="button" :class="`vtb-${props.styling}`" :disabled="props.disabled">
    <slot name="icon"></slot>

    <span class="button-label">
      {{ props.text }}
    </span>
  </button>
</template>

<style lang="less" scoped>
@reference "../assets/main.less";

.button {
  @apply p-1 px-2 bg-gray-100 hover:bg-gray-200 rounded-md border;

  &.vtb-primary {
    @apply bg-blue-100 hover:bg-blue-200;
    .button-label {
      @apply text-blue-950 hover:text-blue-900;
    }
  }

  &.vtb-danger {
    @apply bg-rose-500 hover:bg-rose-600 border-rose-800;
    .button-label {
      @apply text-white hover:text-white;
    }
  }

  .button-label {
    @apply text-gray-700 hover:text-gray-900 font-medium;
  }
}
</style>
