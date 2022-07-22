<template>
    <div id="tab-bar-item" @click="itemClick">
        <div v-show="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-show="isActive">
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle ">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        path: String,
        activeColor: {
            type: String,
            default: 'red' //默认值
        }
    },
    data() {
        return {
            // isActive: true
        }
    },
    computed: {
        isActive() {
            //  /home => item1(/home) = true
            //  /home => item1(/category) = false
            //  /home => item1(/cart) = false
            //  /home => item1(/profile) = false
            // 判断路由路径是否与TabBarItem中传入的path路径是否相同
            return this.$route.path.indexOf(this.path) !== -1

            // if(this.$route.path == this.path){
            //     return true
            // }
        },
        activeStyle() {
            // 判断isActive是否处于活跃，如果处于活跃则调用activeColor属性赋值
            return this.isActive ? {color: this.activeColor} : {}
        }
    },
    methods: {
        itemClick() {
            // 拿到TabBarItem中传入的path路径进行路由跳转
            this.$router.push(this.path).catch(err=>err)
        }
    },
}
</script>

<style scoped>
    #tab-bar-item {
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }

    #tab-bar-item img {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        /* 去除图片默认像素 */
        vertical-align: middle; 
        margin-bottom: 2px;
    }

    .active {
        color: red;
    }
</style>