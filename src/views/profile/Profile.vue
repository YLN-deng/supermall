<template>
  <div id="profile">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">我的</div></nav-bar>
    <!-- 头部 -->
    <div class="header">
      <div class="top-header"></div>
      <div class="header-img">
        <img
          class="header-image"
          src="../../assets/img/profile/header.jpg"
          alt=""
        />
        <img
          class="vip-header"
          src="https://s10.mogucdn.com/mlcdn/c45406/190627_1i49i2a2cj6fll5bh25l07d53l008_72x72.png"
          alt=""
        />
        <span>某用户</span>
      </div>
      <div class="middle-header" @click="vipNo">
        <img
          src="https://s10.mogucdn.com/mlcdn/c45406/191010_2il1l3i91gkd5c461j93e5ehfcgi5_1404x216.png"
          alt=""
        />
      </div>
      <!-- 头部结束 -->
      <!-- 中间菜单01 -->
      <div class="menu">
        <div class="menu-nav" @click="menuNav">
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190815_7a9da7lh4a96lb1fl6b4gb854f3ji_75x75.png"
            alt=""
          />
          <span>主页</span>
        </div>
        <div class="menu-nav" @click="menuNav">
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190815_6f41b17399aha0flla6chjb0lhk47_75x75.png"
            alt=""
          />
          <span>消息</span>
        </div>
        <div class="menu-nav" @click="menuNav">
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190815_31g4a5ebc8bj2f85cj4li8df89aab_75x75.png"
            alt=""
          />
          <span>收藏</span>
        </div>
        <div class="menu-nav" @click="menuNav">
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190815_0k9k5gh362a1kbk87hha8ff1bek69_75x75.png"
            alt=""
          />
          <span>关注</span>
        </div>
      </div>
      <!-- 中间菜单01结束 -->
      <!-- 中间菜单02开始 -->
      <div class="menux" @click="menuNav">
        <div class="menux-go-shop" @click="menuNav">
          <span>购物车</span>
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190815_3637hh8ac09e50j7f07i7eealck4i_513x360.png"
            alt=""
          />
        </div>
        <div class="menux-nav">
          <div class="menux-nav-list" @click="menuNav">
            <span>卡劵红包</span>
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190819_82kf4j7kdldbf0654hf987dk24kj4_10x18.png"
              alt=""
            />
          </div>
          <div class="menux-nav-list" @click="menuNav">
            <span>补贴保障</span>
            <i href="javascript:;">退货补运费</i>
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190819_82kf4j7kdldbf0654hf987dk24kj4_10x18.png"
              alt=""
            />
          </div>
          <div class="menux-nav-list" @click="menuNav">
            <span>我的钱包</span>
            <i href="javascript:;">白付美在这</i>
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190819_82kf4j7kdldbf0654hf987dk24kj4_10x18.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <!-- 中间菜单02结束 -->
      <!-- 中间菜单03开始 -->
      <div class="menus" @click="menuNav">
        <div class="menus-top">
          <span>我的订单</span>
          <i>全部</i>
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190819_82kf4j7kdldbf0654hf987dk24kj4_10x18.png"
            alt=""
          />
        </div>
        <div class="menus-bottom">
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_0ig16599k9l4f80g59cbkc6bcadid_75x75.png"
              alt=""
            />
            <span>待付款</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_5j02c44liecec503kdldjbh72hca8_75x75.png"
              alt=""
            />
            <span>待发货</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_56bd5eg3f4h47g2l1042436dc2950_75x75.png"
              alt=""
            />
            <span>待收货</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_8af1b27cfaed15fllab4j3hffh7h8_75x75.png"
              alt=""
            />
            <span>评价</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_18db4je44bd6ej8ajg0l1950ia5ih_75x75.png"
              alt=""
            />
            <span>售后</span>
          </div>
        </div>
      </div>
      <!-- 中间菜单03结束 -->
      <!-- 底部菜单开始 -->
      <div class="menus bottom" @click="menuNav">
        <div class="menus-top">
          <span>我的设置</span>
          <img
            src="https://s10.mogucdn.com/mlcdn/c45406/190819_82kf4j7kdldbf0654hf987dk24kj4_10x18.png"
            alt=""
          />
        </div>
        <div class="menus-bottom">
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_6f13a0l26fcfcgkhei88f8248024k_75x75.png"
              alt=""
            />
            <span>签到</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_8444j6413ccf1b00hb923a7l491ad_75x75.png"
              alt=""
            />
            <span>大姨妈</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_54cd4b12ef09174hf1jkblbi69i2c_75x75.png"
              alt=""
            />
            <span>客服</span>
          </div>
          <div class="menus-bottom-list">
            <img
              src="https://s10.mogucdn.com/mlcdn/c45406/190815_10lcah52ick650jc36hgg2kafkj5f_75x75.png"
              alt=""
            />
            <span>达人聚</span>
          </div>
          <div class="menus-bottom-list">
            <img src="../../assets/img/profile/more.svg" alt="" />
            <span>更多</span>
          </div>
        </div>
      </div>
      <!-- 底部菜单结束 -->
      <!-- 退出登录按钮 -->
        <div class="exit-buttom" @click="menuNav">
            <span>退出登录</span>
        </div>
      <!-- 退出登录按钮结束 -->
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "Profile",
  components: { NavBar },
  methods: {
    vipNo() {
      this.$toast.show("会员功能暂时未开放");
    },
    menuNav() {
      this.$toast.show();
    },
  },
};
</script>

<style scoped>

#profile {
  height: 100%;
  background-color: rgb(247, 244, 244);
  margin-bottom: 55px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
.top-header {
  width: 100%;
  height: 100px;
  background-color: var(--color-tint);
  border-radius: 0 0 20px 20px;
}
.header-img {
  text-align: center;
  width: 69px;
  height: 80px;
  margin: -50px auto 0 auto;
  background-color: #fff;
  border-radius: 45%;
  position: relative;
  z-index: 9;
}
.header-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  top: 2px;
  left: 5px;
}
.header-img span {
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-weight: bold;
}
.vip-header {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 20px;
  right: 2px;
}

.middle-header {
  margin: -48px auto 0 auto;
  width: 94%;
  height: 130px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  position: relative;
}
.middle-header img {
  width: 100%;
  height: 45%;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 8px 8px;
}

.menu {
  width: 94%;
  height: 65px;
  background-color: #fff;
  margin: 10px auto 0 auto;
  border-radius: 8px;
  display: flex;
}
.menu-nav {
  width: 50px;
  height: 50px;
  position: relative;
  margin: 8px 0 0 13px;
}
.menu-nav img {
  display: block;
  width: 25px;
  height: 25px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.menu-nav span {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 12px;
  text-align: center;
}
.menux {
  width: 94%;
  height: 120px;
  margin: 10px auto 0 auto;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}
.menux-go-shop {
  width: 49%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  position: relative;
}

.menux-go-shop img {
  margin-left: 10px;
  width: 160px;
}
.menux-go-shop span {
  position: absolute;
  top: 15px;
  left: 10px;
  color: #333;
  font-size: 14px;
}
.menux-nav {
  width: 49%;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
}

.menux-nav-list {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e6e3e3;
  position: relative;
}
.menux-nav-list:last-child {
  border-bottom: none;
}

.menux-nav-list span {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 14px;
  color: #333;
}

.menux-nav-list img {
  width: 5px;
  height: 9px;
  position: absolute;
  top: 15px;
  right: 10px;
}

.menux-nav-list i {
  font-size: 10px;
  color: #999;
  position: absolute;
  top: 14px;
  right: 20px;
}

.menus {
  width: 94%;
  height: 110px;
  margin: 10px auto 0 auto;
  border-radius: 8px;
}
.menus-top {
  width: 100%;
  height: 40px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #cccccc;
  position: relative;
}
.menus-bottom {
  width: 100%;
  height: 69px;
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.menus-top span {
  position: absolute;
  top: 10px;
  left: 10px;
}
.menus-top i {
  position: absolute;
  top: 14px;
  right: 22px;
  font-size: 10px;
  color: #999;
}
.menus-top img {
  width: 5px;
  height: 9px;
  position: absolute;
  top: 15px;
  right: 10px;
}

.menus-bottom-list {
  width: 50px;
  height: 50px;
  position: relative;
  /* margin: 8px 0 0 12px; */
}

.menus-bottom-list img {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
}

.menus-bottom-list span {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: #5e5e5e;
  font-size: 12px;
}

.exit-buttom {
    margin: 10px auto 0 auto ;
    width: 94%;
    height: 40px;
    background-color: #ff5777;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
}

.exit-buttom span{
    color: #fff;
}
</style>