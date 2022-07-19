<template>
  <div id="app">
    <!-- keep-alive 保存页面不被销毁 / exclude="Detail"排除detail页面在外 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "assets/css/base.css";
</style>
