<script setup lang="ts">
import { watch, ref } from 'vue'
import ChevronUpIcon from '@/icons/ChevronUpIcon.vue'

const props = defineProps<{
  type: 'dropdown' | 'search' | 'week'
  title?: string
  placeholder?: string
  reset?: boolean
  dropdownData?: {
    display: string
    value: string
  }[]
}>()

const emits = defineEmits<{
  (
    e: 'dropdownChange',
    value: {
      value: {
        display: string
        value: string
      }
    }
  ): void
  (e: 'searchChange', value: string): void
}>()

const inputDropdownData = ref({
  items: props.dropdownData,
  selected: undefined as { display: string; value: string } | undefined,
  showDropdown: false
})

//unfuck items
watch(props, (x) => {
  inputDropdownData.value.items = x.dropdownData
})

const searchRef = ref<HTMLInputElement>()

const mouseLeaveLogic = () => {
  if (props.type === 'dropdown') inputDropdownData.value.showDropdown = false
}

const mouseClickLogic = () => {
  if (props.type === 'dropdown')
    inputDropdownData.value.showDropdown = !inputDropdownData.value.showDropdown
}

const changeDropdownData = (value: { display: string; value: string }) => {
  inputDropdownData.value.selected = value
  inputDropdownData.value.showDropdown = false

  emits('dropdownChange', {
    value: value
  })
}

watch(props, () => {
  switch (props.type) {
    case 'dropdown':
      if (props.reset) {
        inputDropdownData.value.selected = undefined
        inputDropdownData.value.showDropdown = false
        return
      }
      break
    case 'search':
      if (props.reset) {
        searchRef.value!.value = ''
      }
      break
  }
})
</script>

<template>
  <div class="wrapper">
    <div
      class="filterInput"
      :class="{
        dropdown: props.type === 'dropdown',
        search: props.type === 'search',
        week: props.type === 'week',
        open: inputDropdownData.showDropdown
      }"
      @mouseleave="mouseLeaveLogic"
      @click.self="mouseClickLogic"
    >
      <template v-if="props.type === 'dropdown'">
        <div class="title" @click="mouseClickLogic">
          {{ props.title }}
        </div>
        <div class="mode" @click="mouseClickLogic">
          <ChevronUpIcon class="icon" />
        </div>
        <Transition name="dropdown">
          <div class="optionContainer" v-show="inputDropdownData.showDropdown">
            <div
              class="option"
              v-for="(item, id) in inputDropdownData.items"
              :key="id"
              @click="changeDropdownData(item)"
            >
              {{ item.display }}
            </div>
          </div>
        </Transition>
      </template>
      <template v-if="props.type === 'search'">
        <input
          ref="searchRef"
          type="text"
          class="searchInput"
          spellcheck="false"
          :placeholder="props.placeholder"
        />
      </template>
      <template v-if="props.type === 'week'"></template>
    </div>
  </div>
</template>

<style scoped lang="less">
::-webkit-scrollbar {
  @apply hidden;
}
.wrapper {
  @apply flex flex-row gap-2 items-center;
}
.filterInput {
  @apply relative select-none;

  &.dropdown {
    @apply bg-white px-2 py-1 rounded-lg shadow-lg cursor-pointer border border-gray-300 w-40 text-center flex transition dark:bg-gray-700 dark:border-gray-500;

    &.open {
      @apply rounded-none rounded-t-lg border-b-0 border-red-300 border-2;
      .mode .icon {
        @apply rotate-0;
      }
      .optionContainer {
        @apply rounded-none rounded-b-lg border-t-0 border-red-300 border-2 dark:border-red-300;
        width: calc(100% + 4px);
      }
    }

    .mode {
      @apply flex flex-col justify-center py-1 pr-1 transition-all active:scale-90 float-right;
      .icon {
        @apply w-4 h-4 rotate-180 transition-all ease-in-out duration-100;
      }
    }

    .title {
      @apply z-10 text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap text-left flex items-center dark:text-gray-300 flex-1;
    }

    .optionContainer {
      @apply absolute left-1/2 transform -translate-x-1/2 h-56 overflow-y-auto bg-white mt-7 z-20 rounded-md shadow-lg cursor-pointer border border-gray-300 p-1 flex flex-col gap-1 text-left text-gray-600 w-full
      dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200;

      .option {
        @apply px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600;
      }
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
      @apply transition-all;
    }
    .dropdown-enter-from,
    .dropdown-leave-to {
      @apply opacity-0;
    }
  }

  &.search {
    @apply bg-white rounded-lg shadow-lg w-40 text-center flex transition-all duration-100 ease-in-out dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200;

    outline: 1px solid var(--color-gray-300);

    &:has(.searchInput:focus) {
      outline: 2px solid var(--color-red-300);
    }

    .searchInput {
      @apply z-10 text-gray-600 outline-0 w-full rounded-lg p-2 bg-transparent
      dark:bg-transparent dark:text-gray-200;
    }
  }
}

html.dark {
  .search {
    outline: 1px solid var(--color-gray-500);
  }
}
</style>
