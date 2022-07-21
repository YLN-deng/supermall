<template>
  <div class="maitKey-list">
    <a :href="rightDataItem.link">
      <div class="maitKey-list-img">
        <img :src="rightDataItem.image" alt="" />
        <span>{{ rightDataItem.title }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "CateGoryRightDataItem",
  props: {
    rightDataItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.maitKey-list {
  flex: 1;
}
.maitKey-list-img {
  width: 65px;
  text-align: center;
  margin: 10px 20px;
}
.maitKey-list-img img {
  width: 65px;
}
.maitKey-list:nth-child(1) {
  margin-top: 50px;
}
.maitKey-list:nth-child(2) {
  margin-top: 50px;
}
</style>