<script setup></script>

<template>
<div class="bg-surface text-on-surface font-body antialiased">
<!-- Shared Component Base (Immutable Structure & Styling for Header Area) -->
<div class="relative flex h-auto w-full flex-col bg-[#f9f8fb] group/design-root overflow-x-hidden" style='font-family: Manrope, "Noto Sans", sans-serif;'>
<div class="layout-container flex h-full grow flex-col">
<div class="px-40 flex flex-1 justify-center py-5">
<div class="layout-content-container flex flex-col max-w-[960px] flex-1">
<div class="flex flex-wrap gap-2 p-4">
<a class="text-[#545095] text-base font-medium leading-normal hover:opacity-80" href="#">Projects</a>
<span class="text-[#545095] text-base font-medium leading-normal">/</span>
<a class="text-[#545095] text-base font-medium leading-normal hover:opacity-80" href="#">Aura Analytics</a>
<span class="text-[#545095] text-base font-medium leading-normal">/</span>
<span class="text-[#0f0e1b] text-base font-medium leading-normal">Settings</span>
</div>
<h2 class="text-[#0f0e1b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Aura Analytics</h2>
<div class="flex px-4 py-3 justify-end">
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e8e8f3] text-[#0f0e1b] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#d2d1e6] transition-colors">
<span class="truncate">View Live</span>
</button>
</div>
<div class="pb-3">
<div class="flex border-b border-[#d2d1e6] px-4 gap-8">
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-[#4e46e5] text-[#0f0e1b] pb-[13px] pt-4" href="#">
<p class="text-[#0f0e1b] text-sm font-bold leading-normal tracking-[0.015em]">General</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#545095] pb-[13px] pt-4 hover:border-b-[#d2d1e6] transition-colors" href="#">
<p class="text-[#545095] text-sm font-bold leading-normal tracking-[0.015em]">Team</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#545095] pb-[13px] pt-4 hover:border-b-[#d2d1e6] transition-colors" href="#">
<p class="text-[#545095] text-sm font-bold leading-normal tracking-[0.015em]">Environments</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#545095] pb-[13px] pt-4 hover:border-b-[#d2d1e6] transition-colors" href="#">
<p class="text-[#545095] text-sm font-bold leading-normal tracking-[0.015em]">Notifications</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#545095] pb-[13px] pt-4 hover:border-b-[#d2d1e6] transition-colors" href="#">
<p class="text-[#545095] text-sm font-bold leading-normal tracking-[0.015em]">Advanced</p>
</a>
</div>
</div>
<div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
<label class="flex flex-col min-w-40 flex-1">
<p class="text-[#0f0e1b] text-base font-medium leading-normal pb-2">Project Name</p>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0f0e1b] focus:outline-0 focus:ring-0 border border-[#d2d1e6] bg-[#f9f8fb] focus:border-[#d2d1e6] h-14 placeholder:text-[#545095] p-[15px] text-base font-normal leading-normal" value="Aura Analytics"/>
</label>
</div>
<!-- Extended Settings UI (Design System Applied) -->
<!-- General Tab Additions -->
<div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 font-body">
<label class="flex flex-col min-w-40 flex-1">
<p class="font-label text-sm font-medium text-on-surface-variant pb-2">Description</p>
<textarea class="bg-surface-container-low text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim rounded-md p-4 min-h-[100px] resize-none border-none shadow-none" placeholder="Briefly describe the purpose of this project..."></textarea>
</label>
</div>
<div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 font-body">
<div class="flex flex-col min-w-40 flex-1 gap-2">
<p class="font-label text-sm font-medium text-on-surface-variant">Project Icon</p>
<div class="flex items-center gap-4 p-4 rounded-md bg-surface-container-low border-none">
<div class="w-14 h-14 rounded-md bg-surface-container-highest flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-2xl" data-icon="image">image</span>
</div>
<button class="bg-surface-container-high text-on-surface px-4 py-2.5 rounded-md font-label text-sm font-bold hover:bg-surface-container-highest transition-colors">Upload Image</button>
</div>
</div>
</div>
<div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 font-body mb-4">
<label class="flex flex-col min-w-40 flex-1 relative">
<p class="font-label text-sm font-medium text-on-surface-variant pb-2">Status</p>
<select class="bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim rounded-md p-4 h-14 appearance-none cursor-pointer border-none font-medium">
<option>Active</option>
<option>Paused</option>
<option>Archived</option>
</select>
<span class="material-symbols-outlined absolute right-4 top-11 pointer-events-none text-on-surface-variant" data-icon="keyboard_arrow_down">keyboard_arrow_down</span>
</label>
</div>
<div class="px-4 py-6 font-body">
<button class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-md font-label font-bold shadow-[0_10px_20px_rgba(19,27,46,0.06)] hover:opacity-90 transition-opacity">Save Changes</button>
</div>
<div class="h-12 w-full"></div>
<!-- Team Section -->
<div class="px-4 pb-8 font-body w-full">
<h3 class="font-headline text-xl font-bold text-on-surface mb-6 tracking-tight">Team Management</h3>
<div class="bg-surface-container-low rounded-xl p-2 flex flex-col gap-1">
<!-- User Row 1 -->
<div class="flex items-center justify-between p-3 rounded-md hover:bg-surface transition-colors group">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-full object-cover shadow-[0_4px_10px_rgba(19,27,46,0.05)]" data-alt="portrait of a young woman smiling outdoors with soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI4SyafDpV1-MaaPVwJ_PPfkC1xlxD3RRDyrl74Ma_1nipSUhSsNP77r-xP2N4R4JQvpjDk-0fj9U-Y3or3hET-pxn7A6tdUDmcpCyn8NVN4JwSnPaIv_ZR1e0ucPr7XZQ-Xem7kpvSucc3QVxvKJzXEsBjtHSnsoAF5ACPETuS3EfKEWJ-7Wj6RBzL06lNE5stFyRsm2fZWaxCLaaYVwQchL1qo_3peElribBC74oufEyaDqI61sjxAwFMkWtn1CRXsDBR8SIu75v"/>
<div>
<p class="font-label font-bold text-on-surface text-sm">Sarah Jenkins</p>
<p class="font-label text-xs text-on-surface-variant">sarah@aura.io</p>
</div>
</div>
<div class="flex items-center gap-4">
<span class="bg-primary-container text-on-primary-container px-2.5 py-1 rounded-[4px] font-label text-[11px] uppercase tracking-wide font-bold">Owner</span>
<button class="text-outline-variant hover:text-on-surface transition-colors p-1"><span class="material-symbols-outlined text-xl" data-icon="more_vert">more_vert</span></button>
</div>
</div>
<!-- User Row 2 -->
<div class="flex items-center justify-between p-3 rounded-md hover:bg-surface transition-colors group">
<div class="flex items-center gap-4">
<img alt="Avatar" class="w-10 h-10 rounded-full object-cover shadow-[0_4px_10px_rgba(19,27,46,0.05)]" data-alt="portrait of a young man with short hair looking directly at camera with neutral expression" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMf5vrKkCnIb9m59kMLKdfRpoEacnfgPDyvMnDjQXcoPOOAQyJm436r-5eKW3C8NlM19T9vttVzxVkDzx2ys_dI-v364PHhI4T35sxL_jXFbZJKSGlkymFfivcpqBOVvkII_v6Zb1aMjmUbmSHn8lTVv9D_AOEu8G4ITuXcTsaHPDs63Kg14QFJ-8Vy8Gik-G7lSwbNqphPRmeBoE5mVTZY_2cTZ7yBWF0LVD0_khpWYXGl8C5fp156LtpWLK_4tJzr14zXqiC3_0Z"/>
<div>
<p class="font-label font-bold text-on-surface text-sm">Marcus Chen</p>
<p class="font-label text-xs text-on-surface-variant">marcus@aura.io</p>
</div>
</div>
<div class="flex items-center gap-4">
<span class="bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-[4px] font-label text-[11px] uppercase tracking-wide font-bold">Developer</span>
<button class="text-outline-variant hover:text-on-surface transition-colors p-1"><span class="material-symbols-outlined text-xl" data-icon="more_vert">more_vert</span></button>
</div>
</div>
<!-- User Row 3 -->
<div class="flex items-center justify-between p-3 rounded-md hover:bg-surface transition-colors group">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center font-bold text-on-primary-fixed shadow-[0_4px_10px_rgba(19,27,46,0.05)]">EJ</div>
<div>
<p class="font-label font-bold text-on-surface text-sm">Elena James</p>
<p class="font-label text-xs text-on-surface-variant">elena@aura.io</p>
</div>
</div>
<div class="flex items-center gap-4">
<span class="bg-surface-container-highest text-on-surface px-2.5 py-1 rounded-[4px] font-label text-[11px] uppercase tracking-wide font-bold">Viewer</span>
<button class="text-outline-variant hover:text-on-surface transition-colors p-1"><span class="material-symbols-outlined text-xl" data-icon="more_vert">more_vert</span></button>
</div>
</div>
</div>
<div class="mt-6">
<button class="bg-surface-container-high text-on-surface px-5 py-2.5 rounded-md font-label text-sm font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-2 w-max">
<span class="material-symbols-outlined text-lg" data-icon="add">add</span>
                            Add Member
                        </button>
</div>
</div>
<div class="h-8 w-full"></div>
<!-- Environment Variables Section -->
<div class="px-4 pb-12 font-body w-full">
<div class="flex items-center justify-between mb-6">
<h3 class="font-headline text-xl font-bold text-on-surface tracking-tight">Environment Variables</h3>
<button class="bg-surface-container-high text-on-surface px-4 py-2 rounded-md font-label text-sm font-bold hover:bg-surface-container-highest transition-colors flex items-center gap-2">
<span class="material-symbols-outlined text-lg" data-icon="add">add</span>
                            New Variable
                        </button>
</div>
<div class="flex flex-col gap-4">
<!-- Env Var 1 -->
<div class="flex items-center justify-between p-4 bg-surface-container-low rounded-md group hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-8 w-full max-w-[600px]">
<div class="flex-1">
<p class="font-label text-[11px] uppercase tracking-wide text-on-surface-variant mb-1 font-bold">Key</p>
<p class="font-body text-sm font-medium text-on-surface font-mono tracking-tight">NEXT_PUBLIC_API_URL</p>
</div>
<div class="flex-1">
<p class="font-label text-[11px] uppercase tracking-wide text-on-surface-variant mb-1 font-bold">Value</p>
<p class="font-body text-sm text-on-surface font-mono opacity-50 tracking-widest">••••••••••••••••</p>
</div>
</div>
<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span class="material-symbols-outlined text-[20px]" data-icon="content_copy">content_copy</span></button>
<button class="p-2 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span class="material-symbols-outlined text-[20px]" data-icon="edit">edit</span></button>
</div>
</div>
<!-- Env Var 2 -->
<div class="flex items-center justify-between p-4 bg-surface-container-low rounded-md group hover:bg-surface-container-high transition-colors">
<div class="flex items-center gap-8 w-full max-w-[600px]">
<div class="flex-1">
<p class="font-label text-[11px] uppercase tracking-wide text-on-surface-variant mb-1 font-bold">Key</p>
<p class="font-body text-sm font-medium text-on-surface font-mono tracking-tight">STRIPE_SECRET_KEY</p>
</div>
<div class="flex-1">
<p class="font-label text-[11px] uppercase tracking-wide text-on-surface-variant mb-1 font-bold">Value</p>
<p class="font-body text-sm text-on-surface font-mono opacity-50 tracking-widest">••••••••••••••••••••••••</p>
</div>
</div>
<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span class="material-symbols-outlined text-[20px]" data-icon="content_copy">content_copy</span></button>
<button class="p-2 rounded-md hover:bg-surface-container-highest text-on-surface-variant transition-colors"><span class="material-symbols-outlined text-[20px]" data-icon="edit">edit</span></button>
</div>
</div>
</div>
</div>
<div class="h-8 w-full"></div>
<!-- Danger Zone -->
<div class="px-4 pb-20 font-body w-full">
<div class="rounded-xl outline outline-1 outline-error/20 bg-surface p-6">
<h3 class="font-headline text-lg font-bold text-error mb-2 tracking-tight">Danger Zone</h3>
<p class="font-body text-sm text-on-surface-variant mb-6 max-w-2xl leading-relaxed">
                            Permanently remove your project and all of its contents from the Aura Analytics platform. This action is not reversible, so please continue with caution.
                        </p>
<div class="flex items-center justify-between bg-error-container p-4 rounded-md">
<div>
<p class="font-label font-bold text-on-error-container text-sm">Delete Project</p>
<p class="font-label text-xs text-on-error-container/70 mt-0.5">All data will be permanently wiped.</p>
</div>
<button class="bg-error text-on-error px-5 py-2.5 rounded-md font-label text-sm font-bold hover:bg-error/90 transition-colors shadow-sm">Delete Project</button>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</template>