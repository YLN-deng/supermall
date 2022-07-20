import Vue from "vue"
import Toast from './Toast';

const obj = {}

obj.install = function(vue) {
    // Vue.extend(Toast)
    // document.body.appendChild(Toast.$el)

    // 创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // new的方式，根据组件构造器，创造一个组件对象
    const toast = new toastContrustor()

    // 将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // toast.$el对应div
    document.body.appendChild(toast.$el)

    // 挂载
    Vue.prototype.$toast = toast
}   

export default obj