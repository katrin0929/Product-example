<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Dashboard', label: 'Dashboard', icon: 'dashboard',       to: '/Dashboard' },
  { name: 'Projects',  label: 'Projects',  icon: 'folder',          to: '/Projects'  },
  { name: 'Documents', label: 'Documents', icon: 'description',     to: '/Documents' },
  { name: 'Billing',   label: 'Billing',   icon: 'payments',        to: null },
  { name: 'Profile',   label: 'Profile',   icon: 'account_circle',  to: null },
]

const bottomItems = [
  { name: 'Support',          label: 'Support',  icon: 'contact_support', to: null },
  { name: 'ProjectSettings',  label: 'Settings', icon: 'settings',        to: '/ProjSet' },
]

const activeClass =
  'text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10 scale-[0.98] transition-transform duration-150 font-medium'
const inactiveClass =
  'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-medium'
const bottomInactiveClass =
  'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors'

const isActive = (name) => route.name === name
const navClass = (name) => (isActive(name) ? activeClass : inactiveClass)
const bottomClass = (name) => (isActive(name) ? activeClass : bottomInactiveClass)

const linkBase = 'flex items-center gap-3 px-3 py-2.5 rounded-lg'
</script>

<template>
  <div class="bg-background text-on-background selection:bg-primary-fixed">
    <!-- SideNavBar -->
    <aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 flex-col bg-slate-50 dark:bg-slate-950 border-r border-slate-200/10 dark:border-slate-800/10 z-50">
      <div class="px-6 py-8 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
          <span class="material-symbols-outlined">precision_manufacturing</span>
        </div>
        <div>
          <h2 class="font-manrope font-extrabold text-indigo-600 dark:text-indigo-400 text-lg leading-none">DEVXP4U</h2>
          <p class="text-[0.6875rem] font-medium text-slate-500 uppercase tracking-widest mt-1">Precision Atelier</p>
        </div>
      </div>

      <nav class="flex-1 px-4 space-y-2 mt-4">
        <template v-for="item in navItems" :key="item.name">
          <router-link
            v-if="item.to"
            :to="item.to"
            :class="[linkBase, navClass(item.name)]"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </router-link>
          <a
            v-else
            href="#"
            :class="[linkBase, inactiveClass]"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </nav>

      <div class="p-4 border-t border-slate-200/10 dark:border-slate-800/10 space-y-1">
        <template v-for="item in bottomItems" :key="item.name">
          <router-link
            v-if="item.to"
            :to="item.to"
            :class="[linkBase, bottomClass(item.name)]"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </router-link>
          <a
            v-else
            href="#"
            :class="[linkBase, bottomInactiveClass]"
          >
            <span class="material-symbols-outlined">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        </template>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="md:pl-64 min-h-screen">
      <!-- TopAppBar -->
      <header class="sticky top-0 z-40 w-full px-6 py-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center shadow-sm dark:shadow-none border-b border-slate-200/20 dark:border-slate-800/20">
        <div class="flex items-center gap-8 flex-1">
          <div class="relative w-full max-w-md">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-fixed-dim placeholder:text-slate-400"
              placeholder="Search resources..."
              type="text"
            />
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-50"></span>
          </button>
          <button class="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
            <span class="material-symbols-outlined">help_outline</span>
          </button>
          <div class="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
          <div class="flex items-center gap-3 pl-2">
            <div class="text-right hidden sm:block">
              <p class="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-none">Alex Rivera</p>
              <p class="text-[0.6875rem] text-slate-500 mt-1">Lead Architect</p>
            </div>
            <img
              alt="User profile avatar"
              class="w-10 h-10 rounded-full ring-2 ring-indigo-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc_g6yEjB_mSR9Jx8cU-VTiPn26WePjTXlwYF4imYY9EbtxfVpaXRQ1t_VG0ESCcufn-eGv89Vm5EOCeowthySsP31LdeKZoNQrHdVZG5RTUVe31Qisv9co_Mu1A6gvIIs9FQqiK9MFWPYm4nwmrU777S6QjfQZO7mAURC4CuWDRcFyy_4U9-LvkocnfzkuLjGyWpW_ioIzY0kKumdLxsxJh-XDI58XdMuRHvsMdOeDO2IuaHSFegRdoqJsVocL6wmQfDPQmCJDuvR"
            />
          </div>
        </div>
      </header>

      <RouterView />
    </div>
  </div>
</template>

<style>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
body {
  font-family: 'Inter', sans-serif;
}
h1, h2, h3, .headline {
  font-family: 'Manrope', sans-serif;
}
</style>