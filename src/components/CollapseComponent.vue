<script setup lang="ts">
import ChevronUpIcon from '@/icons/ChevronUpIcon.vue'

const props = defineProps<{
  active: string
  name: string
}>()

const emit = defineEmits<{
  (e: 'update:active', newActive: string): void
}>()

function toggle() {
  emit('update:active', props.active === props.name ? '' : props.name)
}
</script>

<template>
  <div class="collapse-main">
    <div class="collapse-header" @click="toggle">
      <ChevronUpIcon class="icon" :class="{ flip: name !== active }" />
      <slot name="header">
        {{ name }}
      </slot>
    </div>
    <div class="collapse-content" :class="{ hide: name !== active }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.collapse-main {
  .collapse-header {
    @apply flex flex-row items-center space-x-2 cursor-pointer;
    .icon {
      transition: transform 0.2s ease-in-out;
    }
    .flip {
      transform: rotate(180deg);
    }
  }

  .collapse-content {
    @apply overflow-hidden max-h-screen transition-all duration-100 delay-100 ease-linear border-l border-l-2 border-slate-500 pl-4;
  }

  .collapse-content.hide {
    @apply max-h-0 overflow-hidden delay-0;
  }
}
</style>
