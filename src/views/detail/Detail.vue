<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <!-- 滚动 -->
    <scroll class="content" ref="scroll" @scroll="detailScroll">
      <!-- 轮播图 -->
      <detail-swiper class="top" :top-images="topImages" />
      <!-- 商品基本信息展示 -->
      <detail-base-info :goods="goods" />
      <!-- 店铺详细信息展示 -->
      <detail-shop-info :shop="shop" />
      <!-- 商品详细信息展示 -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImgLoad" />
      <!-- 商品参数信息展示 -->
      <detail-param-info ref="param" :param-info="paramInfo" />
      <!-- 商品评论信息展示 -->
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <!-- 推荐商品信息展示 -->
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <!-- 底部菜单 -->
    <detail-bottom-bar @addCart="addToCart" />
    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { backTopMinix } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
  },
  mixins: [backTopMinix],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  created() {
    // 保存传入的商品iid
    this.iid = this.$route.params.iid;

    // 传入商品iid到后台，获取相关参数
    getDetail(this.iid).then((res) => {
      //   console.log(res);
      const data = res.result;
      //   获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      //   获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详细数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    titleClick(index) {
      // 点击跳转到themeTopYs对应位置
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index]);
    },
    detailImgLoad() {
      // 添加元素距离顶部位置到themeTopYs
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 50);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 50);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    detailScroll(scrollTop) {
      // 显示/隐藏BackTop按钮
      this.backTopIsShow(scrollTop);
      // 根据themeTopYs的位置，显示相对应的导航文字
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {

        if(this.currentIndex !== i && (scrollTop >= this.themeTopYs[i] && scrollTop < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     this.scrollTop >= this.themeTopYs[i] &&
        //     this.scrollTop < this.themeTopYs[parseInt(i) + 1]) ||
        //     (i === length - 1 && this.scrollTop >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
      }
    },
    // 将商品加入购物车
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车
      // 01.actions返回一个promise 02.mapActions
      // this.$store.commit('addCart',product)
      // actions用dispatch()
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then((res) => {
        // console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // },1500);
        this.$toast.show(res,2000)
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 12;
}
.top {
  margin-top: 44px;
}

</style>