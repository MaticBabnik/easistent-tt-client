<script setup lang="ts">
import ChevronUpIcon from '@/icons/ChevronUpIcon.vue'

const props = defineProps<{
  week?: number
}>()

const emit = defineEmits<{
  (e: 'inc', i: -1 | 1): void
  (e: 'set', i: number): void
}>()
</script>

<template>
  <div class="week-switcher">
    <button class="left" @click="emit('inc', -1)" :disabled="week === 1">
      <ChevronUpIcon class="-rotate-90" />
    </button>
    <input
      type="number"
      inputmode="numeric"
      enterkeyhint="go"
      min="1"
      max="52"
      :value="props.week"
      @change="(e) => emit('set', (e.target as HTMLInputElement).valueAsNumber)"
    />
    <button class="right" @click="emit('inc', 1)" :disabled="week === 52">
      <ChevronUpIcon class="rotate-90" />
    </button>
  </div>
</template>

<style lang="less">
.week-switcher {
  @apply flex flex-row items-center justify-center border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-700 dark:border-gray-500;

  &:focus-within {
    @apply ring-1 ring-cyan-300;
  }

  input {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;

    &:focus {
      outline: none;
    }

    @apply text-center bg-white dark:bg-gray-700 dark:border-gray-500 text-black dark:text-white;
  }

  .left,
  .right {
    @apply p-2 border-gray-300 dark:border-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ease-in-out duration-75 disabled:cursor-default;
    &:disabled > * {
      opacity: 0.5;
    }
  }
  .left {
    @apply border-r;
  }
  .right {
    @apply border-l;
  }
}
</style>
