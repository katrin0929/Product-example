<script setup>
import { useModal } from '@/composables/useModal'

const { projName, projDescription, radioPublic, radioPrivate, createProj } = useModal()
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')">Закрыть</button>
        <div class="bg-surface text-on-surface overflow-hidden">
    <!-- Dashboard Background (Blurred Content) -->
    <div class="flex h-screen blur-md pointer-events-none select-none">
      <!-- SideNavBar -->
      <aside
        class="bg-slate-100 dark:bg-slate-900 h-screen fixed left-0 top-0 w-64 flex flex-col h-full py-6 px-4 gap-2 border-r-0"
      >
        <div class="mb-8 px-4">
          <span class="text-lg font-black text-slate-900 dark:text-white"
            >The Precision Atelier</span
          >
          <p
            class="text-[0.6875rem] text-on-surface-variant uppercase tracking-wider"
          >
            Developer Environment
          </p>
        </div>
        <nav class="flex-1 flex flex-col gap-2">
          <div
            class="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg px-4 py-2 flex items-center gap-3 scale-[0.97]"
          >
            <span class="material-symbols-outlined">dashboard</span>
            <span class="text-[0.6875rem] uppercase tracking-wider"
              >Dashboard</span
            >
          </div>
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3 hover:bg-slate-200"
          >
            <span class="material-symbols-outlined">folder_open</span>
            <span class="text-[0.6875rem] uppercase tracking-wider"
              >Projects</span
            >
          </div>
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3 hover:bg-slate-200"
          >
            <span class="material-symbols-outlined">rocket_launch</span>
            <span class="text-[0.6875rem] uppercase tracking-wider"
              >Deployments</span
            >
          </div>
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3 hover:bg-slate-200"
          >
            <span class="material-symbols-outlined">bar_chart</span>
            <span class="text-[0.6875rem] uppercase tracking-wider"
              >Analytics</span
            >
          </div>
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3 hover:bg-slate-200"
          >
            <span class="material-symbols-outlined">groups</span>
            <span class="text-[0.6875rem] uppercase tracking-wider">Team</span>
          </div>
        </nav>
        <div class="mt-auto flex flex-col gap-2 pt-4">
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3"
          >
            <span class="material-symbols-outlined">menu_book</span>
            <span class="text-[0.6875rem] uppercase tracking-wider">Docs</span>
          </div>
          <div
            class="text-slate-500 dark:text-slate-400 px-4 py-2 flex items-center gap-3"
          >
            <span class="material-symbols-outlined">contact_support</span>
            <span class="text-[0.6875rem] uppercase tracking-wider"
              >Support</span
            >
          </div>
        </div>
      </aside>
      <!-- Main Content Area -->
      <main class="ml-64 flex-1 overflow-y-auto">
        <!-- TopNavBar -->
        <header
          class="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md w-full sticky top-0 z-40 flex justify-between items-center w-full px-6 py-3 border-b-0"
        >
          <div class="flex items-center gap-8">
            <span
              class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
              >DEVXP4U</span
            >
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                >search</span
              >
              <input
                class="pl-10 pr-4 py-1.5 bg-surface-container-low rounded-lg text-sm border-0 focus:ring-2 focus:ring-primary/20 w-64"
                placeholder="Search resources..."
                type="text"
              />
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-slate-500"
              >notifications</span
            >
            <span class="material-symbols-outlined text-slate-500"
              >help_outline</span
            >
            <div
              class="w-8 h-8 rounded-full overflow-hidden bg-surface-container-highest"
            >
              <img
                class="w-full h-full object-cover"
                data-alt="professional user headshot for profile avatar with clean studio lighting and neutral background"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFmRv7dEMSfeqAZZblvueAcf2iRkvVPymptKvkWT5twyqx8_xPNiQeqEZE1Bt8AUWYYEn5wMv_RYFvbIQmi13lGJRX1nJS0c8r8MVDitOau841y2MHn_FptTPv_FRKKXtHXhGlWEA3sNVHQsyoctvD6-oWQFP88J3XZ79Mau2IgA5oJKXsz0m1v_b_akEUZTT5ywrIMslAPeHmCQLehBTqEd0z8gElqfihk__wSr9IfSPGHU2ujmI6RLo9g3A90m6S3Rrar4J6LVUE"
              />
            </div>
          </div>
        </header>
        <!-- Dashboard Content Mock -->
        <div class="p-8 space-y-8 max-w-7xl mx-auto">
          <div class="flex justify-between items-end">
            <div>
              <p
                class="text-label-sm text-on-surface-variant font-medium tracking-wider mb-2"
              >
                OVERVIEW
              </p>
              <h1 class="text-5xl font-extrabold tracking-tight">
                Project Hub
              </h1>
            </div>
          </div>
          <!-- Bento Grid Layout Mockup -->
          <div class="grid grid-cols-12 gap-6">
            <div
              class="col-span-8 bg-surface-container-low rounded-xl p-8 h-64 shadow-sm"
            ></div>
            <div
              class="col-span-4 bg-primary-container rounded-xl p-8 h-64 text-on-primary-container"
            ></div>
            <div
              class="col-span-4 bg-surface-container-low rounded-xl p-8 h-80"
            ></div>
            <div
              class="col-span-8 bg-surface-container-low rounded-xl p-8 h-80"
            ></div>
          </div>
        </div>
      </main>
    </div>
    <!-- Modal Overlay -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4"
    >
      <!-- Modal Content -->
      <div
        class="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-[0px_20px_40px_rgba(19,27,46,0.12)] overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="px-8 pt-8 pb-6">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-extrabold text-on-surface tracking-tight">
              Start New Project
            </h2>
            <button
              class="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-on-surface-variant"
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <p class="text-on-surface-variant text-sm leading-relaxed">
            Set up your new workspace environment in seconds.
          </p>
        </div>
        <!-- Modal Body / Form -->
        <div class="px-8 py-2 space-y-6">
          <!-- Project Name -->
          <div class="space-y-2">
            <label
              class="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-widest"
              >Project Name</label
            >
            <input v-model="projName"
              class="w-full px-4 py-3 bg-surface-container-low rounded-lg border-0 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-fixed-dim transition-all"
              placeholder="e.g. Project Phoenix"
              type="text"
            />
          </div>
          <!-- Project Description -->
          <div class="space-y-2">
            <label 
              class="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-widest"
              >Project Description</label
            >
            <textarea v-model="projDescription"
              class="w-full px-4 py-3 bg-surface-container-low rounded-lg border-0 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-fixed-dim transition-all resize-none"
              placeholder="Briefly describe the purpose of this project..."
              rows="4"
            ></textarea>
          </div>
          <!-- Visibility Toggle -->
          <div class="space-y-3">
            <label
              class="text-[0.6875rem] font-semibold text-on-surface-variant uppercase tracking-widest"
              >Visibility</label
            >
            <div class="grid grid-cols-2 gap-4">
              <label
                class="relative flex items-center p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors group"
              >
                <input v-model="radioPublic"
                  checked=""
                  class="w-4 h-4 text-primary border-outline-variant focus:ring-primary"
                  name="visibility"
                  type="radio"
                  value="public"
                />
                <div class="ml-3">
                  <span class="block text-sm font-bold text-on-surface"
                    >Public</span
                  >
                  <span class="block text-[0.625rem] text-on-surface-variant"
                    >Visible to all team members</span
                  >
                </div>
              </label>
              <label
                class="relative flex items-center p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container-high transition-colors group"
              >
                <input v-model="radioPrivate"
                  class="w-4 h-4 text-primary border-outline-variant focus:ring-primary"
                  name="visibility"
                  type="radio"
                  value="private"
                />
                <div class="ml-3">
                  <span class="block text-sm font-bold text-on-surface"
                    >Private</span
                  >
                  <span class="block text-[0.625rem] text-on-surface-variant"
                    >Only invited collaborators</span
                  >
                </div>
              </label>
            </div>
          </div>
        </div>
        <!-- Modal Footer -->
        <form @submit.prevent="createProj">
          <div class="px-8 py-8 flex items-center justify-end gap-4 mt-4">
            <button
              class="px-6 py-2.5 rounded-lg text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button type="submit"
              class="px-8 py-2.5 rounded-lg bg-gradient-to-br from-primary to-primary-container text-sm font-bold text-on-primary shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

    </div>
  </div>

</template>

<style>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

body {
  font-family: "Inter", sans-serif;
}

h1,
h2,
h3,
h4 {
  font-family: "Manrope", sans-serif;
}

.glass {
  backdrop-filter: blur(12px);
}
</style>
