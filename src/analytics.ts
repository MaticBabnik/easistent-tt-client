import {
  init as pInit,
  track as pTrack,
  type CustomProperties,
  type PlausibleConfig
} from '@plausible-analytics/tracker'

const site = import.meta.env.VITE_PLAUSIBLE_SITE
const endpoint = import.meta.env.VITE_PLAUSIBLE_ENDPOINT

let hasPlausible = false

export function init() {
  if (site && endpoint) {
    const cfg: PlausibleConfig = {
      domain: site,
      endpoint: endpoint,
      captureOnLocalhost: import.meta.env.DEV,
      logging: import.meta.env.DEV
    }

    console.log(cfg, pInit(cfg))
    hasPlausible = true
  }
}

const reportedEvents = new Set<string>()

export function trackEventOnce(type: string, props?: CustomProperties, interactive = true) {
  if (!hasPlausible) return
  if (reportedEvents.has(type)) return

  reportedEvents.add(type)

  pTrack(type, {
    props,
    interactive
  })
}

export function track(type: string, props?: CustomProperties, interactive = true) {
  if (!hasPlausible) return
  pTrack(type, {
    props,
    interactive
  })
}
