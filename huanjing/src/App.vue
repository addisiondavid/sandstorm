<template>
    <div id="app">
        <headMenu></headMenu>
        <router-view/>
        
        
    </div>
</template>

<script>
import headMenu from '../src/components/w_scene/scene_header/header.vue';
import utils from './assets/js/tools/utils.js';
import scene from '../src/components/w_scene/scene.vue'

export default {
  name: 'App',
  components:{
    headMenu
  },
  created() {
    // const uname = utils.getCookie('uname');
    // if (uname) {
    //   utils.getQueryUrlParamsToSaveLocalStorage({ syscod: '', manager: '', jeesiteToken: '', name: uname }, 'draw');
    // } else {
    //   location.href = '/';
    // }
  }
}
</script>

<style lang="less">
@import "./assets/less/reset.css";
html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    min-width: 1200px;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    min-width: 1200px;
}
.el-popover {
    padding-bottom: 0 !important;
    .el-form-item {
        margin-bottom: 14px;
        .el-button--primary {
            width: 240px;
        }
    }
}
</style>
