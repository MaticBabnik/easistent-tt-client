<script setup lang="ts">
import ArrowRotateIcon from '@/icons/ArrowRotateIcon.vue'
import CirclePlusIcon from '@/icons/CirclePlusIcon.vue'
import VtButton from './VtButton.vue'

type FilterMode = 'replace' | 'add'

defineProps<{
  value: FilterMode
}>()

defineEmits<{
  (e: 'update:value', mode: FilterMode): void
}>()
// :text="$t(`home.filterMode.${value}`)"
</script>

<template>
  <VtButton
    class="aspect-square"
    @click="() => $emit('update:value', value == 'add' ? 'replace' : 'add')"
  >
    <template #icon>
      <ArrowRotateIcon class="icon" v-if="value == 'replace'" />
      <CirclePlusIcon class="icon" v-else />
    </template>
  </VtButton>
</template>

<style lang="less">
@reference "../assets/main.less";

.filter-mode-button {
  @apply p-1 px-2 border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-700 dark:border-gray-500 text-gray-600 dark:text-gray-200 focus:ring-1 ring-cyan-300 text-left;
  min-width: 7rem;
  .icon {
    @apply inline-block w-4 h-4 mr-1;
  }
}
</style>
