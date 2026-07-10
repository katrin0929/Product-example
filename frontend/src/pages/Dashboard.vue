<script setup>
import { useDashboard } from '@/composables/useDashboard';
import Modal from "@/components/Modal.vue";
import Dropdown from "@/components/Dropdown.vue";

const { isModalOpen, openModal, closeModal } = useDashboard()

const recentDocs = [
  { icon: 'article', name: 'API_Architecture_v2.pdf', modified: 'Modified 2h ago', ownerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH0ZEwxYAze6yF5Mh7Psw-Bo15y1ek3eje2FtznshGbBX1Yb3jh7URt6iY1TpKty_0r6FL1-BkZKzvb9n5L2G56CNH5-4DdaivVBc1rcMfOt7uJ8eBgNZo6_3f7PmEhjkqyhQP52wQoapGFVIM38n3YYkf6tq2uR7NzcrcEgb7oJD158trGYohAZ0OnHrorSpSkdN3FJSR6CPQwk9Z2oh3lPWNaugchneTq7pfGQcY3k5NYMHoUu1zEK6_hPCCVbj56csd1ZaUrsBz', status: 'In Review' },
  { icon: 'description', name: 'Q4_Performance_Metrics.xlsx', modified: 'Modified 5h ago', ownerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAefKZSRVU4k1ntDVG_kqnUuzF9bqnhZ5ki5RsF96B2dF_pOV2JSW7m2Oz5Uf-9xHw_Uqze-2H_m4PAnxwKauOMrFSDXsA8y3VUwDIPHxp4TSOdYmqlo9xacUxtfbD6iFlG6CG1wnNTKuJMKDjcNsqXbQVO0f-HJMJubpETJ3fYZb2rDXxMj0D89fvbB5KrKQAVBLW3c6Pkxl_4Jy1TfHzijVTfAWwGfMRSu7SF3POhjs64f4nPy2N9KIISxbTtSndoKv57fWU58nq7', status: 'Completed' },
  { icon: 'folder_zip', name: 'Project_Alpha_Assets.zip', modified: 'Modified 1d ago', ownerImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5wkqYtH0SXTOb2kuCzbIvjgFqKf3xM3b-puBY93k_-W5Rmdp4HF1W9nM-V2z6hYTM9-rYuyJ_Mu2NcdulLVQ75K5HAtw-SFB0JoBGMclitUPiUW8zcmgl70Ie1VlKLuUtJGtwoEqaeQVHJ3b1SYxRZR4rvXQSfFDMyPQRHH2Q4OX3QnAd4uHSNGI2jBKebEH-LdUqTYLwrKNDb5eHMt2VnOvMlS4vnQYFPFN39w89qCzCkb2hl52TucexM2rBaqZI4Uu5YA-G-ydQ', status: 'Completed' },
]

const statusClass = {
  'In Review': 'bg-amber-100 text-amber-700',
  Completed: 'bg-emerald-100 text-emerald-700',
}
</script>

<template>
<main class="p-8 max-w-7xl mx-auto space-y-10">
    <!-- 1. Welcoming Hero Section -->
    <section class="relative overflow-hidden rounded-xl bg-primary-container p-10 text-on-primary">
      <div class="relative z-10 max-w-2xl">
        <h1 class="text-4xl font-extrabold tracking-tight mb-4 headline">Welcome back, Alex.</h1>
        <p class="text-lg text-on-primary-container font-medium mb-8 leading-relaxed">
          Your workspace is humming along. You have <span class="font-bold text-white">12 active projects</span> running and <span class="font-bold text-white">4 documents</span> awaiting your approval.
        </p>
        <div class="flex flex-wrap gap-4">
          <button @click="openModal" class="px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-xl shadow-indigo-900/20 hover:scale-105 transition-transform flex items-center gap-2" type="button">
            <span class="material-symbols-outlined">add_circle</span>
            Start New Project
          </button>
          <Modal v-if="isModalOpen" @close="closeModal" />
          <button class="px-6 py-3 bg-indigo-500/30 text-white font-bold rounded-lg backdrop-blur-sm border border-indigo-400/30 hover:bg-indigo-500/40 transition-colors">
            View Documentation
          </button>
        </div>
      </div>
      <!-- Abstract Decorative Element -->
      <div class="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.5,-61.8C60.1,-54.1,68,-37.8,71.2,-21.2C74.4,-4.6,72.9,12.3,66.1,27.5C59.3,42.7,47.2,56.2,32.3,64.2C17.4,72.2,-0.2,74.7,-17.7,71.1C-35.1,67.6,-52.4,58.1,-63.3,43.5C-74.2,28.8,-78.7,9,-75.4,-9.1C-72.1,-27.1,-61,-43.3,-46.8,-50.8C-32.6,-58.3,-15.3,-57.1,1.9,-59.7C19,-62.3,34.9,-69.5,47.5,-61.8Z" fill="currentColor" transform="translate(200 200)"></path>
        </svg>
      </div>
    </section>

    <!-- 2. Quick Stats Section (Bento Grid Style) -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-indigo-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">rocket_launch</span>
          </div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Live Now</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline">24</p>
        <p class="text-sm font-medium text-slate-500">Active Deployments</p>
        <div class="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-emerald-600 text-xs font-bold">
          <span class="material-symbols-outlined text-sm">trending_up</span>
          12% increase from last week
        </div>
      </div>
      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">cloud_queue</span>
          </div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Capacity</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline">82%</p>
        <p class="text-sm font-medium text-slate-500">Storage Used (1.2TB)</p>
        <div class="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-amber-500 rounded-full" style="width: 82%"></div>
        </div>
      </div>
      <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
        <div class="flex justify-between items-start mb-4">
          <div class="w-12 h-12 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
            <span class="material-symbols-outlined">notification_important</span>
          </div>
          <span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Attention</span>
        </div>
        <p class="text-3xl font-extrabold text-slate-900 mb-1 headline">09</p>
        <p class="text-sm font-medium text-slate-500">Pending Notifications</p>
        <div class="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-500 text-xs font-bold">
          <span class="material-symbols-outlined text-sm">schedule</span>
          Last check 4 mins ago
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- 3. Recent Documents Table (Editorial Style) -->
      <section class="lg:col-span-2 space-y-6">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-2xl font-bold tracking-tight headline">Recent Documents</h2>
            <p class="text-sm text-on-surface-variant mt-1">Review and manage your precision blueprints.</p>
          </div>
          <button class="text-primary text-sm font-bold hover:underline">View All</button>
        </div>
        <div class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-surface-container-low/50">
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Document Name</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Owner</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-4 text-[0.6875rem] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="doc in recentDocs" :key="doc.name" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-indigo-400">{{ doc.icon }}</span>
                    <div>
                      <p class="text-sm font-semibold text-slate-900">{{ doc.name }}</p>
                      <p class="text-xs text-slate-400">{{ doc.modified }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex -space-x-2 overflow-hidden">
                    <img alt="Team member" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" :src="doc.ownerImg" />
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold', statusClass[doc.status]]">{{ doc.status }}</span>
                </td>
                <td class="px-6 py-4 text-right">
                  <Dropdown>
                    <template #trigger-el>
                      <button class="text-slate-400 hover:text-primary transition-colors">
                        <span class="material-symbols-outlined">more_vert</span>
                      </button>
                    </template>
                    <template #content-dropdown>
                      <div class="w-56 rounded-md bg-white shadow-lg py-1">
                        <button type="button" class="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"><span class="material-symbols-outlined text-lg">download</span>Download</button>
                        <hr class="my-1" />
                        <button type="button" class="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left text-red-600"><span class="material-symbols-outlined text-lg">delete</span>Delete</button>
                      </div>
                    </template>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight headline">Activity Feed</h2>
        <div class="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-slate-200">
          <div class="relative flex gap-4">
            <div class="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
              <span class="material-symbols-outlined text-[12px] text-white">cloud_upload</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">Main Server Backup</p>
              <p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">Automated backup completed successfully. 450GB synced to US-East-1.</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">12 Minutes Ago</p>
            </div>
          </div>
          <div class="relative flex gap-4">
            <div class="relative z-10 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center ring-4 ring-background">
              <span class="material-symbols-outlined text-[12px] text-white">warning</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">Threshold Alert</p>
              <p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">API Latency exceeded 200ms in the Sydney region. Traffic re-routed.</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">45 Minutes Ago</p>
            </div>
          </div>
          <div class="relative flex gap-4">
            <div class="relative z-10 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center ring-4 ring-background">
              <span class="material-symbols-outlined text-[12px] text-white">group_add</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">New Team Member</p>
              <p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">Sarah Connor was added to the <span class="text-primary font-medium">#precision-ops</span> workspace.</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">2 Hours Ago</p>
            </div>
          </div>
          <div class="relative flex gap-4 opacity-60">
            <div class="relative z-10 w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center ring-4 ring-background">
              <span class="material-symbols-outlined text-[12px] text-white">check_circle</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900">Security Audit</p>
              <p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">Weekly security scan finished. No vulnerabilities found in 45 repositories.</p>
              <p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">Yesterday</p>
            </div>
          </div>
        </div>
        <button class="w-full py-3 bg-surface-container-low text-slate-600 font-bold text-xs rounded-lg uppercase tracking-widest hover:bg-surface-container-high transition-colors">
          Load More Activity
        </button>
      </section>
    </div>
  </main>
</template>