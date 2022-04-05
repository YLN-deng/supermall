export default {
    addCart(context, payload) {
        // payload新添加商品
        // let oldProduct = null;
        // for(let item of state.carList) {
        //     if(item.iid === payload.iid){
        //         oldProduct = item;
        //     }
        // }

        

        return new Promise((reslove,reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            // 2.判断oldProduct
        if(oldProduct){
            // oldProduct.count += 1
            context.commit('addCounter', oldProduct)
            reslove('当前的商品数量+1')
        } else {
            payload.count = 1
            // context.state.carList.push(payload)
            context.commit('addToCart', payload)
            reslove('已添加该商品')
        }
        })
    }

}