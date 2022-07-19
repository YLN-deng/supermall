import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMinix = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
      scrollTop: 0
    };
  },
  methods: {
    // 回到顶点
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //  显示/隐藏BackTop按钮
    backTopIsShow(scrollTop) {
      this.scrollTop = scrollTop;
      this.isShowBackTop = this.scrollTop > 1000;
    },
  },
};
