import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  }
]

export { routes }
