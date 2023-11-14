<template>
    <!--
        <div id="imgShow" class="img_show" v-show="isImgShow">
    -->
    <div id="imgShow" class="img_show" v-show="true">
        
       
        
        <div class="img_show_main" :style="{height: img_main_h + 'px'}">
<!--

            <div class="left-item-container">
                <h4 class="left-col-header"   >栏目列表</h4>
                <ul v-for="(item,key) in categoryList"    class="list-container"  :key="key"         @click="getArticleList(item)"    style="cursor:pointer"   >
                    <span  :class="{'active2':title==item.title}"  style="width:3px;height: 18px;    background-color: #bbbcbd;margin-right: 1em;"></span>
                    <li class="text-style"  style="list-style:none;padding: 8px 0;font-size: ;"   :class="{'active':title==item.title}" >{{item.title}}</li>
                    <i class="el-icon-caret-top" :class="{'hiddenIcon':title==item.title}"    style="position:absolute;right:1em;    font-size: 20px;"></i>
                    <i  :class="{'hiddenIcon':title!=item.title}"  class="el-icon-caret-bottom"  style="position:absolute;right:1em;    font-size: 20px;"></i>
                </ul>
            </div>
-->
            
            <div class="menuBar" style="line-height:40px; min-width: 220px;position: relative;left:.3em;background: #FFFFFF;border: 1px solid #86D0FF;">
               <!--
                <p style="padding:.6em;border: 1px solid rgb(187, 188, 189);"><strong>本站导航</strong></p>
               -->
                <li class="parentListMenu" v-for="(ele,key) in parentMenu" :key="key" style="list-style:none;line-height:40px;cursor:pointer;font-size:16px;">
                    <div style="display:flex;align-items: center;background-color: #F1F8FF;font-size:14px" class="parentMenuContainer" :id="'parentMenuName'+ele.id"   @click="toMainNav(ele.id)">
                        <img :src="ele.icon" alt="" width="25px" height="25px"/>
                        <strong><p class="parentMenuName"> <span data-v-03ee4ecd="" class="" style="width: 3px; height: 18px; background-color: rgb(187, 188, 189); margin-right: 1em;"></span>{{ele.name}}</p></strong>
                    </div>
                         
                    <ul :id="ele.id+'_ul'" class="subli" style="">   
                        <li  :class="{'activeSel':menuItem.id==ele.id}"     :id="e.id" class="subMenuItem"  v-if="ele.id==e.pid"  v-for="(e,indx) in allMenuData" :key="indx" style="list-style:none;cursor:pointer;font-size:12px;"  @click="toSubNav(e)">
                            <span style="color:lightgrey">•</span>
                            {{e.name}}
                        </li>
                    </ul>
                </li>     
                
                
            </div>

            
            <div class="show_imgs_box" style=" ">
				
				<div class="img_show_header" style="display:none">
				    
				    <div class="img_info_box">
				        <!-- <div class="img_info_title_box">
				            <label>风四云图</label>
				            <label>风四云图</label>
				        </div> -->
				        <div class="img_info_time_box">
				            <!-- <label>时间:</label> -->
				            <div>
				                <p>UTC：<span>{{utcDate}}</span></p>
				                <p>BJT：<span>{{bjtDate}}</span></p>
				            </div>
				        </div>
				    </div>
				    <div class="img_show_date">
				        <label class="startTimeTip">时间 </label>
				        
				    </div>
				    <div class="img_show_tools">
				        <!-- <div class="tools-control-btn">
				             <label>播放控制</label>
				            <div class="tools-control-btns">
				                <span class="control-btn-prev"><i class="el-icon-caret-left"></i></span>
				                <span class="control-btn-play"><i class="el-icon-video-play"></i></span>
				                <span class="control-btn-next"><i class="el-icon-caret-right"></i></span>
				            </div>
				        </div> -->
				        <div class="tools-control-speed">
				            <label>播放速度</label>
				            <div class="control-speed">
				                <el-slider v-model="timesSpeed" :step="0.2" :min="0.2" :max="1.5" :marks="marks" show-stops @change="changeSpeed"></el-slider>
				            </div>
				        </div>
				    </div>
				    <!-- <span class="close_btn" @click="closedImgShow"><v-icon name="window-close" scale="1.5"></v-icon></span> -->
				</div>
                <div style="display:flex;">   
                    <div class="img_timeline" style="width:15vw;background-color: #F1F8FF;    border-right: 1px solid rgb(134, 208, 255);">

                        <div class="img_startTime" style="padding:1em;">
                            <div style="display:flex;align-items: center;margin-bottom:.1em">
                                <div style="width:4px;height:15px;background-color:#0879FF;margin-right:.3em"></div>
                                <p style="text-align:center;font-size: 16px;text-align: left;">起报时间</p>
                                
                            </div>
                            
				            <el-date-picker v-model="timeValue" type="datetime" format="yyyy-MM-dd HH:mm:ss" @change="changeDate" size="mini"></el-date-picker>
                        </div>

                        <div class="img_forecastInterval" style="padding:1em;">
                            <div style="display:flex;align-items: center;margin-bottom:.1em">
                                <div style="width:4px;height:15px;background-color:#0879FF;margin-right:.3em"></div>
                                <p style="text-align:center;font-size: 16px;text-align: left;">预报时效间隔</p>
                            </div>
                            
                            <div class="time_interval" style="display:flex;justify-content: left;font-size: 14px;">
                                <p   :class="{'activeSel':imgTime==item}"    style="margin-right:1em;cursor:pointer;width:50px;height:22px;border-radius:2px;text-align:center;border:1px solid #D1D5DD;background-color:white" v-for="(item,index) in imgTimeInterval" :key="index"   @click="getIntervalItem(item)">{{item}}</p>
                            </div>
                        </div>

                        <div class="img_forcecasttime" style="padding:1em;text-align: center;">
                            
                            <div style="display:flex;align-items: center;padding-bottom: .4em;justify-content: left;">
                                <div style="width:4px;height:15px;background-color:#0879FF;margin-right:.3em"></div>
                                <p style="font-size: 16px;text-align: left;padding-right: .5em;">预报时效</p>
                                <div class="show_imgs_timeline" style="">
                                    <div class="hl_title">
                                        <h5>
                                            <span class="timePlayBtn" :class="isPause ? 'img_timePlay' : 'img_timePause'" @click="play"></span>
                                            <label class="title_time_tip">{{timetip}}</label>
                                        </h5>
                                    </div>
                                
                                </div>
                               
                            </div>
                            
                            <transition name="slide-fade" :duration="timesSpeed">
                                <ul style="display:flex;flex-wrap: wrap;margin-left:0em" >
                                    <li  class="forcecastItem"  :class="{'activeSel':imgValid==item.V_RETAIN1_C}"    style="width:26%;list-style:none;padding:.2em;cursor:pointer;border: 1px solid #D1D5DD;border-radius: 2px;margin:.3em;background-color:white" v-for="(item,index) in interval_list" :key="index"   @click="getforcecastItem(item,index)">{{item.V_RETAIN1_C }}</li>
                                </ul>
                            </transition>
                        </div>

                        <!--
                            <transition name="slide-fade" :duration="timesSpeed">
                                <ul id="hTimes" class="hTimes" :style="hTimesStyle">
                                    <li v-for="(imgItem, index) in imgData" :key="index" :style="hTime_liStyle">
                                        <span v-if="imgItem.Datetime" :class="{selected: index === currIndex}" @click="clickHandel(index)">{{
                                            !isFast ? 
                                            (timeTransform_temp.toTimeZone(imgItem.Datetime.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, ''), 8, 'MM/dd hh:mm')) : 
                                            (timeTransform_temp.getAppointHourStr(new Date(timeTransform_temp.toTimeZone(imgItem.Datetime.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, ''), 0, 'yyyy/MM/dd hh:mm:ss')), parseInt(imgItem.VALID), 'MM/dd hh:mm'))}}</span>
                                        <span v-else :class="{selected: index === currIndex}" @click="clickHandel(index)">{{timeTransform_temp.toTimeZone(imgItem.Datetime, 8, 'MM/dd hh:mm')}}</span>
                                    </li>
                                </ul>
                            </transition>
                        -->

                    </div>

                    <div style="width: 80vw;">
                        <div style="display:flex;justify-content: left;background: #F1F8FF;padding: 0.5em;padding-left:2em">
                            <div style="display:flex;align-items: center;" >
                                <p style="font-size: 14px;margin-right:.2em;padding-left:.2em">模式:</p>
                                <div style="display:flex;"> 
                                    <p  :class="{'activeSel':imgModel==item}"    style="margin-left:.5em;cursor:pointer;padding:.4em" v-for="(item,index) in imgModelArr" :key="index"  @click="getImgModel(item)">{{item}}</p>
                                </div>
                                
                            </div>
                            <div style="display:flex;align-items: center;">
                                <p style="font-size: 14px;margin-right:.2em;padding-left:2em">区域:</p>
                                <div style="display:flex;">
                                    <p :class="{'activeSel':imgRegion==item}"  style="margin-left:.5em;cursor:pointer;padding:.4em" v-for="(item,index) in imgRegionArr" :key="index"  @click="getImgRegion(item)">{{item}}</p>
                                </div>
                            </div>
<!--
                            <div style="width: 36px;height: 30.4px;background: #1D8DFF;border-radius: 2px;display:flex;justify-content: center;align-items: center;float:right">
                                <img :src='prepics' alt="" height="14" width="12"/>
                                
                            </div>
                            -->
                            
                        </div>
                        <ol>
                            <li v-for="(imgItem, index) in imgData" :key="index" :class="{show: index === currIndex}">
                                <img v-if="imgItem.FILE_STORAGE_PATH" :src="imgItem.FILE_STORAGE_PATH" alt="数据错误"
                                    style="height: 100%;width: 100%;" />
                                <img v-else :src="$store.state.api.imgBase2+imgItem.FILE_URL" alt=""
                                    style="height: 100%;width: 100%;" />
                            </li>
                        </ol>
                    </div>
                </div>
                
                
            </div>
            

        </div>
    </div>
</template>

<script>
import axios from '../../../assets/js/tools/axios.js';
import timeTransform from '../../../assets/js/tools/timeTransform';
import utils from '../../../assets/js/tools/utils.js';
import { getUpTime } from '../../../assets/js/tools/cron.js';
import { Message } from 'element-ui';
import { startLoading, endLoading } from '../../../config/comsConfig/ele-ui/el-loading.js';
import allMenuData from '../../../../static/data/allMenuData.js'

export default {
	name: "imgShow",
  
	data () {
		return {
            timeTransform_temp: timeTransform,
            isImgShow: false,
            isFast: false,
            timeValue:null,
            timeType: 'datetime',
            imgData: [],
            imgData_copy:[],
            marks: {
                0.2: '0.2s',
                0.4: '0.4s',
                0.6: '0.6s',
                0.8: '0.8s',
                1: '1s',
                1.5: '1.5s'
            },
            timesSpeed: 0.2,
            hl_content_h: 0,
            img_main_h: 0,
            hTimesStyle: {},
            hTime_liStyle: {
                width: '100%',
                height: '50px'
            },
            isNextBtn: true,
            isPrevBtn: true,
            currIndex: 0,
            hoverIndex: 0,
            defaultPositionTimes: 0,
            timer: null,
            scrollTop: 0,
            isPause: true,
            changedate:false,
            timetip: '',
            utcDate: '',
            bjtDate: '',
            allMenuData:allMenuData,
            parentMenu:[],
            localMenuMap:[],
            prevId:'',
            prevSubId:'',
            menuItem:null,
            defaultMenuId:'Nqtx-T00-M02-03',
            defaultId:'Nqtx-T00-M02',
            imgValid:'003',
            imgModel:'ECMWF-HR',
            imgModelArr:['CMA-GFS','ECMWF-HR'],
            imgRegion:'全国',
            imgRegionArr:['全国','北方'],
            imgTimeInterval:['3','6','12','24'],
            imgTime:3,
            firstImgData:{},
            interval_list:[],
            preimgData:[],
            count:0,
            prepics:'../../../../static/img/pre2.png',
            imgModelClick: false


		}
	},
    created: function () {
        this.getMenuData();  
    },
    computed: {
        imgShowDivDom: function() {
            return $('#imgShow');
        },
        sortFutureHrs:function(){
            imgData.forEach((imgItem)=>{
                if(imgItem.Datetime){
                    timeTransform_temp.getAppointDateStr(new Date(timeTransform_temp.toTimeZone(imgItem.Datetime.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, ''), 8, 'yyyy/MM/dd hh:mm:ss')), parseInt(imgItem.V_RETAIN1_C), 'MM/dd hh:mm')
                }
            })
            
        }
    },
    watch: {
        /*
        menuItem: {
            handler(newMenuItem) {
                this.isFast = false;
                this.timeValue = [new Date(timeTransform.getAppointHourStr(new Date(), newMenuItem.delaytime || -24)), new Date()];
                //console.log(newMenuItem);
                if(newMenuItem.type === 'Fast' && newMenuItem.cron) {
                    this.timeType = 'datetime';
                    this.timeValue = getUpTime(new Date(), newMenuItem.cron);
                    this.isFast = true;
                }
					console.info('timeValue',this.timeValue)
                this.getImgData(newMenuItem);
            },
            deep: true
        }
        */
    },
    mounted() {
     
    },
    beforeDestroy: function () {
        if(document.querySelector('#hl_content') != null) document.querySelector('#hl_content').removeEventListener('mousewheel', this.handleScroll) || document.querySelector('#hl_content').removeEventListener('DOMMouseScroll', this.handleScroll);
    },
	methods: {
        toMainNav(id){
            console.log("id....",id,"previd....",this.prevId)
            if(this.prevId){
                document.getElementById('parentMenuName'+this.prevId).style.border="none";
            }
        
            if(document.getElementById(id+"_ul")){
                document.getElementById(id+"_ul").style.cssText="display:block";
                //document.getElementById('parentMenuName'+id).style.borderBottom="2px solid #54c1fc";
            }
             if(this.prevId == id){
                
                //document.getElementById(this.prevId+"_ul").style.display="none"
            }
            

			if(this.prevId!=null &&  document.getElementById(this.prevId+"_ul")){
				//document.getElementById(this.prevId+"_ul").style.cssText="display:none"
			}
            this.highMainlightColor(id);
			this.prevId=id

        },
        toSubNav(ele){
            console.log("ele...............",ele)
            this.highSublightColor(ele.id);
			this.isFast = false;
			this.timeType = 'datetimerange';
			//this.timeValue = [new Date(timeTransform.getAppointHourStr(new Date(), ele.delaytime || -24)), new Date()];
			//console.log(newMenuItem);
            /*
			if(ele.type === 'Fast' && ele.cron) {
			    this.timeType = 'datetime';
			    this.timeValue = getUpTime(new Date(), ele.cron);
			    this.isFast = true;     
			}
            */
            if(ele.type === 'Fast') {
			    this.timeType = 'datetime';
			    //this.timeValue = getUpTime(new Date(), ele.cron);
			    this.isFast = true;    
                console.log("it is fast............") 
			}
			this.menuItem=ele;
			
			this.getImgData(ele);
        },
        getMenuData(){

            this.allMenuData.forEach(ele => {
                if(ele.pid == 'Nqtx-T00'){
                    this.parentMenu.push(ele);
                }

                this.localMenuMap[ele.id]=ele
                
                if(ele.id == this.defaultMenuId){
                    this.menuItem = ele
                }
            })
            

            //this.timeValue = [new Date(timeTransform.getAppointHourStr(new Date(), this.menuItem.delaytime || -24)), new Date()];
            this.init();
            //默认选中
            this.$nextTick(()=>{
                this.toMainNav(this.defaultId)
                this.highSublightColor(this.defaultMenuId);
            })

        },
        /*
        getMenuData(){
            startLoading();

            axios.fetch(this.$store.state.api.menuData+`?id=Nqtx-T00&syscod=Nqtx&manager=`).then((res) => {
           
              this.allMenuData = res.data

              res.data.forEach(ele => {
                if(ele.pid == 'Nqtx-T00'){
                    this.parentMenu.push(ele);
                }
        
                this.localMenuMap[ele.id]=ele
                
                if(ele.id == this.defaultMenuId){
                    this.menuItem = ele
                }

              });
              console.log("this.parentMenu....",this.parentMenu)
              console.log("this.localMenuMap....",this.localMenuMap)
              this.timeValue = [new Date(timeTransform.getAppointHourStr(new Date(), this.menuItem.delaytime || -24)), new Date()];
              this.init();
              //默认选中
              this.$nextTick(()=>{
                this.toMainNav(this.defaultId)
                this.highSublightColor(this.defaultMenuId);
              })
              
              endLoading();
              
            }).catch((e) => {
                console.error(e);
                endLoading();
            });

        },
        */
        highMainlightColor(id){
            console.log("id...",'parentMenuName'+id)
            if(this.prevId){
                document.getElementById(this.prevId).style.backgroundColor = 'transparent';
            }
            this.prevId = id
            setTimeout(() => {
                document.getElementById(id).style.backgroundColor = '#54c1fc';
                //border-bottom: 2px solid rgb(84, 193, 252);
                //document.getElementById('parentMenuName'+id).style.borderBottom = "2px solid rgb(84, 193, 252)"
            }, 1000);
            
        },
        highSublightColor(id){
     
            if(this.prevSubId){
                document.getElementById(this.prevSubId).style.backgroundColor = 'transparent'
            }
          
            this.prevSubId = id
            setTimeout(()=>{
                //document.getElementById(id).style.backgroundColor = '#54c1fc'
                document.getElementById(id).style.color = '#0072F9'
            },500)
            
			
        },
        /*
        init() {
            console.log("init...")
            this.setCss();
            // 判断是否为预报
            this.isFast = false;
            if(this.menuItem.type === 'Fast' && this.menuItem.cron) {
                this.timeType = 'datetime';
                this.timeValue = getUpTime(new Date(), this.menuItem.cron);
                this.isFast = true;
            }
            this.getImgData(this.menuItem);

            document.querySelector('#hl_content').addEventListener('mousewheel', this.handleScroll, true) || document.querySelector('#hl_content').addEventListener("DOMMouseScroll", this.handleScroll, false);
        },
        
        */
        init() {
            console.log("init...")
            this.setCss();
            // 判断是否为预报
            this.isFast = false;
            if(this.menuItem.type === 'Fast') {
                this.timeType = 'datetime';
                //this.timeValue = getUpTime(new Date(), this.menuItem.cron);
                this.isFast = true;
            }
            this.getImgData(this.menuItem);
            console.log()
            /*
            setTimeout(()=>{
                console.log("document.querySelector('#hl_content')....",document.querySelector('#hl_content'))
                document.querySelector('#hl_content').addEventListener('mousewheel', this.handleScroll, true) || document.querySelector('#hl_content').addEventListener("DOMMouseScroll", this.handleScroll, false);
            },0.0001)
            */
            
            
        },
        /*
        getImgData(menuItem) {
            let { id, dataCode, name, subtitle, legend, timetype, element, supertype } = menuItem;
            let params = { confId: id, element: element };
            startLoading();
            if(this.isFast) {
                params.time = `${this.timeTransform_temp.getAppointHourStr(this.timeValue, -8, 'yyyyMMddhhmmss')}`;
            } else {
                params.timeRange = `(${this.timeTransform_temp.getAppointHourStr(this.timeValue[0], -8, 'yyyyMMddhhmmss')},${this.timeTransform_temp.getAppointHourStr(this.timeValue[1], -8 , 'yyyyMMddhhmmss')})`;
            }

            utils.getData(this.$store.state.api.subMenuDetail, params).then((data) => {
                console.log("data.....",data)
                this.isImgShow = true;
                if (data && data.RespData && data.RespData.DS && data.RespData.DS.length) {

                    this.imgData = data.RespData.DS

                    if(data.RespData.DS[0].hasOwnProperty('Valid')){
                        this.imgData.sort((a,b)=>{
                            return a.Valid - b.Valid
                        })
                        console.log("this.imgData...",this.imgData)
                    }

                    this.setHtml(data.RespData.DS);
                } else {
                    //this.isImgShow = false;
                    this.imgData=[];
					endLoading();
                    Message({
                        message: '暂无数据!',
                        type: 'warning'
                    });
                }
            });
        },
        */
        getImgData(menuItem) {

            //this.timeValue=year+month+date+min+sec
            this.imgValid = '003'
            //this.imgTime = '3'
            let {
                id,
                dataCode,
                name,
                subtitle,
                legend,
                timetype,
                element,
                supertype,
                intid,
                eleValueRanges
            } = menuItem;
            let params = {
                dataCode: dataCode,
                interfaceId: intid,
                eleValueRanges: eleValueRanges,
                //elements: "ELE_CODE,Datetime,File_URL,AREA,VALID,RETAIN3"
                elements: "PRODUCT_CODE,REGION_CODE,PRODUCT_ELEMENT,HEIGHT,V_RETAIN1_C"
            };


            console.log("name.....", name)
            if (this.imgRegion == '全国') {
                params.eleValueRanges = params.eleValueRanges.replace('BF', 'CHN');
            }
            if (this.imgRegion == '北方') {
                params.eleValueRanges = params.eleValueRanges.replace('CHN', 'BF');
            }
            console.log("this.imgModel...", this.imgModel)

            
            if(this.imgModelClick){
                if (this.imgModel == 'CMA-GFS') {
                params.eleValueRanges = params.eleValueRanges.replace('ECMWF', 'GFS');
            }
                if (this.imgModel == 'ECMWF-HR') {
                    if(params.name == "850hPa温度场" || params.name == "10米平均风速" || params.name == "10米阵风"){
                    	params.eleValueRanges = params.eleValueRanges.replace('GFS', 'ECMFC3Y');
                    }
                    else{
                        params.eleValueRanges = params.eleValueRanges.replace('GFS', 'ECMWF');
                    }
                    
                }
            }
            

            if (this.isFast) {
                //params.time = `${this.timeTransform_temp.getAppointHourStr(this.timeValue, -8, 'yyyyMMddhhmmss')}`;
            } else {
                //params.timeRange = `(${this.timeTransform_temp.getAppointHourStr(this.timeValue[0], -8, 'yyyyMMddhhmmss')},${this.timeTransform_temp.getAppointHourStr(this.timeValue[1], -8 , 'yyyyMMddhhmmss')})`;
            }
            /*
            if(menuItem.type=='Fast'){
                this.isFast=true
            }else{
                this.isFast=false
            }
            */

            startLoading();
            if (this.changedate) {
                console.log("this.timeValue....", this.timeValue)
                var year = this.timeValue.getFullYear().toString()
                var month = (this.timeValue.getMonth() + 1).toString()
                var date = this.timeValue.getDate().toString()
                var hrs = this.timeValue.getHours().toString()
                var min = this.timeValue.getMinutes().toString()
                var sec = this.timeValue.getSeconds().toString()

                this.timeValue.getMonth().toString().length == 1 ? month = "0" + month : month = this.timeValue
                    .getMonth().toString()
                this.timeValue.getDate().toString().length == 1 ? date = "0" + date : date = this.timeValue.getDate()
                    .toString()
                this.timeValue.getHours().toString().length == 1 ? hrs = "0" + hrs : hrs = this.timeValue.getHours()
                    .toString()
                this.timeValue.getMinutes().toString().length == 1 ? min = "0" + min : min = this.timeValue
                .getMinutes().toString()
                this.timeValue.getSeconds().toString().length == 1 ? sec = "0" + sec : sec = this.timeValue
                .getSeconds().toString()

                params.times = year + month + date + hrs + min + sec;
                console.log(params.times)
            } else {
                //params.timeRange = `(${this.timeTransform_temp.getAppointHourStr(this.timeValue[0], -8, 'yyyyMMddhhmmss')},${this.timeTransform_temp.getAppointHourStr(this.timeValue[1], -8 , 'yyyyMMddhhmmss')})`;
                params.times = 20230427000000
                this.timeValue = '2023-04-27 00:00:00'
                //params.times = 20230110000000
                //this.timeValue = '2023-01-10 00:00:00'
            }

            //重组请求格式
            params.interfaceId = "getSevpFileByTime"
            params.dataCode = "CHN_EMM_NMC_SAND_IMG"
            //params.eleValueRanges = `REGION_CODE:CHN;PRODUCT_ELEMENT:VOAD`
            console.log("params....", params)
            // http://10.40.23.74:7890/proxy/getMusicData?interfaceId=getSevpFileByTime&dataCode=CHN_EMM_NMC_SAND_IMG&times=20230418120000&eleValueRanges=REGION_CODE:CHN%3BPRODUCT_ELEMENT:VOAD&elements=PRODUCT_CODE,REGION_CODE,PRODUCT_ELEMENT
            // utils.getData(`${this.$store.state.api.subMenuDetail2}/downUdi/getFileByTime`, params).then((data) => {
            utils.getData(`${this.$store.state.api.subMenuDetail2}/proxy/getMusicData`, params).then((data) => {	

                console.log("data.....", data)
                this.isImgShow = true;
                if (data && data.RespData.DS && data.RespData.DS.length) {

                    this.imgData = data.RespData.DS
                    this.firstImgData = data.RespData.DS[0]
                    //this.timeValue = this.firstImgData.Datetime
                    this.imgData_copy = this.imgData
                    this.interval_list = this.imgData

                    if (data.RespData.DS[0].hasOwnProperty('V_RETAIN1_C')) {
                        
                        this.imgData.sort((a, b) => {

                            return parseInt(a.V_RETAIN1_C) - parseInt(b.V_RETAIN1_C)
                        })
                        this.imgData_copy.sort((a, b) => {
                            return parseInt(a.V_RETAIN1_C) - parseInt(b.V_RETAIN1_C)
                        })
                    }

                    this.setHtml(data.DS);
                } else {
                    //this.isImgShow = false;
                    this.imgData = [];
                    this.imgData_copy = [];
                    this.interval_list = [];
                    endLoading();
                    Message({
                        message: '暂无数据!',
                        type: 'warning'
                    });
                }
            });

        },
        setCss() {
            this.imgShowDivDom.css({top: '46px', left: $('#leftMenu').width(), width: document.body.offsetWidth - $('#leftMenu').width(), height: document.body.offsetHeight - 46});
            this.img_main_h = $('.img_show').height() - 53;
            this.hl_content_h = this.img_main_h - 55;
        },
        setHtml(data) {
           // this.imgData = data;
           
            const howManyTimes = data.length,
                  heightTime = parseInt(this.hTime_liStyle.height);
            this.hTimesStyle = {
                'height': heightTime * howManyTimes + 'px',
                'margin-top': this.hl_content_h / 6 - heightTime / 0.5 + 'px'
            }
            this.defaultPositionTimes = parseInt(this.hTimesStyle['margin-top']);

            // 判断所有图片加载完成
            let i = 0, count = data.length;
            this.$nextTick(() => {
                $('.show_imgs_box li').each(function() {
                    document.querySelector('img')
                    
                    
                    $(this).find('img').on("load",function() {
                        i++;
                        if(i === count) endLoading();
                    })
                    
                    /*
                    .error(function() {
                        i++;
                        $(this).prop('src', '');
                        if(i === count) endLoading();
                    });
                    */
                    
                });
            });

            // 初始化默认点击
            this.clickHandel(0);
        },
        clickHandel(index) {
            /*
            if(index === 0) {
                this.isNextBtn = true;
                this.isPrevBtn = false;
            } else if(index === this.imgData.length - 1) {
                this.isNextBtn = false;
                this.isPrevBtn = true;
            } else {
                this.isNextBtn = this.isPrevBtn = true;
            }

            $('.hTimes').animate({'marginTop': this.defaultPositionTimes - (parseInt(this.hTime_liStyle.height) * index)}, {queue: false, duration: this.levelsSpeed});
            this.hTimesStyle['margin-top'] = this.defaultPositionTimes - (parseInt(this.hTime_liStyle.height) * index);

            this.hoverIndex = this.currIndex = index;
            let time = null;
            */
            /*
            if(this.isFast) {
                time = this.timeTransform_temp.getAppointHourStr(new Date(this.timeTransform_temp.toTimeZone(this.imgData[index].D_DATETIME.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, ''), 0, 'yyyy/MM/dd hh:mm:ss')), parseInt(this.imgData[index].PREDICTION_TIMELINESS), 'yyyyMMddhhmmss');
            } else {
                time = this.imgData[index].D_DATETIME ? this.imgData[index].D_DATETIME.replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '') : this.imgData[index].Datetime;
            }

            this.timetip = this.timeTransform_temp.toTimeZone(time, 8, 'yyyy-MM-dd'),
            this.utcDate = this.timeTransform_temp.toTimeZone(time, 0, 'yyyy-MM-dd hh:mm'),
            this.bjtDate = this.timeTransform_temp.toTimeZone(time, 8, 'yyyy-MM-dd hh:mm');
            */
        },
        nextHandel() {
            if (this.currIndex < this.imgData.length - 1) {
                this.clickHandel(++this.currIndex);
            }
        },
        prevHandel() {
            if (this.currIndex <= 0) return false;
            this.clickHandel(--this.currIndex);
        },
        playTimer() {
           
            if(this.isFast) {
                if(this.count == this.imgData.length) {
                    clearInterval(this.timer);
                    this.isPause = true;
                    return false;
                }
                //this.clickHandel(++this.currIndex);
                //currIndex
                if(parseInt(this.imgData[this.count].V_RETAIN1_C)%this.imgTime==0){
                    this.currIndex=this.count
                    this.imgValid=this.imgData[this.currIndex].V_RETAIN1_C
                }
                this.count+=1
                
/*
                this.imgData.forEach((elem,indx)=>{
                    if(parseInt(elem.VALID)%this.imgTime==0){
                        console.log()
                        this.currIndex=indx
                    }
                })
                */
            } 
            
            /*else {
                if(this.currIndex == 0) {
                    clearInterval(this.timer);
                    this.isPause = true;
                    return false;
                }
                this.clickHandel(--this.currIndex);
            }
            */
        },
        play() {
            
            clearInterval(this.timer);
            if (this.isPause) {
                this.count = (this.isFast ? 0 : this.imgData.length);
                this.timer = setInterval(this.playTimer, this.timesSpeed * 1000);
                this.isPause = false;
            } else {
                this.isPause = true;
            }
            
        },
       
        changeSpeed() {
            clearInterval(this.timer);
            this.timer = setInterval(this.playTimer, this.timesSpeed * 1000);
        },
        changeDate() {
            console.log("timeValue",this.timeValue)
            if(this.timeValue==null){
                return
            }
            this.changedate = true;
            this.getImgData(this.menuItem);
        },
        handleScroll(e) {
            if (e.deltaY > 0) {
                if (this.hoverIndex < this.imgData.length - 1) ++this.hoverIndex;
            } else {
                if (this.hoverIndex > 0) --this.hoverIndex;
            }
            $('.hTimes').animate({'marginTop': this.defaultPositionTimes - (parseInt(this.hTime_liStyle.height) * this.hoverIndex)}, {queue: false, duration: this.timesSpeed});
            this.hTimesStyle['margin-top'] = this.defaultPositionTimes - (parseInt(this.hTime_liStyle.height) * this.hoverIndex);
        },
        getforcecastItem(item,index){
    
            this.imgData.forEach((elem,indx)=>{
                if(parseInt(elem.V_RETAIN1_C)==item.V_RETAIN1_C){
                    this.currIndex=indx
                }
            })
            this.imgValid = item.V_RETAIN1_C
        },
        getImgModel(item){
            this.imgModel = item
            this.imgModelClick = true
            this.getImgData(this.menuItem);
        },
        getImgRegion(item){
            this.imgRegion = item
            this.getImgData(this.menuItem);
        },
        getIntervalItem(item){
            this.imgTime = item
            this.interval_list = this.imgData.filter((elem)=>{
                return parseInt(elem.V_RETAIN1_C)%item==0
            })
           
        }
	}
}
</script>

<style scoped lang="less">
.tab04f1-date-picker{
    position: absolute!important;
    left:0!important;
    top: 40px!important;
}
.parentMenuName{
    padding:.6em
}
.parentMenuContainer:hover{
    background-color:#54c1fc;
    
}
.parentMenuContainer{
    border-bottom: 1px solid #F1F8FF;
    border-top: 1px solid #F1F8FF;
}
.forcecastItem:hover{
    background-color: #54c1fc;
    
}

.subli{
    margin-left:0em;  
}
.subMenuItem{
    padding-left: 1.2em;
    margin-top: .1em;
}
.subMenuItem:hover{
    //background-color:#54c1fc
    color:#0072F9
}
.parentListMenu{
 
}
#imgShow{

    background-color: white;
}
p {
    padding: 0;
    margin: 0;
    line-height: 20px;
}
.img_show {
    margin-top: 1em;
    background-color: #0B355F;
    padding:0 18em;
    z-index: 6;
}
.img_show_header {
    height: 62px;
    padding: 5px 10px;
    border-bottom: 1px solid #125193;
    line-height: 30px;
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 14px;
    .startTimeTip {
        margin-right: 5px;
    }
    .close_btn {
        position: absolute;
        top: 10px;
        right: 5px;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
    }
    > div {
        margin: 0 5px;
        border-right: 1px solid #125193;
        padding-right: 5px;
        &:last-of-type  {
            border-right: none;
        }
    }
    .img_info_time_box {
        display: flex;
        p {
            font-family: monospace;
        }
        label {
            line-height: 35px;
        }
    }
    .img_show_tools {
        display: flex;
        line-height: 35px;
        .tools-control-btn {
            display: flex;
        }
        .tools-control-btns {
            font-size: 26px;
            span {
                cursor: pointer;
            }
        }
    }
    .tools-control-speed {
        display: flex;
        width: 280px;
        label {
            width: 70px;
        }
        .control-speed {
            width: 180px;
        }
    }
    .img_show_date {
        display: flex;
    }
}
.img_show_main {
    display: flex;
    width: 100%;
    height: 95%;
    justify-content: space-between;
    .show_imgs_box {
        width: 85%;
        height: 100%;
        border: 1px solid rgb(134, 208, 255);
        margin-left:.6em;
        ol {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 80vh;
            max-width: 1100px;
            margin: 0 auto;
            position: relative;
            li {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                width: 100%;
                height: 100%;
                text-align: center;
                img {
                    display: inline-block;
                    width: auto;
                    max-width: 100%;
                    max-height: 95%;
                }
                &.show {
                    opacity: 1;
                }
            }
        }
    }
    .show_imgs_timeline {
        width: 15%;
        height: 100%;
        max-width: 250px;
        .hl_title {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            background-color:rgb(25, 137, 250,.5);
            h5 {
                margin: 0;
                padding: 0;
            }
            .timePlayBtn {
                width: 16px;
                height: 12px;
                display: inline-block;
                cursor: pointer;
                &.img_timePlay {
                    &::after {
                    content: '';
                    border-left: 10px solid #fab27b;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    display: inline-block;
                    vertical-align: -3px;
                    margin-right: 5px;
                }
                }
                &.img_timePause {
                    &::after,
                    &::before {
                        content: '';
                        width: 4px;
                        height: 12px;
                        margin-top: 2px;
                        background-color: #fab27b;
                        display: inline-block;
                    }
                    &::after {
                        float: right;
                        margin-right: 2px;
                    }
                    &::before {
                        float: left;
                        margin-left: 2px;
                    }
                }
            }
        }
        .hl_content {
            position: relative;
            width: 100%;
            height: 90%;
            background: url('../../../../static/img/hLevels/dot.gif') 3px top repeat-y;
            overflow: hidden;
        }
        .grad_top,
        .grad_bottom {
            width: 100%;
            height: 80px;
            position: absolute;
        }
        .grad_top {
            top: 0;
        }
        .grad_bottom {
            bottom: -1px;
        }
        .hNext,
        .hPrev {
            position: absolute;
            left: 50%;
            font-size: 70px;
            width: 38px;
            height: 22px;
            margin-left: -22px;
            background-position: 0 -44px;
            background-repeat: no-repeat;
            text-indent: -9999px;
            overflow: hidden;
            &:hover {
                background-position:  0 0;
            }
            &.disabled {
                opacity: 0.2;
            }
        }
        .hNext {
            bottom: 0;
            background-image: url('../../../../static/img/hLevels/next_v.png');
        }
        .hPrev {
            top: 0;
            background-image: url('../../../../static/img/hLevels/prev_v.png');
        }
        .hTimes {
            width: 100%;
            height: 400px;
            overflow: hidden;
            float: left;
            li {
                list-style: none;
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                padding-left: 10px;
                background: url('../../../../static/img/hLevels/biggerdot.png') left center no-repeat;
                span {
                    line-height: 38px;
                    padding-bottom: 10px;
                    color: #fab27b;
                    cursor: pointer;
                    &.selected {
                        font-size: 20px;
                    }
                }
            }
        }
    }
}

.activeSel{
   
    border-image: linear-gradient(0deg, #0070F0, #62DFFF) 10 10;
    background: linear-gradient(0deg, #0576FF 0%, #2C9BFF 100%);
    box-shadow: 0px 1px 6px 0px rgba(20,75,157,0.4);
    border-radius: 2px;
    color:white
}
.activeSel2{
    background-color: #54c1fc;
}


</style>
