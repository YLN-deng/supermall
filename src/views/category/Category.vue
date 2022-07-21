<template>
  <div class="category">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">分类</div></nav-bar>

    <!-- 左侧菜单 -->
    <cate-gory-left-data
      :category-list="category"
      @categoryData="categoryData"
    />

    <!-- 右侧信息 -->
    <cate-gory-right-data
      @type="checkType"
      :maitKeyList="maitKeyList"
      :shop="this.goodsList"
    />
  </div>
</template>

<script>
import CateGoryLeftData from "./childComps/CateGoryLeftData.vue";
import CateGoryRightData from "./childComps/CateGoryRightData.vue";

import NavBar from "components/common/navbar/NavBar.vue";

import {
  getCateGoryData,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  components: {
    NavBar,
    CateGoryLeftData,
    CateGoryRightData,
  },
  data() {
    return {
      category: [],
      maitKeyList: [],
      miniWallkeys: 0,
      goodsList: [],
      goodsType: "pop",
    };
  },
  created() {
    // 初始化网络请求
    this.getCateGoryData();
    this.getSubcategory(3627);
    this.getCategoryDetail(10062603, "pop");
    this.getCategoryDetail(10062603, "new");
    this.getCategoryDetail(10062603, "sell");
  },
  methods: {
    // 事件监听
    // 点击左侧导航，显示对应数据
    categoryData(index, maitKey, miniWallkey) {
      this.miniWallkeys = miniWallkey;
      this.getSubcategory(maitKey);  
      this.getCategoryDetail(this.miniWallkeys, this.goodsType);
    },
    // 点击tab-control显示对应数据
    checkType(currentType) {
      this.goodsType = currentType;
      this.getCategoryDetail(
        this.miniWallkeys ? this.miniWallkeys : 10062603,
        this.goodsType
      );
    },

    // 网络请求
    // 请求左侧菜单数据
    getCateGoryData() {
      getCateGoryData().then((res) => {
        this.category.push(...res.data.category.list);
      });
    },
    // 请求右侧上部分数据
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then((res) => {
        this.maitKeyList = res.data.list;
      });
    },
    // 请求推荐数据
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.goodsList = res;
      });
    },
  },
};
</script>

<style scoped>
.category {
  position: relative;
}
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