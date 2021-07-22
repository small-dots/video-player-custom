<!--
 * @Desc: 
 * @Author: 安忠琪
 * @LastEditTime: 2021-07-16 13:30:51
-->
<template>
  <div>
    <ul class="list-warp clearfix">
      <li
        class="video-item"
        v-for="(item, index) in videoList"
        :key="index"
        @click="play(item.url, item.title)"
      >
        <div>
          <img :src="item.imageUrl" :alt="item.title" />
          <i class="fa fa-play"></i>
        </div>
        <h3>
          {{ item.title }}
        </h3>
      </li>
    </ul>
    <popup
      @closePopup="close"
      v-if="showPopup"
      :width="'880px'"
      :height="'556px'"
      :pos="'center'"
      :mask="true"
      :title="title"
      :url="url"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import popup from "../components/popup.vue";
@Component({
  name: "List",
  components: {
    popup,
  },
})
export default class List extends Vue {
  private showPopup = false;
  private title: any;
  private url: any;
  private videoList = [
    {
      title: "2021年春季新品发布会第一场",
      url:
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/812358b69886e576c66a01f1f00affe9.mp4",
      imageUrl:
        "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e74c4ff741bcdfc5b28a48a43e4edc6d.jpg?thumb=1&w=296&h=180&f=webp&q=90",
    },
    {
      title: "Redmi 10X系列发布会",
      url:
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/11c70c96529b6e6938567ec1aa0910e0.mp4",
      imageUrl:
        "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/101b19aca4bb489bcef0f503e44ec866.jpg?thumb=1&w=296&h=180&f=webp&q=90",
    },
    {
      title: "小米10 青春版 发布会",
      url:
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cdabcaa763392c86b944eaf4e68d6a3.mp4",
      imageUrl:
        "//cdn.cnbj1.fds.api.mi-img.com/mi-mall/96563e75833ba4563bd469dd28203b09.jpg?thumb=1&w=296&h=180&f=webp&q=90",
    },
  ];
  /**
   * 播放
   */
  private play(videoUrl: string, title: string) {
    console.log(videoUrl, title);
    if (videoUrl && title) {
      this.showPopup = true;
      this.url = videoUrl;
      this.title = title;
    }
  }
  private close() {
    this.showPopup = !this.showPopup;
  }
}
</script>
<style lang="css" scoped>
.list-warp {
  list-style-type: none;
  height: 100%;
}
.list-warp .video-item:first-child {
  margin-left: 0px;
}
.list-warp .video-item {
  position: relative;
  float: left;
  width: 296px;
  height: 285px;
  margin-left: 14px;
  margin-bottom: 14px;
  text-align: center;
  background: #fff;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
