/* * @Desc:弹窗组件 * @Author: 安忠琪 * @LastEditTime: 2021-07-15 14:12:33 */
<template>
  <div
    ref="playview"
    class="play-view"
    :style="{ height: height, width: width }"
  >
    <div class="title">
      <h3>{{ title }}</h3>
      <i class="fa fa-close" @click="close"></i>
    </div>
    <div class="content">
      <Vedio :width="'100%'" :height="'100%'" :url="url" :autoplay="true" />
    </div>
  </div>
</template>
<script>
import Vedio from "../components/video.vue";
export default {
  components: { Vedio },
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    title: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    mask: {
      type: Boolean,
      default: true,
    },
    pos: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      maskMode: Element,
      result: 1,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.pos === "left") {
        this.$refs.playview.style.left = 0;
        this.$refs.playview.style.top =
          window.innerHeight - this.$refs.playview.offsetHeigth + "px";
      } else if (this.pos === "right") {
        this.$refs.playview.style.right = 0;
        this.$refs.playview.style.top =
          (window.innerHeight - this.$refs.playview.offsetHeigth) / 2 + "px";
      }
      this.$refs.playview.style.left =
        (window.innerWidth - this.$refs.playview.offsetWidth) / 2 + "px";
      this.$refs.playview.style.top =
        (window.innerHeight - this.$refs.playview.offsetHeigth) / 2 + "px";
    });
    this.mask && this.createMask();
    this.add(0.88123, 4.65);
  },
  methods: {
    /* 关系弹窗 */
    close() {
      this.$emit("closePopup");
      document.body.removeChild(this.maskMode);
    },
    /* 创建遮罩层 */
    createMask() {
      this.maskMode = document.createElement("div");
      this.maskMode.className = "mask";
      this.maskMode.style.width = "100%";
      this.maskMode.style.height = document.body.offsetHeight + "px";
      console.log(this.maskMode);
      document.body.appendChild(this.maskMode);
    },
    add(a, b) {
      let num1;
      let num2;
      let m;
      let result;
      try {
        // eslint-disable-next-line no-irregular-whitespace
        num1 = a.toString().split(".")[1].length;
      } catch (e) {
        num1 = 0;
      }
      try {
        num2 = b.toString().split(".")[1].length;
      } catch (e) {
        num2 = 0;
      }
      m = Math.pow(10, Math.max(num1, num2));
      console.log(Math.floor(a * m + b * m) / m);
      return Math.floor(a * m + b * m) / m;
    },
  },
};
</script>
<style lang="css" scoped>
.play-view {
  position: fixed;
  z-index: 20;
  border: 1px #ccc solid;
}
.play-view .title {
  height: 60px;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.play-view .title h3 {
  font-size: 18px;
  margin-left: 20px;
}
.play-view .title i {
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
}
.play-view .title i:hover {
  transform: scale(1.3);
  transition: 0.1s all;
}
.play-view .content {
  height: calc(100% - 60px);
  background: #fff;
}
</style>
