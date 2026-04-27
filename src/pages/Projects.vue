<script setup>
import { useProjects } from '@/composables/useProjects';

const { isModalOpen, openModal, closeModal, Modal } = useProjects()
</script>

<template>
  <div class="bg-surface text-on-surface font-body antialiased">
    <div
      class="relative flex h-auto min-h-screen w-full bg-surface group/design-root overflow-x-hidden"
    >
      <!-- SideNavBar -->
      <div
        class="flex h-full min-h-screen flex-col justify-between bg-surface p-4 w-64 border-r border-transparent"
        style="box-shadow: 1px 0 0 rgba(19, 27, 46, 0.05)"
      >
        <div class="flex flex-col gap-8">
          <div class="flex gap-3 px-3">
            <div
              class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              data-alt="Abstract geometric 3D shape representing a modern tech brand logo in deep indigo and violet tones"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNWfUT5p5hLf8Cli1VXC7oDdz9c0GTZYLcGzB38NpiPP6QGiiVD_ZL86hRsdJNRJUsK-mx9pe7YDTpjSNU3N2ZPq89vMUxJTC9JWbDRFGyKVx9QHpSzsEQLjj683abXE-CD4QMycdeCOw56u6jvvwMxKc_dvL4c10_yMDGE819UhWGjqSCttBjzofGBVtzMLW6E1OTu_9esbpYkVs9rMJWXY80vE-IpGlUi2NuF0hkyOSoX18u7RKaBHePeavw5WtGaoffJ8QuBSPm');
              "
            ></div>
            <div class="flex flex-col justify-center">
              <h1
                class="text-on-surface text-base font-headline font-bold leading-none tracking-tight"
              >
                DEVXP4U
              </h1>
              <p class="text-on-surface-variant text-label-sm font-label mt-1">
                Pro Plan
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <a
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group"
              href="#"
            >
              <div
                class="text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="dashboard"
              >
                <span class="material-symbols-outlined">dashboard</span>
              </div>
              <p
                class="text-on-surface-variant group-hover:text-on-surface text-body-md font-medium"
              >
                Dashboard
              </p>
            </a>
            <a
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-highest text-primary font-medium"
              href="#"
            >
              <div class="text-primary" data-icon="folder" data-weight="fill">
                <span
                  class="material-symbols-outlined"
                  style="font-variation-settings: 'FILL' 1"
                  >folder</span
                >
              </div>
              <p class="text-on-surface text-body-md font-semibold">Projects</p>
            </a>
            <a
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group"
              href="#"
            >
              <div
                class="text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="group"
              >
                <span class="material-symbols-outlined">group</span>
              </div>
              <p
                class="text-on-surface-variant group-hover:text-on-surface text-body-md font-medium"
              >
                Team
              </p>
            </a>
            <a
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors group"
              href="#"
            >
              <div
                class="text-on-surface-variant group-hover:text-primary transition-colors"
                data-icon="settings"
              >
                <span class="material-symbols-outlined">settings</span>
              </div>
              <p
                class="text-on-surface-variant group-hover:text-on-surface text-body-md font-medium"
              >
                Settings
              </p>
            </a>
          </div>
        </div>
        <!-- User Profile Snippet at bottom -->
        <form @submit.prevent="openModal">
          <div class="mt-auto pt-6">
            <button
              class="primary-gradient-cta w-full flex items-center justify-center rounded-md h-10 px-4 text-on-primary text-body-md font-semibold shadow-sm hover:opacity-90 transition-opacity"
              type="submit"
            >
              <span class="material-symbols-outlined mr-2 text-[18px]"
                >add</span
              >
              New Project
            </button>
          </div>
        </form>
        <Modal v-if="isModalOpen" @close="closeModal" />
      </div>

      <!-- Main Content Area -->
      <div
        class="flex flex-1 flex-col h-full overflow-y-auto bg-surface-container-lowest"
      >
        <!-- TopAppBar -->
        <header
          class="flex items-center justify-between px-10 py-5 bg-surface-container-lowest sticky top-0 z-10 glass-panel"
        >
          <div class="flex items-center gap-4">
            <h2
              class="text-on-surface text-[1.5rem] font-headline font-bold leading-tight tracking-tight"
            >
              Projects
              <span
                class="text-outline text-body-md font-normal ml-2 relative -top-1"
                >(5)</span
              >
            </h2>
          </div>
          <div class="flex items-center gap-6">
            <div class="relative w-64">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline"
              >
                <span class="material-symbols-outlined">search</span>
              </div>
              <input
                class="block w-full pl-10 pr-3 py-2 bg-surface-container-low border-transparent rounded-md text-body-md text-on-surface placeholder-outline-variant focus:border-outline focus:ring-2 focus:ring-primary-fixed-dim transition-all"
                placeholder="Search projects..."
                type="text"
              />
            </div>
            <button
              class="relative text-on-surface-variant hover:text-primary transition-colors"
            >
              <span class="material-symbols-outlined">notifications</span>
              <span
                class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error ring-2 ring-surface-container-lowest"
              ></span>
            </button>
            <div
              class="h-8 w-8 rounded-full bg-surface-container-highest border border-outline-variant bg-center bg-cover cursor-pointer"
              data-alt="Portrait of a male professional with a slight smile wearing a dark shirt against a blurred background"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCs-vX1pQ4IoiN73pxh81XFvDZofFubaDch-XS4CMiv_t5EmDQNHgjGtrS5LTf1uzjzz45zTsiVeg5EJcVPWzXhOOoRFdracPyhgKqhZ_V8dxv4AkvVpwipESZfN5SGKNdOyrbr3kUx8I8B5TbAtyizJthNGkoo9WCzN2QphNMRApwCZ4hs3FXqYmL6BELc1bat6X5Oxc1ac4d122eqx_X2AwwUltBOkJ2VABopUFNaQfxYfIvCPbxRMLBPnpYj3Bqa5OTfs0nutZke');
              "
            ></div>
          </div>
        </header>
        <main class="px-10 py-6 max-w-[1200px] w-full">
          <!-- Filters -->
          <div class="flex gap-3 mb-8">
            <button
              class="px-4 py-1.5 rounded-sm bg-surface-container-highest text-on-surface text-body-md font-medium transition-colors"
            >
              All
            </button>
            <button
              class="px-4 py-1.5 rounded-sm hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface text-body-md font-medium transition-colors"
            >
              Active
            </button>
            <button
              class="px-4 py-1.5 rounded-sm hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface text-body-md font-medium transition-colors"
            >
              In Progress
            </button>
            <button
              class="px-4 py-1.5 rounded-sm hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface text-body-md font-medium transition-colors"
            >
              Archived
            </button>
          </div>
          <!-- Project List -->
          <div class="flex flex-col gap-6" >
            <!-- Project Item 1 -->
            <div v-for="item in [1, 2, 3]"
              class="bg-surface-container-lowest rounded-md p-6 hover:bg-surface-container-low transition-colors group"
              style="box-shadow: 0 4px 20px rgba(19, 27, 46, 0.03)"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3
                      class="text-on-surface font-headline font-semibold text-[1.125rem]"
                    >
                      Core Banking API v2
                    </h3>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm font-medium bg-primary-fixed text-on-primary-fixed"
                      >Active</span
                    >
                  </div>
                  <p
                    class="text-on-surface-variant text-body-md max-w-2xl mb-4"
                  >
                    Refactoring the main transaction processing engine to
                    support microservices architecture and improved throughput.
                  </p>
                  <div class="flex items-center gap-6">
                    <div
                      class="flex items-center gap-1.5 text-on-surface-variant text-label-sm"
                    >
                      <span class="material-symbols-outlined text-[16px]"
                        >schedule</span
                      >
                      Modified 2 hours ago
                    </div>
                    <div class="flex -space-x-2 overflow-hidden">
                      <img
                        alt=""
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest"
                        data-alt="Headshot of a smiling female professional"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRyMGbMZPyznirnH0ncsRMolkPbybctuaxqAeR3iu59EyfVAWC-4ALmI0cQhLQ97RZOQkON9JePxbMJ6FurbCIqmuw-G_9o-lFLOVYfq2UTAS4P6af7QXbtS8g5vJmuSEMYAYztO5F7ASP8-6-I4g_J6L2jvW4AD9Pmd0VXNwTLNRZYPUoks3E62pWO144ZQmWQP1-bLxr4Mu-NOhWYwIaZC7uztEZYEc509KXi9rCiJArYmN9PbJc0QZGiXCaJmLl0wCjB9-zhyOj"
                      />
                      <img
                        alt=""
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest"
                        data-alt="Headshot of a young male professional with glasses"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2WT7ysa0XJEIXoRk1BvYCx1ZqvRwf23KviHVMFLVouh8v2b5ggqf2KLydNe3U678-2W4P07wAO_XKDrNh59TAHz8P5itCDX_IHr90iNGzbEhVZ3diiEZvh4K4N58bjdSp9c9vyUhiDQL7BhtU8NUmc1zpK_vSj5kJy9YT8YFu_0IUSej8OS0sIJJcKUqHtTVbFn8qoiVZjKNuS5oi1vB9KTv8eiikzmhOVFQB5PylVUqAO_9IByjzfYESx6lh_lNxysp7C2BeEYlc"
                      />
                      <img
                        alt=""
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest"
                        data-alt="Headshot of a female professional with short dark hair"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWoO3gQnIplCSp2eDnE84u_abkzGyVqq4x1cdme3ZkICXleFqmmWcxNvpWWLQ3HqbW1YaX9rjzORYejD9VC7mBl9Osd5L9mspHbXLHwpj5Zz4b8Xz1Mn9fk_50FtFC31Ls6goQOGSYzG0igN_M62t23k7FXYhEuncVgij_Wu7F1P5hmKRGVjy-R_F4v5EzQPQXUX7lUls6wLv2_ZixCkxY6bW_AfaAWMew8t7xoJVYs5pYCW14mO0SbpGLfXPbkkF7aARtI3DFsQRn"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-outline hover:text-primary transition-colors rounded-sm hover:bg-surface-container-high opacity-0 group-hover:opacity-100"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    class="p-2 text-outline hover:text-on-surface transition-colors rounded-sm hover:bg-surface-container-high"
                  >
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- Project Item 2 -->
            <!-- <div
              class="bg-surface-container-lowest rounded-md p-6 hover:bg-surface-container-low transition-colors group"
              style="box-shadow: 0 4px 20px rgba(19, 27, 46, 0.03)"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3
                      class="text-on-surface font-headline font-semibold text-[1.125rem]"
                    >
                      Customer Portal Redesign
                    </h3>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm font-medium bg-secondary-container text-on-secondary-container"
                      >In Progress</span
                    >
                  </div>
                  <p
                    class="text-on-surface-variant text-body-md max-w-2xl mb-4"
                  >
                    Implementing the new Indigo Core design system across all
                    customer-facing dashboard views.
                  </p>
                  <div class="flex items-center gap-6">
                    <div
                      class="flex items-center gap-1.5 text-on-surface-variant text-label-sm"
                    >
                      <span class="material-symbols-outlined text-[16px]"
                        >schedule</span
                      >
                      Modified yesterday
                    </div>
                    <div class="flex -space-x-2 overflow-hidden">
                      <img
                        alt=""
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest"
                        data-alt="Headshot of a male professional with a beard"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuALWXkqxF32dPJMbsn_alQq5_-KZ46OdveBbz9Pv9Lyue93ZJOrfW2M71nQSjIuXTHXCGd0hWw3rdRvut3oJYzMtMZD0usdZ4X1ocT1hFD2mIEnIyTo-SjM43jNVqQWwQ_r2j_kb5RQuijcc5YKte7_YDtGTPynjiuJ7MZpzQmz87OV3mFMsQI6PUOzFdIlCWRh_6PY0GHp1wk0Snsf1Pt40fSv4CN2Mcbk-bv6IEIjCnn-88YBFYVh0lT3LvvQQCWF3KxJHvL2yVHr"
                      />
                      <div
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-high ring-2 ring-surface-container-lowest text-label-sm font-medium text-on-surface"
                      >
                        +2
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-outline hover:text-primary transition-colors rounded-sm hover:bg-surface-container-high opacity-0 group-hover:opacity-100"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    class="p-2 text-outline hover:text-on-surface transition-colors rounded-sm hover:bg-surface-container-high"
                  >
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div> -->
            <!-- Project Item 3 -->
            <!-- <div
              class="bg-surface-container-lowest rounded-md p-6 hover:bg-surface-container-low transition-colors group"
              style="box-shadow: 0 4px 20px rgba(19, 27, 46, 0.03)"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3
                      class="text-on-surface font-headline font-semibold text-[1.125rem]"
                    >
                      Payment Gateway Integration
                    </h3>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm font-medium bg-tertiary-fixed text-on-tertiary-fixed-variant"
                      >Deploying</span
                    >
                  </div>
                  <p
                    class="text-on-surface-variant text-body-md max-w-2xl mb-4"
                  >
                    Adding support for Stripe and PayPal via unified payment
                    orchestration layer.
                  </p>
                  <div class="flex items-center gap-6">
                    <div
                      class="flex items-center gap-1.5 text-on-surface-variant text-label-sm"
                    >
                      <span class="material-symbols-outlined text-[16px]"
                        >schedule</span
                      >
                      Modified 3 days ago
                    </div>
                    <div class="flex -space-x-2 overflow-hidden">
                      <img
                        alt=""
                        class="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest"
                        data-alt="Headshot of a female professional smiling gently"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWuP9ISfGiNyolnwc6PnxvCQVfUGO_mFyFgyAeZKT2ndPfcgzRq7BkohPn6DN48wEjo2kSt9uaUi_s8NfTOaZzZ6QP6IKeX0ZOxZ_auyYU1i7WrvOBnfxDrpfT7VdeOijmJhg1IhkxFkfO9a0y-O3mTorkFxaXhu8psNM6Lr3ZyYuLGiKpQxsZTVG1LbNHHqg21JXiJaXsWtieF-m93Px7yCIZWmFFMIpq2AJz0DfPua4wmSDBWQBJgr63NUo1Ee9ZSxT564IUR0R8"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-outline hover:text-primary transition-colors rounded-sm hover:bg-surface-container-high opacity-0 group-hover:opacity-100"
                  >
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    class="p-2 text-outline hover:text-on-surface transition-colors rounded-sm hover:bg-surface-container-high"
                  >
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div> -->
            <!-- Project Item 4 -->
            <!-- <div
              class="bg-surface-container-lowest rounded-md p-6 hover:bg-surface-container-low transition-colors group opacity-75"
              style="box-shadow: 0 4px 20px rgba(19, 27, 46, 0.03)"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3
                      class="text-on-surface font-headline font-semibold text-[1.125rem]"
                    >
                      Legacy Auth Migration
                    </h3>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-sm text-label-sm font-medium bg-surface-container-high text-on-surface-variant"
                      >Archived</span
                    >
                  </div>
                  <p
                    class="text-on-surface-variant text-body-md max-w-2xl mb-4"
                  >
                    Migration of old user accounts to the new OAuth2.0 identity
                    provider.
                  </p>
                  <div class="flex items-center gap-6">
                    <div
                      class="flex items-center gap-1.5 text-on-surface-variant text-label-sm"
                    >
                      <span class="material-symbols-outlined text-[16px]"
                        >schedule</span
                      >
                      Modified last month
                    </div>
                    <div class="flex -space-x-2 overflow-hidden">
                      <div
                        class="flex h-6 w-6 items-center justify-center rounded-full bg-surface-container-high ring-2 ring-surface-container-lowest text-label-sm font-medium text-on-surface"
                      >
                        +4
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-outline hover:text-on-surface transition-colors rounded-sm hover:bg-surface-container-high"
                  >
                    <span class="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div> -->
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
.glass-panel {
  background: rgba(250, 248, 255, 0.8);
  backdrop-filter: blur(12px);
}

.primary-gradient-cta {
  background: linear-gradient(135deg, #3525cd 0%, #4f46e5 100%);
}

.ambient-shadow {
  box-shadow: 0px 20px 40px rgba(19, 27, 46, 0.06);
}
</style>
