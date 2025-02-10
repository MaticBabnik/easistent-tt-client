import { useCommonStore } from '@/stores/common'
import { storeToRefs } from 'pinia'

const color = storeToRefs(useCommonStore()).getColor

// Too lazy so here's the original source:
// https://stackoverflow.com/a/49562686
export const hashCode = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

export const getColor = (str: string) => {
  const hue = hashCode(str) % 360
  const chroma = 0.2
  const lightness = color.value === 'light' ? 50 : 76
  return `oklch(${lightness}% ${chroma} ${hue})`
}
