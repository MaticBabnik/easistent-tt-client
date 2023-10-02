<script setup lang="ts">
import ArrowRotateIcon from '@/icons/ArrowRotateIcon.vue'
import CirclePlusIcon from '@/icons/CirclePlusIcon.vue'

type FilterMode = 'replace' | 'add'

defineProps<{
  value: FilterMode
}>()

defineEmits<{
  (e: 'update:value', mode: FilterMode): void
}>()
</script>

<template>
  <button
    class="filter-mode-button"
    @click="() => $emit('update:value', value == 'add' ? 'replace' : 'add')"
  >
    <ArrowRotateIcon v-if="value == 'replace'" />
    <CirclePlusIcon v-else />
  </button>
</template>

<style lang="less">
.filter-mode-button {
  //   @apply;
}
</style>
