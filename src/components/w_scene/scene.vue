<template>
    <div class="scene" >
        <scene-content v-if="$store.state.showMainPage"></scene-content>
        <ImgForcecast v-if="$store.state.showForecast"></ImgForcecast>
        <ImgLookup v-if="$store.state.showImgquery"></ImgLookup>
    </div>
</template>
<script>

import sceneHeader from './scene_header/header.vue';
import sceneContent from './scene_content/content.vue';
import ImgForcecast from './scene_content/Img_forcecast.vue';
import ImgLookup from './scene_content/Img_lookup.vue';

export default {
    name: "scene",
	components: {
        sceneHeader,
        sceneContent,
        ImgForcecast,
        ImgLookup

    },
    data () {
      return {

      }
    },
    watch: {
        $route(to) {  
           var routerName = to.path
           //this.routerName = routerName
           console.log("this.routerName",this.routerName)
           //this.$store.state.routerName = routerName
            switch(routerName){
                case '/': 
                    this.showForcecast();
                    break;
                case '/forcecast':
                    this.showMainPage();
                    break;
                case '/imgquery':
                    this.showImgquery();
                    break;
               
            }
           
        }
    },
    methods:{
        showMainPage(){
            this.$store.state.showMainPage=true;
            this.$store.state.showForecast=false;
            this.$store.state.showImgquery=false;
        },
        showForcecast(){
            this.$store.state.showMainPage=false;
            this.$store.state.showForecast=true;
            this.$store.state.showImgquery=false;
        },
        showImgquery(){
            this.$store.state.showMainPage=false;
            this.$store.state.showForecast=false;
            this.$store.state.showImgquery=true;
        }
    },
}
</script>
<style scoped lang="less">
.scene {
    position: relative;
    width: 100%;
    min-height: 100%;
    box-sizing: border-box;
}
</style>
