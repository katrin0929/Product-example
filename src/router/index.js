import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../pages/LogIn.vue'
import Register from '../pages/Register.vue'
import Verify from '../pages/Verify.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/reg',
    name: 'register',
    component: Register,
  },
  {
    path: '/LogIn',
    name: 'LogIn',
    component: LogIn,
  },

    {
    path: '/Verify',
    name: 'Verify',
    component: Verify,
  },

      {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router