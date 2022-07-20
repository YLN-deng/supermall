<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-shop" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去结算：{{ checkLength }}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

// 直接调用vuex
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 合计，找到并循环选中的商品，在把价格相加
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    // 去结算，把选中的商品相加
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    //  查找是否有一个没选中
    isSelectAll() {
    //   return !(this.cartList.filter(item => !item.checked).length)
    if (this.cartList.length === 0) return false
    return !this.cartList.find(item => !item.checked)
    },
  },
  methods: {
    checkClick() {
        if(this.isSelectAll) { 
            this.cartList.forEach(item => item.checked = false) //全选
        }else {
            this.cartList.forEach(item => item.checked = true) // 部分或者全部不选中
        }
    },
    calcClick() {
        if(!this.cartList.find(item => item.checked)) {
            this.$toast.show('你还没有选择任何商品')
        }
    }
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-shop {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 6px;
}
.price {
  font-weight: bold;
}
.calculate {
  text-align: center;
  width: 90px;
  color: #fff;
  font-weight: bold;
  background-color: rgb(230, 55, 55);
}
</style>