<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import CartList from "./childComps/CartList.vue";
import CartBottomBar from './childComps/CartBottomBar.vue';

import NavBar from "components/common/navbar/NavBar.vue";

// 直接调用vuex
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
},
  computed: {
    // ...mapGetters(['cartLength'])  //数组
    // 对象
    ...mapGetters({
      length: "cartLength",
    }),
  },
};
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