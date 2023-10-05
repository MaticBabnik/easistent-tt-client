<script setup lang="ts">
import {
  useDataStore,
  type Event as PeriodEvent,
  wrapPromise,
  type Promised,
  type FWeek
} from '@/stores/data'
import { useI18n } from 'vue-i18n'
import { computed, reactive, ref, watch } from 'vue'
import TimetableComponent from '@/components/TimetableComponent.vue'
import FilterInputComponent from '@/components/FilterInputComponent.vue'
import { storeToRefs } from 'pinia'
import TrashIcon from '@/icons/TrashIcon.vue'
import { useCommonStore } from '@/stores/common'
import INeedMoreBulletsComponent from '@/components/INeedMoreBulletsComponent.vue'
import PeriodModalComponent from '@/components/PeriodModalComponent.vue'
import { useRoute, useRouter, type LocationQuery } from 'vue-router'
import FilterModeButton from '@/components/FilterModeButton.vue'
import SpinnerIcon from '@/icons/SpinnerIcon.vue'
import WeekSwitcher from '@/components/WeekSwitcher.vue'
import { parseQueryParam, qsList, qsWeek } from '@/queryUtil'

const route = useRoute()
const router = useRouter()
const commonStore = useCommonStore()
const { useAltLayout } = storeToRefs(commonStore)
const dataStore = useDataStore()

// wrapPromise(dataStore.fetchWeek())
const week = ref<Promised<FWeek>>({
  loading: true,
  data: undefined,
  error: undefined
})

const { getSortedTeachers, getSortedRooms, getSortedClasses } = storeToRefs(dataStore)

const filterMode = ref<'replace' | 'add'>('replace')

const params = reactive<{
  teachers: string[]
  classes: string[]
  rooms: string[]
  week?: number
}>({
  teachers: [],
  classes: [],
  rooms: [],
  week: undefined
})

function syncFromUrl(q: LocationQuery) {
  params.teachers = parseQueryParam(q.teachers, qsList) ?? []
  params.classes = parseQueryParam(q.classes, qsList) ?? []
  params.rooms = parseQueryParam(q.rooms, qsList) ?? []
  params.week = parseQueryParam(q.week, qsWeek)
}

function emptyAsNull<T>(array: T[]): T[] | null {
  return array.length === 0 ? null : array
}

function syncToUrl(replace = true) {
  router.push({
    query: {
      teachers: emptyAsNull(params.teachers)?.join(','),
      classes: emptyAsNull(params.classes)?.join(','),
      rooms: emptyAsNull(params.rooms)?.join(','),
      week: params.week?.toString()
    },
    replace
  })
}

function amerge<T>(a: T[] | undefined, b: T[] | undefined): T[] {
  // something, something should have used a set...
  return [...(a ?? []), ...(b ?? [])].filter((v, i, a) => a.indexOf(v) === i)
}

const changeFilters = (
  mode: 'replace' | 'add' | 'remove',
  data: {
    teachers?: string[]
    classes?: string[]
    rooms?: string[]
  }
) => {
  switch (mode) {
    case 'replace':
      params.teachers = data.teachers ?? []
      params.classes = data.classes ?? []
      params.rooms = data.rooms ?? []
      break
    case 'add':
      params.teachers = amerge(params.teachers, data.teachers)
      params.classes = amerge(params.classes, data.classes)
      params.rooms = amerge(params.rooms, data.rooms)
      break
    case 'remove':
      params.teachers = params.teachers.filter((v) => !data.teachers?.includes(v))
      params.classes = params.classes.filter((v) => !data.classes?.includes(v))
      params.rooms = params.rooms.filter((v) => !data.rooms?.includes(v))
      break
  }
  // syncToUrl(false)
}

const teacherDropdownData = computed(() =>
  getSortedTeachers.value.map((teacher) => ({
    display: teacher.short,
    value: teacher.key
  }))
)

const roomDropdownData = computed(() =>
  getSortedRooms.value.map((room) => ({
    display: room.display,
    value: room.key
  }))
)

const classesDropdownData = computed(() =>
  getSortedClasses.value.map((class_) => ({
    display: class_.display,
    value: class_.key
  }))
)

const updateOnFilterEvent = (data: {
  key: 'teachers' | 'classes' | 'rooms'
  value: {
    display: string
    value: string
  }
}) => {
  changeFilters(filterMode.value, {
    [data.key]: [data.value.value]
  })
}

const clearFilters = () => {
  changeFilters('replace', {
    teachers: [],
    classes: [],
    rooms: []
  })
}

const periodModalData = ref<{
  show: boolean
  period: {
    events: PeriodEvent[]
    date: Date
    period: number
  }
}>({
  show: false,
  period: {
    events: [],
    date: new Date(),
    period: 0
  }
})

function weekInc(i: -1 | 1) {
  let currentWeek = params.week ?? week.value.data?.week.week
  if (currentWeek === undefined) return

  currentWeek += i

  if (currentWeek < 1 || currentWeek > 52) return
  if (currentWeek === dataStore.currentWeek) currentWeek = undefined
  params.week = currentWeek
}

function weekSet(week: number | undefined) {
  if (!!week && isNaN(week)) return
  if (!!week && (week < 1 || week > 52)) return
  if (week === dataStore.currentWeek) week = undefined
  params.week = week
}

const { t } = useI18n()

syncFromUrl(route.query)
syncToUrl(true)

week.value = wrapPromise(dataStore.fetchWeek(params.week))

watch(router.currentRoute, (v) => {
  syncFromUrl(v.query)
})
watch(params, () => {
  syncToUrl(false)
})

// shitty hack cuz new and old values are the same when for properties of reactive objects
const paramWeek = computed(() => params.week)
watch(paramWeek, (n, o) => {
  if (n !== o) week.value = wrapPromise(dataStore.fetchWeek(n))
})
</script>

<template>
  <Teleport :to="useAltLayout ? '#alt-filters' : '#filter-teleport'">
    <!-- <div class="filters"> -->
    <FilterModeButton v-model:value="filterMode" />
    <FilterInputComponent
      type="dropdown"
      :title="t('home.filterTitles.teachers')"
      :dropdownData="teacherDropdownData"
      @dropdownChange="(d) => updateOnFilterEvent({ ...d, key: 'teachers' })"
      :reset="params.teachers.length === 0"
    ></FilterInputComponent>
    <FilterInputComponent
      type="dropdown"
      :title="t('home.filterTitles.rooms')"
      :dropdownData="roomDropdownData"
      @dropdownChange="(d) => updateOnFilterEvent({ ...d, key: 'rooms' })"
      :reset="params.rooms.length === 0"
    ></FilterInputComponent>
    <FilterInputComponent
      type="dropdown"
      :title="t('home.filterTitles.classes')"
      :dropdownData="classesDropdownData"
      @dropdownChange="(d) => updateOnFilterEvent({ ...d, key: 'classes' })"
      :reset="params.classes.length === 0"
    ></FilterInputComponent>

    <!-- <div class="clearFilterButton" @click="clearFilters"><TrashIcon></TrashIcon></div>  -->
    <!-- </div> -->
  </Teleport>
  <Teleport to="#filter-teleport">
    <WeekSwitcher :week="params.week ?? week.data?.week.week" @inc="weekInc" @set="weekSet" />
  </Teleport>

  <div class="not-timetable loading" v-if="week.loading">
    <SpinnerIcon />
  </div>
  <div class="not-timetable error" v-else-if="week.error">
    <pre>{{ week.error }}</pre>
  </div>
  <template v-else>
    <div class="appliedFilters">
      <template v-for="filters_key in ['teachers', 'classes', 'rooms']" :key="filters_key">
        <INeedMoreBulletsComponent
          v-for="(filter, id) in params[filters_key as 'teachers' | 'classes' | 'rooms']"
          :key="id"
          :type="filters_key as any"
          :dataKey="filter"
          v-show="filter !== ''"
          @removeFilter="
            (data) => {
              changeFilters('remove', {
                [data.key]: [data.value]
              })
            }
          "
        />
      </template>
    </div>
    <TimetableComponent
      :filterData="params"
      :week="week.data!.week"
      :events="week.data!.events"
      @changeFilter="
        (data) => {
          changeFilters('replace', {
            [data.key]: [...data.value]
          })
        }
      "
      @openPeriod="
        (data) => {
          periodModalData.show = true
          periodModalData.period = data
        }
      "
    ></TimetableComponent>

    <PeriodModalComponent
      :current-week="week.data!.week"
      :show="periodModalData.show"
      :periodData="periodModalData.period"
      @close="periodModalData.show = false"
    ></PeriodModalComponent>
  </template>
</template>

<style scoped lang="less">
.timetable {
  @apply w-full;
}

.filters {
  // @apply w-full flex flex-wrap gap-x-4 gap-y-2 items-center justify-center p-2;
}
.appliedFilters {
  @apply w-full flex flex-wrap gap-x-4 gap-y-2 items-center p-2;
}

.appliedFilters {
  @apply lg:max-h-28 min-h-min overflow-y-auto;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}

.showFilters {
  @apply w-full flex items-center px-2 cursor-pointer text-left text-gray-600 underline hover:text-blue-300 transition-colors duration-100 dark:text-gray-200 dark:hover:text-blue-300;
}

.clearFilterButton {
  @apply w-8 h-8 rounded-full bg-red-300 flex items-center justify-center cursor-pointer active:scale-90 transition-all;
}

.hideFilterButton {
  @apply w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center cursor-pointer  active:scale-90 transition-all;
}

.not-timetable {
  @apply w-full h-full flex justify-center items-center;

  &.error pre {
    @apply bg-red-100 dark:bg-red-900 rounded-lg p-4 text-red-700 font-mono dark:text-red-300 border-red-500 border-2;
  }
}
</style>
