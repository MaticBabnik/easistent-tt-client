import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Error = {
  where: string
  what: string
  when: string
}

export const useDevStore = defineStore('dev', () => {
  const backendInfo = ref({})
  const frontendInfo = import.meta.env
  const errors = ref<Error[]>([])

  async function getDevInfo() {
    try {
      const response = await fetch(import.meta.env.VITE_API_PATH + 'dev')
      const data = await response.json()

      backendInfo.value = data
    } catch (e) {
      console.error('Failed to get /dev ', e)
    }
  }
  async function getErrors() {
    try {
      const response = await fetch(import.meta.env.VITE_API_PATH + 'errors')
      const data = await response.json()

      errors.value = data.errors
    } catch (e) {
      console.error('Failed to get /errors ', e)
    }
  }

  getDevInfo()
  getErrors()

  return { backendInfo, frontendInfo, errors }
})
