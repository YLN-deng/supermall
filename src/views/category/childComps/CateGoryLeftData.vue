<template>
  <div class="left-data">
    <ul class="title-data">
      <li
        @click="titleClick(index)"
        v-for="(item, index) in categoryList"
        :key="index"
        class="title"
        :class="{ active: index === titleIndex }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CateGoryLeftData",
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      titleIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.titleIndex = index;
      let miniWallkey = this.categoryList[index].miniWallkey
      let maitKey = this.categoryList[index].maitKey
      this.$emit('categoryData',index,maitKey,miniWallkey)
    },
  },
};
</script>

<style scoped>
.title-data {
    width: 30%;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #eee;
}
/* 隐藏滚动条 Chrome  */
/* .title-data::-webkit-scrollbar {display:none} */
.title {
  line-height: 52px;
  text-align: center;
  background-color: #eee;
}
.title:first-child {
  margin-top: 44px;
}
.title:last-child {
  margin-bottom: 49px;
}
.active {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  border-left: 3px solid pink;
}
</style>