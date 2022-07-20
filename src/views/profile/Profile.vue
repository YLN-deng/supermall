<template>
    <div id="profile">
        <nav-bar class="home-nav"><div slot="center">我的</div></nav-bar>
    </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
    name: 'Profile',
    components: { NavBar },
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>