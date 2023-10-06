<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Transition name="menu">
    <div class="navContainer" v-show="show">
      <div class="background" @click="emits('close')"></div>
      <div class="menu" v-show="show">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="less" scoped>
.navContainer {
  @apply fixed top-0 left-0 right-0 bottom-0 flex justify-end z-40;

  .background {
    @apply fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40;
  }

  .menu {
    @apply flex flex-col  w-4/6 sm:w-72 bg-white shadow-md z-50 dark:bg-gray-700 dark:text-white;
  }
}

.menu-enter-active,
.menu-leave-active {
  @apply transition-all;
}
.menu-enter-from,
.menu-leave-to {
  @apply opacity-0 translate-x-full;
}
</style>
