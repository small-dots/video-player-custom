<!--
 * @Desc: 视频组件
 * @Author: 安忠琪
 * @LastEditTime: 2021-07-16 13:48:39
-->
<template>
  <div ref="videoPanel" class="video" :style="{ height: height, width: width }">
    <video id="videoContent" class="video-content" :src="url" />
    <div ref="videoControls" class="video-controls">
      <div ref="videoProgress" class="video-progress">
        <div class="video-progress-current"></div>
        <div class="video-progress-suc"></div>
        <div class="video-progress-bar"></div>
      </div>
      <!-- 播放按钮 -->
      <div class="video-play">
        <i id="playBar" class="fa fa-play" />
      </div>
      <!-- 时间 -->
      <div class="video-time">
        <span>{{ currentTime }}</span> / <span>{{ totalTime }}</span>
      </div>
      <!-- 全屏 -->
      <div class="video-screen">
        <i id="fullScreen" class="fa fa-arrows-alt" />
      </div>
      <!-- 音量 -->
      <div class="video-volume">
        <i ref="volume" class="fa fa-volume-up"></i>
        <div ref="volprogress" class="video-volprogress">
          <div class="video-volprogress-current"></div>
          <div class="video-volprogress-bar"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Vedio",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    url: {
      type: String,
      default: "",
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maskMode: Element,
      currentTime: "00:00", // 当前时间
      totalTime: "00:00", // 总时间
    };
  },
  mounted() {
    let timer;
    /* 视频是否加载完毕 */
    const videoContent = document.getElementById("videoContent");
    videoContent.volume = 0.5; // 音量默认是50（100）
    videoContent.autoplay = this.autoplay;
    const playBar = document.getElementById("playBar");
    const fullScreen = document.getElementById("fullScreen");
    const progeress = this.$refs.videoProgress;
    const volprogress = this.$refs.volprogress;
    const videoPanel = this.$refs.videoPanel;
    const videoControls = this.$refs.videoControls;
    console.log(videoPanel);
    const volume = this.$refs.volume;
    console.log(progeress);
    videoContent.addEventListener("canplay", () => {
      this.totalTime = this.foramtTime(videoContent.duration) || "00:00";
    });
    /* 视频播放 */
    videoContent.addEventListener("play", () => {
      playBar.className = "fa fa-pause";
      timer = setInterval(() => {
        const scale = videoContent.currentTime / videoContent.duration; // 0-1
        const scaleSuc = videoContent.buffered.end(0) / videoContent.duration; // 缓存的时间
        console.log(videoContent.buffered.end(0), scaleSuc);
        this.currentTime = this.foramtTime(videoContent.currentTime);
        progeress.children[0].style.width = scale * 100 + "%"; // 播放进度
        progeress.children[1].style.width = scaleSuc * 100 + "%"; // 缓存进度
        progeress.children[2].style.left = scale * 100 + "%"; // 小球位置
      }, 1000);
    });
    /* 视频暂停 */
    videoContent.addEventListener("pause", () => {
      playBar.className = "fa fa-play";
      clearInterval(timer);
    });
    /* 播放、暂停 */
    playBar.addEventListener("click", () => {
      if (videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    });
    /* 全屏 */
    fullScreen.addEventListener("click", () => {
      videoContent.requestFullscreen();
    });
    /* 进度的拖拽 */
    progeress.children[2].addEventListener("mousedown", function(el) {
      const downX = el.pageX;
      const downL = this.offsetLeft;
      document.onmousemove = (ev) => {
        let scale =
          (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if (scale < 0) {
          scale = 0; // 防止拖拽出界
        } else if (scale > 1) {
          scale = 1; // 防止拖拽出界
        }
        progeress.children[0].style.width = scale * 100 + "%"; // 当前播放进度
        progeress.children[1].style.width = scale * 100 + "%"; // 当前缓冲进度
        this.style.left = scale * 100 + "%";
        videoContent.currentTime = scale * videoContent.duration;
      };
      /* 鼠标抬起 取消 */
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
      el.preventDefault();
    });
    /* 音量 */
    volprogress.children[1].addEventListener("mousedown", function(el) {
      const downX = el.pageX;
      const downL = this.offsetLeft;
      document.onmousemove = (ev) => {
        let scale =
          (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if (scale < 0) {
          scale = 0; // 防止拖拽出界
        } else if (scale > 1) {
          scale = 1; // 防止拖拽出界
        }
        volprogress.children[0].style.width = scale * 100 + "%"; // 当前音量
        this.style.left = scale * 100 + "%";
        videoContent.volume = scale;
      };
      /* 鼠标抬起 取消 */
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };

      el.preventDefault();
    });
    /* 静音事件 */
    volume.addEventListener("click", () => {
      volume.className = "fa fa-volume-off";
      videoContent.volume = 0;
      volprogress.children[0].style.width = "50%"; // 当前音量
    });
    /* 默认隐藏控件 */
    videoPanel.addEventListener("mouseenter", () => {
      videoControls.style.bottom = 0;
    });
    videoPanel.addEventListener("mouseleave", () => {
      videoControls.style.bottom = "-60px";
    });
  },
  methods: {
    /* 格式化时间 */
    foramtTime(number) {
      let b = "";
      let hour = parseInt(number / 3600);
      let minute = parseInt((number % 3600) / 60);
      let second = Math.ceil(number % 60);
      if (hour > 0) {
        hour = hour < 10 ? "0" + hour : hour;
        b += hour + ":";
      }
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      b += minute + ":" + second;
      return b;
    },
  },
};
</script>
<style lang="css" scoped>
.video {
  position: relative;
  overflow: hidden;
}
.video i:hover {
  cursor: pointer;
  color: #ff6a03 !important;
}
.video .video-content {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 等比 */
}
.video .video-controls {
  width: 100%;
  position: absolute;
  bottom: -60px;
  left: 0;
  height: 50px;
  background: rgba(0, 0, 0, 0.8);
  transition: 0.5s;
}
.video .video-controls .video-progress {
  position: relative;
  height: 5px;
  background: #222223;
}
.video .video-controls .video-progress .video-progress-current {
  position: absolute;
  left: 0;
  width: 0;
  height: 100%;
  background: #ff6a03;
  z-index: 1;
}
.video .video-controls .video-progress .video-progress-suc {
  position: absolute;
  left: 0;
  width: 0;
  height: 100%;
  background: #666;
}
.video .video-controls .video-progress .video-progress-bar {
  height: 14px;
  width: 14px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: -7px;
  margin-top: -4px;
  z-index: 2;
}
.video .video-controls .video-progress .video-progress-bar:hover {
  cursor: pointer;
}
.video-controls .video-play {
  float: left;
  height: 45px;
  width: 20px;
  line-height: 45px;
  margin-left: 35px;
}
.video-controls .video-play i {
  font-size: 20px;
  color: #fff;
}
.video-controls .video-time {
  float: left;
  height: 45px;
  line-height: 45px;
  margin-left: 35px;
  color: #fff;
}
.video-controls .video-time:hover {
  cursor: default;
}
.video-controls .video-screen {
  float: right;
  height: 45px;
  line-height: 45px;
  margin-right: 20px;
}
.video-controls .video-screen i {
  font-size: 20px;
  color: #fff;
}
.video-controls .video-volume {
  float: right;
  display: flex;
  align-items: center;
  height: 45px;
  margin-right: 30px;
}
.video-controls .video-volume i {
  font-size: 20px;
  color: #fff;
  margin-right: 20px;
}
.video-controls .video-volume .video-volprogress {
  width: 100px;
  height: 5px;
  background: #222223;
  position: relative;
}
.video-controls .video-volume .video-volprogress .video-volprogress-current {
  width: 50%;
  height: 100%;
  background: #ff6a03;
}
.video-controls .video-volume .video-volprogress .video-volprogress-bar {
  height: 14px;
  width: 14px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -7px;
  margin-top: -4px;
  z-index: 2;
}
.video-controls .video-volume .video-volprogress .video-volprogress-bar:hover {
  cursor: pointer;
}
</style>
