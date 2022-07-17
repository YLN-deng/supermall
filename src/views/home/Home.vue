<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue"; //轮播图
import HomeRecommendView from "./childComps/HomeRecommendView.vue"; //推荐
import FeatureView from "./childComps/FeatureView.vue"; //特色

import TabControl from "components/content/tabControl/TabControl.vue"; //导航
import GoodsList from "components/content/goods/GoodsList.vue"; //商品数据
import NavBar from "components/common/navbar/NavBar.vue"; // 顶部导航显示
import Scroll from "components/common/scroll/Scroll.vue"; //丝滑滚动
import BackTop from "components/content/backTop/BackTop.vue"; //回到顶部

import { getHomeData, getHomeGoods } from "network/home"; // 引入网络请求方法

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [], //保存数据
      recommends: [], //保存数据
      goods: {
        //商品数据
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  created() {
    // 请求home页数据
    this.getHomeData();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {},
  computed: {
    // 切换选择类型
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /*
      事件监听相关方法
    */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 回到顶点
    backClick() {
      this.$refs.scroll.scrollTo();
    },

    //  显示/隐藏按钮
    contentScroll(scrollTop) {
      this.isShowBackTop = scrollTop > 1000;
    },

    // 上拉加载更多
    loadMore(scrollBottom) {
      if (scrollBottom < 40) {
        this.getHomeGoods(this.currentType);
      }
    },

    /*
      网络请求相关方法
    */
    getHomeData() {
      getHomeData().then((res) => {
        this.banners = res.data.banner.list; //获取轮播图数据
        this.recommends = res.data.recommend.list; //获取推荐数据
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  margin-top: 44px;
  margin-bottom: 50px;
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

.tab-control {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>