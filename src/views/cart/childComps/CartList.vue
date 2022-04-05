<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item, index) in cartList" 
                            :key="index" 
                            :item-info="item">
            </cart-list-item>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

import {mapGetters} from 'vuex'

export default {
    name: "CartList",
    components: {
        Scroll,
        CartListItem,
    },
    computed: {
        ...mapGetters([
            'cartList'
        ])
    },
    activated() {
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list {
    /* font-size: 0.68rem; */
    /* height: calc(100vh -44px -49px); */
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}

.content{
  overflow: hidden;
   height: calc(100vh - 44px - 49px);
}
</style>
