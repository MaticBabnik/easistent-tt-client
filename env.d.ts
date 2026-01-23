/// <reference types="vite/client" />

import type { PlausibleImpl } from "@/analytics"

interface ImportMetaEnv {
  readonly VITE_BANNER_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_API_PATH: string

  readonly VITE_PLAUSIBLE_SITE?: string
  readonly VITE_PLAUSIBLE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
