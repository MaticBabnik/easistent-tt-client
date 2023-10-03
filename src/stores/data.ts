import { defineStore } from 'pinia'
import { computed, reactive, ref, type UnwrapNestedRefs } from 'vue'

export interface Teacher {
  key: string
  short: string
  fullName: string
  initials: string
}

export interface Room {
  display: string
  key: string
  id: number
}

export interface Class {
  display: string
  key: string
  id: number
}

export interface Week {
  week: number
  dates: Date[]
  hourOffsets: HourOffset[]
}

export type PeriodFlag =
  | 'SUBSTITUTE'
  | 'REPLACEMENT'
  | 'CANCELED'
  | 'NOTDONE'
  | 'EVENT'
  | 'OFFICEHOURS'
  | 'HALFTIME'
  | 'CLUB'

export type dayIndex = number

export interface Event {
  periodIndex: number
  dayIndex: dayIndex
  classKey: string
  title: {
    long: string
    short: string
  }
  flags: PeriodFlag[]
  teacherKey?: string
  classroomKey?: string
}

export interface HourOffset {
  startOffset: number
  endOffset: number
}

type SlashAllResponse = {
  teachers: Teacher[]
  rooms: Room[]
  classes: Class[]
  currentWeek: number
  week: {
    week: number
    dates: Date[]
    events: Event[]
    hourOffsets: HourOffset[]
  }
}

export type Promised<T> = { data: UnwrapNestedRefs<T> | undefined; error?: any; loading: boolean }
export function wrapPromise<T>(promise: Promise<T>): Promised<T> {
  const p = reactive({ data: undefined as any, error: undefined, loading: true })

  promise
    .then((x) => {
      p.data = x
      p.loading = false
    })
    .catch((x) => {
      p.error = x
      p.loading = false
    })

  return p
}

export type FWeek = { week: Week; events: Event[][][] }

export function weekGetActive(week: Week, time: number = Date.now()) {
  const DAY = 1000 * 60 * 60 * 24
  const dayOffsets = week.dates.map((date) => new Date(date).valueOf()).map((d) => time - d)

  const dayIndex = dayOffsets.findIndex((d) => d < DAY)
  const dayOffset = dayOffsets[dayIndex]

  const periodIndex = week.hourOffsets.findIndex(
    (x) => x.endOffset >= dayOffset || x.startOffset >= dayOffset
  )

  if (periodIndex !== -1) {
    const activePeriodStart = week.hourOffsets[periodIndex].startOffset
    // only show "upcoming" as active if it's within 12 hours
    if (Math.abs(activePeriodStart - time) > DAY / 2) return { dayIndex: -1, periodIndex: -1 }
  }

  return { dayIndex, periodIndex }
}

export const useDataStore = defineStore('data', () => {
  const teachers = ref<Map<string, Teacher>>(new Map<string, Teacher>())
  const rooms = ref<Map<string, Room>>(new Map<string, Room>())
  const classes = ref<Map<string, Class>>(new Map<string, Class>())
  const currentWeek = ref<number>(0)
  const time = ref<number>(Date.now())
  setInterval(() => (time.value = Date.now()), 60_000)

  async function fetchWeek(week?: number): Promise<FWeek> {
    const url = new URL(import.meta.env.VITE_API_PATH, document.location.href)
    url.pathname += 'all'
    if (week) url.searchParams.set('week', week.toString())

    const res = await fetch(url.toString())
    const data = (await res.json()) as SlashAllResponse

    // merge stuff into the store
    currentWeek.value = data.currentWeek
    data.teachers.forEach((teacher) => {
      teachers.value.set(teacher.key, teacher)
    })
    data.rooms.forEach((room) => {
      rooms.value.set(room.key, room)
    })
    data.classes.forEach((classroom) => {
      classes.value.set(classroom.key, classroom)
    })

    //process events
    const weekEvents: Event[][][] = []
    data.week.events.forEach((event) => {
      if (!weekEvents[event.dayIndex]) weekEvents[event.dayIndex] = []

      if (!weekEvents[event.dayIndex][event.periodIndex])
        weekEvents[event.dayIndex][event.periodIndex] = []

      weekEvents[event.dayIndex][event.periodIndex].push(event)
    })

    return {
      events: weekEvents,
      week: {
        dates: data.week.dates,
        hourOffsets: data.week.hourOffsets,
        week: data.week.week
      }
    }
  }

  const getSortedTeachers = computed(() => {
    return Array.from(teachers.value.values()).sort((a, b) => a.short.localeCompare(b.short))
  })

  const getSortedRooms = computed(() => {
    return Array.from(rooms.value.values()).sort(
      (a, b) => parseInt(a.display) - parseInt(b.display)
    )
  })

  const getSortedClasses = computed(() => {
    return Array.from(classes.value.values()).sort((a, b) => a.display.localeCompare(b.display))
  })

  return {
    teachers,
    rooms,
    classes,
    getSortedTeachers,
    getSortedRooms,
    getSortedClasses,
    time,
    currentWeek,
    fetchWeek
  }
})
