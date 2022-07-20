import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前的数组中是否存在相同的商品id，如果有则将id添加到oldProduct
      // let oldProduct = null
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(
        (item) => item.iid === payload.iid
      );

      // 判断oldProduct是否有值，如果有值，则取值，并展示oldProduct的值，没有则新建
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct);
        resolve("当前的商品数量 +1");
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("该商品已添加到购物车");
      }
    });
  },
};
