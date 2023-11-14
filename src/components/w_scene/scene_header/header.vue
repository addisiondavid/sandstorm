<template>
   <div class="scene-header" style="display: flex;align-items: center;justify-content: center;"  :style="{background:'url('+imgUrl+')'} ">
        <div class="head-container" style=" width: 70%;">
            <div style="display:flex;    justify-content: space-between;">

                <div class="logo-container" style="">
                    <div style="display:flex;align-items: center;">
                        <img :src="weatherlogo" alt="" width="50px" height="40">
                        <div style="padding-left:.2em;">
                            <p  class="title-text" style="">中央气象台•沙尘预报评估系统 </p>
                        </div>
                    </div>
                </div>
                <!--头部菜单-->
                <div class="topMenu" v-if="knowledgeDbMenu.length>0">
                    <ul class="menu-list-container">
                        <li  :class="{'active':categoryName==ele.categoryName}"  class="menu-list-item" v-for="(ele,key) in knowledgeDbMenu" :key="key" >
                            <p :class="{'active':categoryName==ele.categoryName}"  style="color:white;border:none;line-height:30px;font-size: 19px;font-family: Microsoft YaHei;font-weight: bold;color: #FFFFFF;" @click="getMenuItem">{{ele.categoryName}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
   
</template>
<script>
import utils from '../../../assets/js/tools/utils.js';
import DesUtils from '../../../assets/js/tools/des.js';
import axios from '../../../assets/js/tools/axios.js';
import { mapState,mapMutations } from 'vuex';
import { Message } from 'element-ui';

export default {
    name: 'indexHeader',
    data() {
        return{
            //knowledgeDbMenu:[{"categoryName":"监测判识"},{"categoryName":"个例查询"},{"categoryName":"影响评估"},{"categoryName":"个例维护"}],
            knowledgeDbMenu:[{"categoryName":"监测判识"},{"categoryName":"个例查询"},{"categoryName":"影响评估"}],
            categoryName:'影响评估',
            imgUrl:'../../../../html/static/img/background_img2.png',
            weatherlogo:'../../../../html/static/img/nmc_logo_white.png'
        }
    },
    computed: {
       
    },
    created () {
    },
    mounted(){
		
    },
    methods: {
        getMenuItem(e){
            console.log("e....",e)
            if(e.target.innerText=='监测判识'){
                this.$router.push('/')
            }
            if(e.target.innerText=='个例查询'){
                this.$router.push('/imgquery')
            }
            if(e.target.innerText=='影响评估'){
                this.$router.push('/forcecast')
            }
               
        }
            
    }
}

</script>
<style scoped lang="less">
    .title-text{
        font-size: 28px;
        font-family: Source Han Sans CN VF;
        font-weight: bold;
        color: #FFFFFF;
        text-shadow: 0px 2px 10px rgba(0,20,50,0.7);
        background: linear-gradient(0deg, #C0EAFF 0%, #FFFFFF 88.3544921875%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .scene-header{
        height:7vh;
        
    }
    .menu-list-container{
        list-style:none;
        display:flex;
        justify-content:center;
        padding-top:.5em;

    }
    .menu-list-item{
        line-height: 30px;
        font-size:14px;
        font-weight:bold;
        margin-right: 1.5em;
        cursor:pointer;

    }

    .menu-list-item button:hover{
        color: #0e1b90;
       
    }

    .active{
        color: #0e1b90;
    }
</style>
