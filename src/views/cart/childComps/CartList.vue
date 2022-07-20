<template>
  <div class="cart-list">
    <!-- 滚动 -->
    <scroll class="content" ref="scroll">
      <!-- 购物车为空时展示图片 -->
      <div v-if="cartList.length == 0" class="cart-img">
        <img class="cart-img" src="~assets/img/cart/shop.webp" alt="" />
        <span class="cart-img">你的购物车居然是空的,赶快去商城购物吧</span>
      </div>
      <!-- 商品购物车列表 -->
      <cart-list-item
        v-else
        class="shop"
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";

import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
  },
};
</script>

<style scoped>
.shop:first-child {
  margin-top: 45px;
}
.shop:last-child {
  margin-bottom: 90px;
}
.cart-img {
  width: 300px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
</style>