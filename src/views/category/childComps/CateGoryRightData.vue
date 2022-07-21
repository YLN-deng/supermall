<template>
  <div ref="scroll" class="right-data" @scroll.passive="cateGoryScroll($event)">
    <!-- 右侧上部分信息 -->
    <cate-gory-right-data-item
      ref="cateGoryRight"
      v-for="(item, index) in maitKeyList"
      :key="index"
      :right-data-item="item"
    />
    <!-- 选项卡 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl"
      class="relative"
      :class="{ fixed: isTabFixed }"
    />
    <goods-list :class="{ marginT: isTabFixed }" :goods="shop" />

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import CateGoryRightDataItem from "./CateGoryRightDataItem.vue";

import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue"; //商品数据
import BackTop from "components/content/backTop/BackTop.vue";

export default {
  name: "CateGoryRightData",
  components: {
    CateGoryRightDataItem,
    TabControl,
    GoodsList,
    BackTop,
  },
  props: {
    maitKeyList: {
      type: Array,
      default() {
        return [];
      },
    },
    shop: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentType: "pop",
      isTabFixed: false,
      isShowBackTop: false,
      scrollTop: 0,
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          this.$emit("type", this.currentType);
          break;
        case 1:
          this.currentType = "new";
          this.$emit("type", this.currentType);
          break;
        case 2:
          this.currentType = "sell";
          this.$emit("type", this.currentType);
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    cateGoryScroll(event) {
      // 滚动条距离顶部的距离scrollTop
      this.scrollTop = event.target.scrollTop;

      //  计算cate-gory-right-data-item到tab-control的距离
      let index = 3;

      for (let i = 0; i < this.$refs.cateGoryRight.length; i++) {
        if (i % 2 !== 0) {
          index += this.$refs.cateGoryRight[i].$el.offsetHeight;
        }
      }
      if (this.$refs.cateGoryRight.length % 2 !== 0) {
        index += 110;
      }
      this.isTabFixed = this.scrollTop > index;
      this.isShowBackTop = this.scrollTop > 1000;
    },
  },
};
</script>

<style scoped>
.right-data {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  overflow-y: scroll;
}
.relative {
  width: 100%;
  position: relative;
}
.fixed {
  width: 70%;
  position: fixed;
  top: 44px;
  right: 0;
  z-index: 19;
}
.marginT {
  margin-top: 40px;
}
</style>