<!-- 底部导航 -->
<template>
    <div id="tabbar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TabBar'
}
</script>

<style scoped>
    #tabbar {
    display: flex;
    background-color: #dddcdc;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.3); */
    z-index: 10;
    }
</style>