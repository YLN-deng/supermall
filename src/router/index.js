import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 创建路由
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('../views/home/Home.vue'),
        children: []
    },
    {
        path: '/category',
        name: 'Category',
        component: () =>
            import ('../views/category/Category.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/profile/Profile.vue')
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () =>
            import ('../views/cart/Cart.vue')
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router