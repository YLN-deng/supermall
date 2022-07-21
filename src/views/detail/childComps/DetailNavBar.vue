<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="titles">
        <div
          class="titles-item"
          :class="{ active: index === currentIndex }"
          v-for="(item, index) in titles"
          :key="index"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      // 点击切换
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      // 返回
      // this.$router.back();
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.detail-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background-color: #fff;
}
.back img {
  margin-top: 11px;
}
.titles {
  display: flex;
}
.titles-item {
  flex: 1;
}
.active {
  /* 动态绑定 */
  color: var(--color-high-text);
}
</style>