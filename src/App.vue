<!--
 * @Desc: 
 * @Author: 安忠琪
 * @LastEditTime: 2021-07-15 15:57:35
-->
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Typescript 封装播放器组件</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.mask{
   position:absolute;
   left: 0;
   top: 0;
   z-index: 10;
   background: rgba(0,0,0,0.5); 
}
</style>
