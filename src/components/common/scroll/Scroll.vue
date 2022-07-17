<template>
  <div class="wrapper">
    <div @scroll.passive="getScroll($event)" class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroll",
  data() {
    return {};
  },
  methods: {
    scrollTo() {
      // 回到顶部
      this.$refs.content.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    getScroll(event) {
      // 滚动条距离顶部的距离scrollTop
      let scrollTop = event.target.scrollTop;

      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        event.target.scrollHeight - scrollTop - event.target.clientHeight;

      this.$emit("scroll", scrollTop);

      this.$emit("pullingUp", scrollBottom);
    },
  },
};
</script>

<style scoped>
.content {
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>