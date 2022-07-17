<!-- 轮播图 -->
<template>
    <swiper>
		<swiper-item v-for="(item,index) in banners" :key="index">
		    <a :href="item.link">
				<img :src="item.image" alt="">
			</a>
	    </swiper-item>
	</swiper>
</template>

<script>
import { Swiper, SwiperItem} from 'components/common/swiper';  //引入轮播图组件

export default {
    name: 'HomeSwiper',
    props: {
        banners: {  //获取home-swiper组件传入的banners 
            type:Array,
            default() {
                return {}
            }
        }
    },
    components: {
        Swiper,
		SwiperItem
    },
}
</script>
<style scoped>
    
</style>