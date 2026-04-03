<script setup> 
import { useVerify } from '@/composables/useVerify'

const { verify } = useVerify()

 
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <!-- Navigation -->
    <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-10 py-3 bg-white dark:bg-slate-900">
      <div class="flex items-center gap-4 text-slate-900 dark:text-slate-100">
        <div class="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">DEVFED</h2>
      </div>
      <button class="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
        <span class="material-symbols-outlined text-[20px]">help</span>
      </button>
    </header>

    <!-- Main Content (Centered OTP Card) -->
    <main class="flex flex-1 items-center justify-center px-4 py-12">
      <div class="w-full max-w-[480px] bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col gap-8">
        <!-- Header Text -->
        <div class="flex flex-col gap-2 text-center">
          <h1 class="text-slate-900 dark:text-slate-100 text-3xl font-bold leading-tight tracking-tight">Verify your email</h1>
          <p class="text-slate-500 dark:text-slate-400 text-base">We've sent a 6-digit code to your email</p>
        </div>

        <!-- OTP Inputs -->
        <div class="flex justify-between gap-2 sm:gap-4">
          <input 
            v-for="i in 6" 
            :key="i"
            type="text" 
            maxlength="1" 
            inputmode="numeric"
            v-model="otp"
            class="w-full h-14 text-center text-xl font-bold rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-primary focus:ring-0 text-slate-900 dark:text-white"
          />
        </div>

        <!-- Verify Button -->
        <form @submit.prevent="verify">
          <button class="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg font-bold transition-colors shadow-lg shadow-primary/20">
            Verify
          </button>
        </form>

        <!-- Timer & Resend -->
        <div class="flex flex-col items-center gap-4">
          <div class="flex gap-2">
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="text-slate-900 dark:text-white font-bold text-lg">00</span>
            </div>
            <div class="flex items-center text-slate-400 dark:text-slate-600 font-bold">:</div>
            <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span class="text-slate-900 dark:text-white font-bold text-lg">59</span>
            </div>
          </div>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Didn't receive a code? 
            <button class="text-primary font-semibold hover:underline bg-transparent border-0 p-0">Resend code</button>
          </p>
        </div>
      </div>
    </main>

    <!-- Footer Decoration -->
    <footer class="p-10 text-center">
      <p class="text-slate-400 dark:text-slate-600 text-xs">
        © 2024 DEVFED Technology Group. Secure verification process.
      </p>
    </footer>
  </div>
</template>

<style>
button:nth-child(3) {
  background-color: rgb(15 23 42)
}
</style>