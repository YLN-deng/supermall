<template>
  <div id="home">
    <notice />

    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        class="homeswiper"
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      />
      <home-recommend-view :recommends="recommends" />
      <feature-view :class="{featureview: isTabFixed}" />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
        class="relative"
        :class="{ fixed: isTabFixed }"
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
import Notice from '../../components/content/notice/Notice.vue'; //公告

import {backTopMinix} from 'common/mixin';

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
    Notice
  },
  mixins: [backTopMinix], //混入
  data() {
    return {
      banners: [], //保存数据
      recommends: [], //保存数据
      goods: {
        //商品数据
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      tabOffsetHeight: 0,
      isTabFixed: false,
      saveY: 0,
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

  // 进入时状态
  activated() {
    // 定位离开时位置
    this.$refs.scroll.scrollTo(0, this.saveY);
  },

  // 离开时状态
  deactivated() {
    // 保存离开时位置
    this.saveY = this.scrollTop;
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

    contentScroll(scrollTop) {
      // 显示/隐藏BackTop按钮
      this.backTopIsShow(scrollTop)

      // 决定tabControl是否吸顶(position: fixed)
      this.isTabFixed =
        this.scrollTop > this.tabOffsetTop - this.tabOffsetHeight;
    },

    // 上拉加载更多
    loadMore(scrollBottom) {
      let timer = null;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (scrollBottom < 40) this.getHomeGoods(this.currentType);
      });
    },

    // 监听图片加载高度
    swiperImageLoad() {
      // 所以组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      this.tabOffsetHeight = this.$refs.tabControl.$el.offsetHeight;
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

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.homeswiper {
  margin-top: 44px;
}

.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 9;
}

.featureview {
  margin-top: 40px;
}
</style>
