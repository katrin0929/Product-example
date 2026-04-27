import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../pages/LogIn.vue'
import Register from '../pages/Register.vue'
import Verify from '../pages/Verify.vue'
import Dashboard from '../pages/Dashboard.vue'
import Projects from '../pages/Projects.vue'
import ProjectSettings from '../pages/ProjectSettings.vue'

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

        {
    path: '/Projects',
    name: 'Projects',
    component: Projects,
  },

    {
    path: '/ProjSet',
    name: 'ProjectSettings',
    component: ProjectSettings,
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router