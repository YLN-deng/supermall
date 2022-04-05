<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">我的</div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


export default {
    name:"Profile",
    components: { 
      NavBar 
    },
}
</script>

<style scoped>
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
}
</style>