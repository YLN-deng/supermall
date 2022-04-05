<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" 
                :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" ref="params"> </detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="redcommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
    </div>
</template>

<script>
import DetailNavBar from './childCompms/DetailNavBar.vue';
import DetailSwiper from './childCompms/DetailSwiper.vue';
import DetailBaseInfo from './childCompms/DetailBaseInfo.vue';
import DetailShopInfo from './childCompms/DetailShopInfo.vue';
import DetailGoodsInfo from './childCompms/DetailGoodsInfo.vue';
import DetailParamInfo from './childCompms/DetailParamInfo.vue';
import DetailCommentInfo from './childCompms/DetailCommentInfo.vue';
import DetailBottomBar from './childCompms/DetailBottomBar.vue';

import Scroll from 'components/common/scroll/Scroll.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import BackTop from 'components/content/backTop/BackTop.vue'
// import Toast from 'components/common/toast/Toast.vue';

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail';
import {debounce} from 'common/utils.js'
import { mapActions } from 'vuex';

export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        // Toast,
    },  
        
    data() {
        return {
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            redcommends: [],
            itenImgListener: null,
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
            // message: '',
            // show: false
        }
    },
    created() {
        // 1.保存传入的iid
        this.iid = this.$route.params.iid

        // 2.根据iid请求的详情数据
        getDetail(this.iid).then(res => {
            // 1.获取顶部的轮播图数据
            const data = res.result;
            this.topImages = data.itemInfo.topImages

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3.创建店铺信息
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo;

            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            // 6.获取评论信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            /*
            this.$nextTick(() => {
                this.themeTopYs = [];

                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

                console.log(this.themeTopYs);
            })*/
        })

        // 3.请求推荐数据
        getRecommend().then(res => {
            this.redcommends = res.data.list
        })

        // 4.getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
            this.themeTopYs = []

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)

            // console.log(this.themeTopYs);
        },100)
        
    },
    mounted() {
        const refresh = this.debounce(this.$refs.scroll.refresh, 100)

        this.itenImgListener = () => {
            refresh()
        }

        this.$bus.$on('itemImgLoad', this.itenImgListener)
    },
    destroyed() {
        this.$bus.$off('itemImgLoad', this.itenImgListener)
    },
    methods: {
        ...mapActions(['addCart']),

        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },

        imageLoad() {
            this.$refs.scroll.refresh()

            this.getThemeTopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        },

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

      contentScroll(position) {
        //   1.获取y值
        const positionY = -position.y

        // 2.position和主题中的值进行对比
        let length = this.themeTopYs.length
        for(let i=0;i<length-1;i++) {
            // if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < 
            // this.themeTopYs[i+1]) || (i === length -1 && positionY >= this.themeTopYs[i]))){
            //     this.currentIndex = i;
            //     this.$refs.nav.currentIndex = this.currentIndex
            // }

            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex
            }
        }

        
        // 1.判断topback是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶
        this.isTabFixed = -(position.y) > this.tabOffsetTop
      },

      addToCart(){
        //   1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2.将商品添加到购物车里
        // this.$store.cartList.push(product)
        this.addCart(product).then(res => {
            // console.log(res);
            // this.show = true;
            // this.message = res;

            // setTimeout(() => {
            //     this.show = false;
            // },1500)

            // console.log(this.$toast);
            this.$toast.show(res);
        })

        // this.$store.dispatch('addCart', product).then(res => {
        //     console.log(res);
        // })
      }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 11;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px - 49px);
    }
</style>
