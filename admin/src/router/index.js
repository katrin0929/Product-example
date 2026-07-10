import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import CreditPacks from '../pages/CreditPacks.vue'
import { getToken } from '../utils'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'CreditPacks',
    component: CreditPacks,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authed = Boolean(getToken())
  if (to.name !== 'Login' && !authed) return { name: 'Login' }
  if (to.name === 'Login' && authed) return { name: 'CreditPacks' }
})

export default router
