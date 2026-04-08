<script>
import { useDashboard } from '@/composables/useDashboard';
</script>

<template>
    <div class="bg-background text-on-background selection:bg-primary-fixed">
<!-- SideNavBar (Authority: JSON & Design System) -->
<aside class="hidden md:flex h-screen w-64 fixed left-0 top-0 flex-col bg-slate-50 dark:bg-slate-950 border-r border-slate-200/10 dark:border-slate-800/10 z-50">
<div class="px-6 py-8 flex items-center gap-3">
<div class="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
<span class="material-symbols-outlined" data-icon="precision_manufacturing">precision_manufacturing</span>
</div>
<div>
<h2 class="font-manrope font-extrabold text-indigo-600 dark:text-indigo-400 text-lg leading-none">DEVXP4U</h2>
<p class="text-[0.6875rem] font-medium text-slate-500 uppercase tracking-widest mt-1">Precision Atelier</p>
</div>
</div>
<nav class="flex-1 px-4 space-y-2 mt-4">
<!-- Active State: Dashboard -->
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-600 dark:text-indigo-400 border-r-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10 scale-[0.98] transition-transform duration-150 font-medium" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-medium" href="#">
<span class="material-symbols-outlined" data-icon="description">description</span>
<span>Documents</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-medium" href="#">
<span class="material-symbols-outlined" data-icon="payments">payments</span>
<span>Billing</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors font-medium" href="#">
<span class="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span>Profile</span>
</a>
</nav>
<div class="p-4 border-t border-slate-200/10 dark:border-slate-800/10 space-y-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="contact_support">contact_support</span>
<span>Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span>Settings</span>
</a>
</div>
</aside>
<!-- Main Content Wrapper -->
<div class="md:pl-64 min-h-screen">
<!-- TopAppBar (Authority: JSON & Design System) -->
<header class="sticky top-0 z-40 w-full px-6 py-3 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center shadow-sm dark:shadow-none border-b border-slate-200/20 dark:border-slate-800/20">
<div class="flex items-center gap-8 flex-1">
<div class="relative w-full max-w-md">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-fixed-dim placeholder:text-slate-400" placeholder="Search resources..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors relative">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-50"></span>
</button>
<button class="p-2 text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors">
<span class="material-symbols-outlined" data-icon="help_outline">help_outline</span>
</button>
<div class="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
<div class="flex items-center gap-3 pl-2">
<div class="text-right hidden sm:block">
<p class="text-sm font-semibold text-slate-900 dark:text-slate-50 leading-none">Alex Rivera</p>
<p class="text-[0.6875rem] text-slate-500 mt-1">Lead Architect</p>
</div>
<img alt="User profile avatar" class="w-10 h-10 rounded-full ring-2 ring-indigo-100" data-alt="Professional headshot of a young male software engineer in a clean modern office setting with soft natural light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc_g6yEjB_mSR9Jx8cU-VTiPn26WePjTXlwYF4imYY9EbtxfVpaXRQ1t_VG0ESCcufn-eGv89Vm5EOCeowthySsP31LdeKZoNQrHdVZG5RTUVe31Qisv9co_Mu1A6gvIIs9FQqiK9MFWPYm4nwmrU777S6QjfQZO7mAURC4CuWDRcFyy_4U9-LvkocnfzkuLjGyWpW_ioIzY0kKumdLxsxJh-XDI58XdMuRHvsMdOeDO2IuaHSFegRdoqJsVocL6wmQfDPQmCJDuvR"/>
</div>
</div>
</header>
<main class="p-8 max-w-7xl mx-auto space-y-10">
<!-- 1. Welcoming Hero Section -->
<section class="relative overflow-hidden rounded-xl bg-primary-container p-10 text-on-primary">
<div class="relative z-10 max-w-2xl">
<h1 class="text-4xl font-extrabold tracking-tight mb-4 headline">Welcome back, Alex.</h1>
<p class="text-lg text-on-primary-container font-medium mb-8 leading-relaxed">
                        Your workspace is humming along. You have <span class="font-bold text-white">12 active projects</span> running and <span class="font-bold text-white">4 documents</span> awaiting your approval.
                    </p>
<div class="flex flex-wrap gap-4">
<button class="px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-xl shadow-indigo-900/20 hover:scale-105 transition-transform flex items-center gap-2">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                            Start New Project
                        </button>
<button class="px-6 py-3 bg-indigo-500/30 text-white font-bold rounded-lg backdrop-blur-sm border border-indigo-400/30 hover:bg-indigo-500/40 transition-colors">
                            View Documentation
                        </button>
</div>
</div>
<!-- Abstract Decorative Element -->
<div class="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
<svg class="w-full h-full" viewbox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
<path d="M47.5,-61.8C60.1,-54.1,68,-37.8,71.2,-21.2C74.4,-4.6,72.9,12.3,66.1,27.5C59.3,42.7,47.2,56.2,32.3,64.2C17.4,72.2,-0.2,74.7,-17.7,71.1C-35.1,67.6,-52.4,58.1,-63.3,43.5C-74.2,28.8,-78.7,9,-75.4,-9.1C-72.1,-27.1,-61,-43.3,-46.8,-50.8C-32.6,-58.3,-15.3,-57.1,1.9,-59.7C19,-62.3,34.9,-69.5,47.5,-61.8Z" fill="currentColor" transform="translate(200 200)"></path>
</svg>
</div>
</section>
<!-- 2. Quick Stats Section (Bento Grid Style) -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-lg bg-indigo-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
<span class="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
</div>
<span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Live Now</span>
</div>
<p class="text-3xl font-extrabold text-slate-900 mb-1 headline">24</p>
<p class="text-sm font-medium text-slate-500">Active Deployments</p>
<div class="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-emerald-600 text-xs font-bold">
<span class="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
                        12% increase from last week
                    </div>
</div>
<div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
<div class="flex justify-between items-start mb-4">
<div class="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
<span class="material-symbols-outlined" data-icon="cloud_queue">cloud_queue</span>
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
<span class="material-symbols-outlined" data-icon="notification_important">notification_important</span>
</div>
<span class="text-[0.6875rem] font-bold text-slate-400 tracking-widest uppercase">Attention</span>
</div>
<p class="text-3xl font-extrabold text-slate-900 mb-1 headline">09</p>
<p class="text-sm font-medium text-slate-500">Pending Notifications</p>
<div class="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-500 text-xs font-bold">
<span class="material-symbols-outlined text-sm" data-icon="schedule">schedule</span>
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
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-indigo-400" data-icon="article">article</span>
<div>
<p class="text-sm font-semibold text-slate-900">API_Architecture_v2.pdf</p>
<p class="text-xs text-slate-400">Modified 2h ago</p>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="flex -space-x-2 overflow-hidden">
<img alt="Team member" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" data-alt="Portrait of a smiling professional woman with bright lighting in an office environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH0ZEwxYAze6yF5Mh7Psw-Bo15y1ek3eje2FtznshGbBX1Yb3jh7URt6iY1TpKty_0r6FL1-BkZKzvb9n5L2G56CNH5-4DdaivVBc1rcMfOt7uJ8eBgNZo6_3f7PmEhjkqyhQP52wQoapGFVIM38n3YYkf6tq2uR7NzcrcEgb7oJD158trGYohAZ0OnHrorSpSkdN3FJSR6CPQwk9Z2oh3lPWNaugchneTq7pfGQcY3k5NYMHoUu1zEK6_hPCCVbj56csd1ZaUrsBz"/>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                            In Review
                                        </span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-indigo-400" data-icon="description">description</span>
<div>
<p class="text-sm font-semibold text-slate-900">Q4_Performance_Metrics.xlsx</p>
<p class="text-xs text-slate-400">Modified 5h ago</p>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="flex -space-x-2 overflow-hidden">
<img alt="Team member" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" data-alt="Close up of a focused businessman with soft natural window lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAefKZSRVU4k1ntDVG_kqnUuzF9bqnhZ5ki5RsF96B2dF_pOV2JSW7m2Oz5Uf-9xHw_Uqze-2H_m4PAnxwKauOMrFSDXsA8y3VUwDIPHxp4TSOdYmqlo9xacUxtfbD6iFlG6CG1wnNTKuJMKDjcNsqXbQVO0f-HJMJubpETJ3fYZb2rDXxMj0D89fvbB5KrKQAVBLW3c6Pkxl_4Jy1TfHzijVTfAWwGfMRSu7SF3POhjs64f4nPy2N9KIISxbTtSndoKv57fWU58nq7"/>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                            Completed
                                        </span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr class="hover:bg-slate-50/50 transition-colors">
<td class="px-6 py-4">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-indigo-400" data-icon="folder_zip">folder_zip</span>
<div>
<p class="text-sm font-semibold text-slate-900">Project_Alpha_Assets.zip</p>
<p class="text-xs text-slate-400">Modified 1d ago</p>
</div>
</div>
</td>
<td class="px-6 py-4">
<div class="flex -space-x-2 overflow-hidden">
<img alt="Team member" class="inline-block h-6 w-6 rounded-full ring-2 ring-white" data-alt="Portrait of a young male creative professional in a bright studio environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5wkqYtH0SXTOb2kuCzbIvjgFqKf3xM3b-puBY93k_-W5Rmdp4HF1W9nM-V2z6hYTM9-rYuyJ_Mu2NcdulLVQ75K5HAtw-SFB0JoBGMclitUPiUW8zcmgl70Ie1VlKLuUtJGtwoEqaeQVHJ3b1SYxRZR4rvXQSfFDMyPQRHH2Q4OX3QnAd4uHSNGI2jBKebEH-LdUqTYLwrKNDb5eHMt2VnOvMlS4vnQYFPFN39w89qCzCkb2hl52TucexM2rBaqZI4Uu5YA-G-ydQ"/>
</div>
</td>
<td class="px-6 py-4">
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                            Completed
                                        </span>
</td>
<td class="px-6 py-4 text-right">
<button class="text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
<!-- 4. Recent Activity Feed -->
<section class="space-y-6">
<h2 class="text-2xl font-bold tracking-tight headline">Activity Feed</h2>
<div class="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-slate-200">
<div class="relative flex gap-4">
<div class="relative z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
<span class="material-symbols-outlined text-[12px] text-white" data-icon="cloud_upload">cloud_upload</span>
</div>
<div>
<p class="text-sm font-semibold text-slate-900">Main Server Backup</p>
<p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">Automated backup completed successfully. 450GB synced to US-East-1.</p>
<p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">12 Minutes Ago</p>
</div>
</div>
<div class="relative flex gap-4">
<div class="relative z-10 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center ring-4 ring-background">
<span class="material-symbols-outlined text-[12px] text-white" data-icon="warning">warning</span>
</div>
<div>
<p class="text-sm font-semibold text-slate-900">Threshold Alert</p>
<p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">API Latency exceeded 200ms in the Sydney region. Traffic re-routed.</p>
<p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">45 Minutes Ago</p>
</div>
</div>
<div class="relative flex gap-4">
<div class="relative z-10 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center ring-4 ring-background">
<span class="material-symbols-outlined text-[12px] text-white" data-icon="group_add">group_add</span>
</div>
<div>
<p class="text-sm font-semibold text-slate-900">New Team Member</p>
<p class="text-xs text-on-surface-variant leading-relaxed mt-0.5">Sarah Connor was added to the <span class="text-primary font-medium">#precision-ops</span> workspace.</p>
<p class="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-tighter">2 Hours Ago</p>
</div>
</div>
<div class="relative flex gap-4 opacity-60">
<div class="relative z-10 w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center ring-4 ring-background">
<span class="material-symbols-outlined text-[12px] text-white" data-icon="check_circle">check_circle</span>
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