/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BANNER_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
