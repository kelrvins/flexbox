<template lang="pug">
#app
  header(v-if="isPC")
    .title
      router-link(to="flex") Flexbox
      router-link(to="grid") CSS Grid
    span(v-if="!isChrome&&isPC") 配合chrome食用更佳
  router-view(v-if="isPC")
  .pc-tip(v-if="!isPC")
    h1 请使用PC
  footer
    a.github-link(href="https://github.com/kelrvins/flexbox" target="_blank") @github
  GithubCorner
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GithubCorner from './components/githubConner.vue';
@Component({
  components: {
    GithubCorner
  }
})
export default class App extends Vue {
  get isChrome(): boolean {
    const userAgent = navigator.userAgent;
    return userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
  }
  get isPC(): boolean {
    return !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
  }
}
</script>

<style lang="scss">
$mainColor: #ed4d6e;
html,
body {
  height: 100%;
}
body {
  background-color: #f4f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  header {
    height: 80px;
    background-color: #252525;
    position: relative;
    .title {
      width: 700px;
      margin: 0 auto; 
      text-align: center;
      a {
        display: inline-block;
        font-size: 35px;
        height: 80px;
        line-height: 80px;
        margin: 0;
        text-decoration: none;
        font-weight: bolder;
        width: 200px;
        color: #ccc;
        transition: all .2s;
        &:first-child{
          text-align: right;
        }
        &:last-child{
          text-align: left;
          margin-left: 30px;
        }
      }
      .router-link-active{
        font-size: 40px;
        color: #fff;
        text-shadow: 0 0 3px #fff;
        transition: all .2s;
        width: 400px;
      }
    }
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 5px;
      color: $mainColor;
      font-size: 12px;
    }
  }
  .pc-tip {
    text-align: center;
    color: $mainColor;
    height: 300px;
    line-height: 300px;
  }
  footer {
    text-align: center;
  }
}
</style>
