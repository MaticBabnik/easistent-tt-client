import { useDataStore } from '@/stores/data'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About'
      },
      component: () => import('@/views/AboutView.vue')
    },
    {
      // this redirect fails with teachers in dev mode, the %20 (space) fucks it up somehow
      path: '/t/:type/:arg',
      name: 'easistent-vue-redirect',
      component: { template: '<h1>Redirect failed</h1>' },
      beforeEnter: async ({ params }) => {
        if (typeof params.type !== 'string' || typeof params.arg !== 'string')
          return { name: 'home' }

        const ds = useDataStore()
        // we need to fetch something in order to have lists of teachers, rooms and classes
        await ds.fetchWeek()

        return ds.redirect(params.type, params.arg)
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: 'home' }
    }
  ]
})

const DEFAULT_TITLE = import.meta.env.VITE_APP_TITLE

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${DEFAULT_TITLE}: ${to.meta.title}` : DEFAULT_TITLE
  next()
})

export default router
