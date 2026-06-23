<script setup>
import { useProfileSettings } from '@/composables/useProfileSettings';
import { onMounted, ref } from 'vue';

const { saveChange, getUserById } = useProfileSettings()

let data = ref({
    "address": {
      "city": "",
      "region": "",
      "country": "",
      "line1": "123 Main St",
      "line2": ""
  }
});


const idDocuments = [
  { icon: 'badge', tone: 'bg-indigo-50 text-primary', title: 'Government ID', meta: 'passport.pdf · 1.2 MB', status: 'Verified', statusClass: 'bg-emerald-100 text-emerald-700' },
  { icon: 'home', tone: 'bg-amber-50 text-amber-600', title: 'Proof of Address', meta: 'utility_bill.pdf · 480 KB', status: 'In Review', statusClass: 'bg-amber-100 text-amber-700' },
]

onMounted(async() => {
    const user = await getUserById()
    data.value = {
        ...user,
        address: { ...data.value.address, ...(user?.address ?? {}) },
    }
})
</script>

<template>
  <main class="p-8 max-w-[820px] mx-auto space-y-8">
    <div class="space-y-2">
      <h1 class="text-4xl font-extrabold text-on-surface tracking-tight headline">Profile</h1>
      <p class="text-on-surface-variant text-sm max-w-xl">Manage your personal details, sign-in security, identity documents, and account data.</p>
    </div>

    <!-- Identity header -->
    <section class="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-8">
      <div class="relative z-10 flex flex-wrap items-center gap-6">
        <div class="relative">
          <div class="w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm ring-4 ring-white/20 flex items-center justify-center text-3xl font-extrabold headline">AR</div>
          <button type="button" class="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"><span class="material-symbols-outlined text-lg">photo_camera</span></button>
        </div>
        <div class="flex-1 min-w-[200px]">
          <div class="flex items-center gap-2 mb-1"><h2 class="text-2xl font-extrabold headline">Alex Rivera</h2><span class="inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-white/20 text-white">PRO</span></div>
          <p class="text-on-primary-container text-sm">alex.rivera@devxp4u.com</p>
          <p class="text-on-primary-container/70 text-xs mt-2 flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">calendar_today</span>Member since January 2024 · Lead Architect</p>
        </div>
      </div>
      <div class="absolute right-0 top-0 w-1/3 h-full opacity-20 pointer-events-none"><svg class="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"><path d="M47.5,-61.8C60.1,-54.1,68,-37.8,71.2,-21.2C74.4,-4.6,72.9,12.3,66.1,27.5C59.3,42.7,47.2,56.2,32.3,64.2C17.4,72.2,-0.2,74.7,-17.7,71.1C-35.1,67.6,-52.4,58.1,-63.3,43.5C-74.2,28.8,-78.7,9,-75.4,-9.1C-72.1,-27.1,-61,-43.3,-46.8,-50.8C-32.6,-58.3,-15.3,-57.1,1.9,-59.7C19,-62.3,34.9,-69.5,47.5,-61.8Z" fill="currentColor" transform="translate(200 200)"></path></svg></div>
    </section>

    <!-- Personal information -->
    <section class="bg-surface-container-lowest rounded-xl shadow-sm p-6 md:p-8 space-y-6">
      <div><h3 class="text-lg font-bold tracking-tight headline">Personal Information</h3><p class="text-sm text-on-surface-variant mt-0.5">This information appears on your invoices and receipts.</p></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label class="flex flex-col"><span class="text-sm font-medium text-on-surface-variant pb-2">Full name</span><input v-model="data.name" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col"><span class="text-sm font-medium text-on-surface-variant pb-2">Phone number</span><input  v-model="data.phone" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col md:col-span-2"><span class="text-sm font-medium text-on-surface-variant pb-2">Address line 1</span><input v-model="data.address.line1" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col md:col-span-2"><span class="text-sm font-medium text-on-surface-variant pb-2">Address line 2</span><input v-model="data.address.line2" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col md:col-span-2"><span class="text-sm font-medium text-on-surface-variant pb-2">Address region</span><input v-model="data.address.region" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col"><span class="text-sm font-medium text-on-surface-variant pb-2">City</span><input v-model="data.address.city" class="rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"/></label>
        <label class="flex flex-col relative"><span class="text-sm font-medium text-on-surface-variant pb-2">Country</span><select v-model="data.address.country" class="appearance-none rounded-lg border border-outline-variant/30 bg-surface px-4 h-12 text-sm text-on-surface cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent"><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Germany</option></select><span class="material-symbols-outlined absolute right-3 bottom-3 pointer-events-none text-on-surface-variant">keyboard_arrow_down</span></label>
      </div>
      <div class="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button type="button" class="px-5 py-2.5 rounded-lg text-on-surface text-sm font-bold hover:bg-surface-container-high transition-colors">Cancel</button>
        <button type="button" class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-lg text-sm font-bold shadow-[0_10px_20px_rgba(79,70,229,0.18)] hover:opacity-90 transition-opacity" @click="saveChange(data)">Save Changes</button>
      </div>
    </section>

    <!-- Sign-in & security -->
    <section class="bg-surface-container-lowest rounded-xl shadow-sm p-6 md:p-8 space-y-5">
      <div><h3 class="text-lg font-bold tracking-tight headline">Sign-in &amp; Security</h3><p class="text-sm text-on-surface-variant mt-0.5">Changing your email requires verification before it takes effect.</p></div>
      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center"><span class="material-symbols-outlined">mail</span></div>
          <div>
            <div class="flex items-center gap-2"><p class="text-sm font-semibold text-on-surface">alex.rivera@devxp4u.com</p><span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.625rem] font-bold bg-emerald-100 text-emerald-700"><span class="material-symbols-outlined text-xs" style="font-variation-settings:'FILL' 1">verified</span>Verified</span></div>
            <p class="text-xs text-on-surface-variant mt-0.5">Primary email · used for sign-in and receipts</p>
          </div>
        </div>
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors">Change email</button>
      </div>
      <div class="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200/60">
        <span class="material-symbols-outlined text-amber-600 mt-0.5">schedule</span>
        <div class="flex-1"><p class="text-sm font-semibold text-amber-800">Verify your new email</p><p class="text-xs text-amber-700/90 mt-0.5">We sent a confirmation link to <span class="font-semibold">a.rivera@gmail.com</span>. It expires in 30 minutes.</p></div>
        <button type="button" class="text-amber-700 text-sm font-bold hover:underline whitespace-nowrap">Resend</button>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center"><span class="material-symbols-outlined">password</span></div>
          <div><p class="text-sm font-semibold text-on-surface">Password</p><p class="text-xs text-on-surface-variant mt-0.5">Last changed 3 months ago</p></div>
        </div>
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors">Change password</button>
      </div>
    </section>

    <!-- Identity documents -->
    <section class="bg-surface-container-lowest rounded-xl shadow-sm p-6 md:p-8 space-y-5">
      <div class="flex items-end justify-between gap-4"><div><h3 class="text-lg font-bold tracking-tight headline">Identity Documents</h3><p class="text-sm text-on-surface-variant mt-0.5">Uploaded for account verification.</p></div><button type="button" class="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors"><span class="material-symbols-outlined text-lg">upload</span>Upload</button></div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div v-for="doc in idDocuments" :key="doc.title" class="rounded-lg border border-outline-variant/20 p-4 flex flex-col gap-3">
          <div class="flex items-center justify-between"><div :class="['w-10 h-10 rounded-lg flex items-center justify-center', doc.tone]"><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">{{ doc.icon }}</span></div><span :class="['inline-flex items-center px-2 py-0.5 rounded-full text-[0.625rem] font-bold', doc.statusClass]">{{ doc.status }}</span></div>
          <div><p class="text-sm font-semibold text-on-surface">{{ doc.title }}</p><p class="text-xs text-on-surface-variant">{{ doc.meta }}</p></div>
        </div>
        <button type="button" class="rounded-lg border border-dashed border-outline-variant/40 p-4 flex flex-col items-center justify-center gap-2 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-colors min-h-[112px]">
          <span class="material-symbols-outlined">add_circle</span><span class="text-xs font-medium">Add document</span>
        </button>
      </div>
    </section>

    <!-- Data & account -->
    <section class="bg-surface-container-lowest rounded-xl shadow-sm p-6 md:p-8 space-y-5">
      <h3 class="text-lg font-bold tracking-tight headline">Data &amp; Account</h3>
      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-low">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center"><span class="material-symbols-outlined">download</span></div>
          <div><p class="text-sm font-semibold text-on-surface">Export your data</p><p class="text-xs text-on-surface-variant mt-0.5">Download a copy of your profile, documents, and payment history.</p></div>
        </div>
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface text-sm font-bold hover:bg-surface-container-highest transition-colors">Request export</button>
      </div>
      <div class="rounded-xl outline outline-1 outline-error/20 bg-surface p-6">
        <h4 class="text-base font-bold text-error mb-2 tracking-tight headline">Danger Zone</h4>
        <p class="text-sm text-on-surface-variant mb-5 leading-relaxed">Permanently delete your account and all associated data. This action cannot be undone.</p>
        <div class="flex flex-wrap items-center justify-between gap-4 bg-error-container p-4 rounded-lg">
          <div><p class="font-bold text-on-error-container text-sm">Delete account</p><p class="text-xs text-on-error-container/70 mt-0.5">All projects, documents, and history will be wiped.</p></div>
          <button type="button" class="bg-error text-on-error px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-error/90 transition-colors shadow-sm">Delete account</button>
        </div>
      </div>
    </section>
  </main>
</template>
