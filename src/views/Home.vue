<!--
 * @Desc: 
 * @Author: 安忠琪
 * @LastEditTime: 2021-07-15 15:58:11
-->
<template>
  <div class="home">
    <i class="fa fa-arrows-alt"></i>
    <i class="fa fa-pause"></i>
    <i class="fa fa-play"></i>
    <i class="fa fa-volume-up"></i>
    <i class="fa fa-close"></i>
    <list></list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import list from '../components/list.vue'
@Component({
  components: {
    list
  },
})
export default class Home extends Vue {
  
}
</script>
<style lang="css" scoped>
.home{
  height: 100%;
}
.home i{
  margin-left: 10px;
}
</style>


