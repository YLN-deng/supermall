<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isSelectAll" 
                          class="check-button" 
                          @click.native="checkClick">
            </check-button>
            <span>全选</span>
        </div>

        <div class="price">
            合计: 
            <span>{{totalPrice}}</span>
        </div>

        <div class="calculate" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  components: { CheckButton },
    name: "CartBottomBar",
    computed: {
        totalPrice() {
            return '￥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue,item) => {
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        },
        isSelectAll() {
            // return !(this.$store.state.cartList.filter(item => !item.checked).length)
            if(this.$store.state.cartList.length === 0) return false
            return !this.$store.state.cartList.find(item => !item.checked)
        }
    },
    methods: {
        checkClick() {
            if(this.isSelectAll) {
                this.$store.state.cartList.forEach(item => item.checked = false)
            }else{
                this.$store.state.cartList.forEach(item => item.checked = true)
            }
        },
        calcClick() {
            if(!this.isSelectAll) {
            this.$toast.show('请选择需要购买的商品', 2000);
            }
        }
    }
}
</script>

<style scoped>
  .bottom-bar {
      height: 40px;
      background-color: #eee;
      position: relative;
      bottom: 136px;
      line-height: 40px;
      display: flex;
      font-size: 14px;
  }
  .check-content {
      display: flex;
      align-items: center;
      margin-left: 10px;
      width: 60px;
  }
  .check-button {
      width: 22px;
      height: 22px;
      line-height: 22px;
      margin-right: 5px;
  }
  .price {
      margin-left: 30px;
      flex: 1;
  }
  .price span {
      color: orangered;
  }
  .calculate {
      width: 100px;
      color: #fff;
      background-color: orange;
      text-align: center;
  }
</style>
