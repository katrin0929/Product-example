<script>

import Img from './Img.vue';

export default {
components: {Img}
}
</script>

<template>
    <header class="header">
        <div class="header-container">
            <div class="logo-and-title">
                <Img
                    src="image/loginPage.png"
                    height="32px"
                />
                <div>DEVFED</div>
            </div>
            <div class="header-nav">
                <a href="!#">Documentation</a>
                <a href="!#">Support</a>
            </div>
        </div>
    </header>

</template>

<style scoped>

.header-container {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: 22px 160px;

}
.logo-and-title {
    display: flex;
    align-items: center;
    max-height: 32px;
    gap: 10px;
}

.logo-and-title div {
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    color: #0F172A;

}
.header-nav {
    display: flex;
    gap: 16px;
    align-items: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #0F172A;
}
</style>