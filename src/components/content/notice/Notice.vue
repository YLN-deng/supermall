<template>
  <div v-if="isShow" id="notice">
    <!-- 标题 -->
    <div class="msg-context">
      <span>公告</span>
    </div>
    <!-- 信息 -->
    <div class="message">
      <div>
        <span>手机端使用体验更佳哦！</span>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="buttom" @click="isShowClick">
      <div class="push-button">
        <span>我已知晓</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    isShowClick() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
#notice {
  width: 300px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.msg-context {
  width: 100%;
  height: 40px;
  line-height: 40px;
  /* border-bottom: 1px solid #333; */
  box-shadow: 0 1px 1px rgb(211, 210, 210);
  text-align: center;
  border-radius: 5px 5px 0 0;
}
.msg-context span {
  color: #333;
  font-size: 18px;
  font-weight: bold;
}

.buttom {
  width: 100%;
  height: 60px;
  border-radius: 0 0 5px 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgb(211, 210, 210);
  display: flex;
  align-items: center;
  justify-content: center;
}
.push-button {
  width: 90px;
  height: 34px;
  line-height: 34px;
  background-color: rgb(218, 88, 88);
  text-align: center;
  border-radius: 16px;
  /* margin-top: ; */
}
.push-button span {
  font-size: 14px;
  color: #333;
}

.message {
  padding: 10px;
}

.message span {
  margin-top: 10px;
}
</style>