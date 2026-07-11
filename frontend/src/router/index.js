import { createRouter, createWebHistory } from 'vue-router'
import { utils } from '../utils'
import LogIn from '../pages/LogIn.vue'
import Register from '../pages/Register.vue'
import Verify from '../pages/Verify.vue'
import Dashboard from '../pages/Dashboard.vue'
import Projects from '../pages/Projects.vue'
import ProjectSettings from '../pages/ProjectSettings.vue'
import Documents from "../pages/Documents.vue";
import Billing from "../pages/Billing.vue";
import PaymentMethodAdd from "../pages/PaymentMethodAdd.vue";
import Purchase from "../pages/Purchase.vue";
import PaymentMethodEdit from "../pages/PaymentMethodEdit.vue";
import Profile from "../pages/Profile.vue";
import AppLayout from "@/components/layouts/AppLayout.vue";
import ProjectEdit from '../pages/ProjectEdit.vue'
import Payment from '../pages/Payment.vue'
import PaymentSuccess from '../pages/PaymentSuccess.vue'
import PaymentFail from '../pages/PaymentFail.vue'

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
    path: "/pay/:checkoutId",
    name: "Payment",
    component: Payment,
  },

  {
    path: "/pay/:checkoutId/success",
    name: "PaymentSuccess",
    component: PaymentSuccess,
  },

  {
    path: "/pay/:checkoutId/fail",
    name: "PaymentFail",
    component: PaymentFail,
  },

  {
    path: "/",
    component: AppLayout,
    meta: { requiresAuth: true },
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
        path: "/Purchase",
        name: "Purchase",
        component: Purchase,
      },

      {
        path: "/PaymentMethodAdd",
        name: "PaymentMethodAdd",
        component: PaymentMethodAdd,
      },

      {
        path: "/PaymentMethodEdit",
        name: "PaymentMethodEdit",
        component: PaymentMethodEdit,
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

// Нет токена → на защищённые страницы (дети AppLayout) не пускаем.
// Протухший (но присутствующий) токен ловится на 401 через authFetch.
router.beforeEach((to) => {
  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth)
  if (requiresAuth && !utils().getTokens()?.accessToken) {
    return { name: "LogIn" }
  }
})

export default router