import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import CreditPacks from '../pages/CreditPacks.vue'
import Users from '../pages/Users.vue'
import Admins from '../pages/Admins.vue'
import AdminLayout from '../components/AdminLayout.vue'
import { getToken } from '../utils'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'CreditPacks',
        component: CreditPacks,
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
      },
      {
        path: 'admins',
        name: 'Admins',
        component: Admins,
      },
    ],
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
