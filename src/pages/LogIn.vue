<script setup>
import { useAuth } from '@/composables/useAuth'

const { email, password, checkbox, signIn } = useAuth()
</script>

<template>
<div class="bg-background-light dark:bg-background-dark font-display min-h-screen flex items-center justify-center p-4">
<div class="w-full max-w-[440px] flex flex-col items-center">
<!-- Brand Header -->
<div class="mb-8 flex flex-col items-center gap-2">
<div class="size-12 bg-primary flex items-center justify-center rounded-xl text-white shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-3xl">terminal</span>
</div>
<h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">DEVFED</h1>
<p class="text-slate-500 dark:text-slate-400 text-sm">Empowering the future of development</p>
</div>
<!-- Login Card -->
<div class="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
<!-- Decorative Visual -->
<div class="h-1.5 w-full bg-primary/10">
<div class="h-full w-1/3 bg-primary"></div>
</div>
<div class="p-8">
<div class="mb-6">
<h2 class="text-slate-900 dark:text-slate-100 text-xl font-bold">Welcome back</h2>
<p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Please enter your details to sign in.</p>
</div>
<!-- Email Field -->
<form @submit.prevent="signIn">
<div>
<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" for="email">Email address</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
<input v-model = "email" class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" id="email" placeholder="name@company.com"/>
</div>
</div>
<!-- Password Field -->
<div>
<div class="flex items-center justify-between mb-1.5">
<label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mt-5" for="password">Password</label>
<a class="text-xs font-semibold text-primary hover:underline" href="#">Forgot password?</a>
</div>
<div class="relative">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
<input v-model = "password" class="w-full pl-10 pr-12 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm" id="password" placeholder="••••••••" type="password"/>
<button class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" type="button">
<span class="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
<!-- Remember Me -->
<div class="flex items-center mt-5 mb-5">
<input v-model="checkbox" class="w-4 h-4 text-primary border-slate-300 dark:border-slate-700 rounded focus:ring-primary transition-colors cursor-pointer" id="remember" type="checkbox"/>
<label class="ml-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer" for="remember">Remember me for 30 days</label>
</div>
<!-- Submit Button -->
<button class="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
<span>Sign In</span>
<span class="material-symbols-outlined text-[18px]">login</span>
</button>
</form>
<!-- Social Divider -->
<div class="relative my-8">
<div class="absolute inset-0 flex items-center">
<div class="w-full border-t border-slate-100 dark:border-slate-800"></div>
</div>
<div class="relative flex justify-center text-xs uppercase">
<span class="bg-white dark:bg-slate-900 px-2 text-slate-400">Or continue with</span>
</div>
</div>
<!-- Social Button -->
<button class="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-700 dark:text-slate-300 text-sm font-medium">
<svg class="w-5 h-5" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"></path>
</svg>
                    GitHub
                </button>
</div>
<!-- Footer Link -->
<div class="bg-slate-50 dark:bg-slate-800/50 p-6 border-t border-slate-100 dark:border-slate-800 text-center">
<p class="text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account? 
                    <a class="text-primary font-bold hover:underline" href="#">Create an account</a>
</p>
</div>
</div>
<!-- System Status -->
<div class="mt-8 flex items-center gap-4">
<div class="flex items-center gap-1.5">
<span class="flex h-2 w-2 rounded-full bg-emerald-500"></span>
<span class="text-xs text-slate-500 dark:text-slate-400">All systems operational</span>
</div>
<div class="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
<a class="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-colors" href="#">Privacy Policy</a>
<a class="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 transition-colors" href="#">Terms of Service</a>
</div>
</div>
</div>
</template>