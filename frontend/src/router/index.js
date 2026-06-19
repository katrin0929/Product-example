import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../pages/LogIn.vue'
import Register from '../pages/Register.vue'
import Verify from '../pages/Verify.vue'
import Dashboard from '../pages/Dashboard.vue'
import Projects from '../pages/Projects.vue'
import ProjectSettings from '../pages/ProjectSettings.vue'
import Documents from "../pages/Documents.vue";
import Billing from "../pages/Billing.vue";
import Profile from "../pages/Profile.vue";
import AppLayout from "@/components/layouts/AppLayout.vue";
import ProjectEdit from '../pages/ProjectEdit.vue'

const routes = [
  {
    path: "/reg",
    name: "register",
    component: Register,
  },
  {
    path: "/LogIn",
    name: "LogIn",
    component: LogIn,
  },

  {
    path: "/Verify",
    name: "Verify",
    component: Verify,
  },

  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },

      {
        path: "/Projects",
        name: "Projects",
        component: Projects,
      },

      {
        path: "/Documents",
        name: "Documents",
        component: Documents,
      },

      {
        path: "/Billing",
        name: "Billing",
        component: Billing,
      },

      {
        path: "/Profile",
        name: "Profile",
        component: Profile,
      },

      {
        path: "/ProjSet/:id",
        name: "ProjectSettings",
        component: ProjectSettings,
      },

      {
        path: "/ProjEd",
        name: "ProjectEdit",
        component: ProjectEdit,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router