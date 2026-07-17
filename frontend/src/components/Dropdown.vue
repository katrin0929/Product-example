<script setup>
</script>

<template>
    <el-dropdown placement="bottom"
        trigger="click"
        :teleported="true"
    >
        <slot name="trigger-el"></slot>
        <el-menu anchor="bottom-end" popover="manual" class="w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:divide-white/10 dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10" id="menu-0" role="menu" open="" aria-labelledby="menu-button-1" tabindex="0">
            <slot name="content-dropdown"></slot>
        </el-menu>
 
    </el-dropdown>
      

</template>

<style>

el-menu {
  --anchor-offset: -500px;
  --anchor-gap: 70px ;
  overflow: hidden;
}
</style>