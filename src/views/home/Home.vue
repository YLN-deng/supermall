<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1" 
                  class="tab-control" 
                  v-show="isTabFixed">
    </tab-control>
    
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentSrcoll" 
            :pull-up-load="true" 
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl2">
    </tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import { getHomeMultidata, getHomeGoods } from 'network/home'


export default {
    name:"Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
              'pop': {page: 0, list: []},
              'new': {page: 0, list: []},
              'sell': {page: 0, list: []},
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0,
            itemImgListener: null
        }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY,0)
    },
    deactivated() {
      // 保存y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
        // 1.请求多个数据
        this.getHomeMultidata()

        // 2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        const refresh = this.debounce(this.$refs.scroll.refresh, 100)
      // 监听item中图片加载完成刷新
        this.$bus.$on('itemImageLoad', () => {
          // this.scroll && this.$refs.scroll.refresh()
          refresh()
        })

        // 获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2

        // 对监听的事件进行保存
        this.itemImgListener = () => {
          refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
    methods: {
      //  防抖函数
      debounce(func, delay) {
        let timer = null;
        return function (...args) {
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          },delay)
        }
      },

      // 事件监听
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
             this.currentType = 'new'
            break
          case 2:
             this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },

      contentSrcoll(position){
        // 1.判断topback是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },

      loadMore() {
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },

      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      // 网络请求方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
            // console.log(res);
            // this.result = res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type,){
         const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // console.log(res);

          this.$refs.scroll.finishPullUp()
        })
      }
    }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    
    position: relative;
  }

  .home-nav {
      background-color: var(--color-tint);
      color: aliceblue;
/* 
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9; */
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 43px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

.tab-control {
  position: relative;
  top: -2px;
  z-index: 9;
}
</style>