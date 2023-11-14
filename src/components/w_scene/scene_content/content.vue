<template>
    <div class="scene-content">
         <div class="scene-left" >

            <div style=" border: 1px solid rgb(134, 208, 255);border-right: none; height: 97%;padding-top: 1em;    background-color: rgb(241, 248, 255);" >
<!--
                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>年份:</b></p>
                    <el-date-picker v-model="year1Val" size="mini" type="year" style="width:100px"></el-date-picker>
                    <span style="margin-left:.4em;margin-right:.4em">-</span>
                    <el-date-picker v-model="year2Val" size="mini" type="year" style="width:100px"></el-date-picker>
                </div>
-->
                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>日期范围:</b></p>
                    <el-date-picker v-model="month1Val" size="mini"  style="width:130px" @change="changeDate"></el-date-picker>
                    <span style="margin-left:.4em;margin-right:.4em">-</span>
                    <el-date-picker v-model="month2Val" size="mini" style="width:130px" @change="changeDate2"></el-date-picker>
                </div>

                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>过程类型:</b></p>
                    <el-select v-model="process" placeholder="请选择" >
                        <el-option
                            v-for="item in processSandOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>影响省份:</b></p>
                    <el-select v-model="sheng" placeholder="请选择" >
                        <el-option
                            v-for="item in shengOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>影响时长:</b></p>
                    <el-input style="width:217px" v-model="duration"></el-input>
                </div>
                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>影响系统:</b></p>
                    <el-select v-model="system" placeholder="请选择" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div style="padding-left: 1.4em;margin-top:4em;display:flex">
                    <el-button @click="getCurve">按过程对比</el-button>
                    <el-button @click="getCharts">分指数对比</el-button>
                </div>
                

            </div>


         </div>
         <div class="scene-right" style="border: 1px solid rgb(134, 208, 255)">
            <div style="padding-top: .8em;">
                <div class="upper-content">
                    <div id="echartsMangt"    v-if="showCharts"></div>
                    <div id="echartsCurve"    v-if="showCurve"></div>


                </div>
                <div class="lower-content">

                    <elTableComp v-if="showEchartTable" :allRespData="allRespData"></elTableComp>

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
import { startLoading, endLoading } from '../../../config/comsConfig/ele-ui/el-loading.js';
 import * as echarts from 'echarts';
 import elTableComp from './mainContent/elTableComp';
 
 export default {
     name: 'indexHeader',
     data() {
         return{
            mychart:null,
            mychart2:null,
            leftChartMenu:[{'Name':'年份',"Category":'calendar','Type':'year'},{'Name':'月份',"Category":'calendar','Type':'month'},{'Name':'过程类型','Category':'SelectBox','vModel':'process'},{'Name':'影响省份','Category':'SelectBox','vModel':'sheng'},{'Name':'影响时长','Category':'SelectBox','vModel':'duration'},{'Name':'影响系统','Category':'SelectBox','vModel':'system'}],
            options: [],
            shengOptions:[
                {
                    value: '1',
                    label: '江苏省'
                    }, {
                    value: '2',
                    label: '浙江省'
                    }, {
                    value: '3',
                    label: '黑龙江省'
                    }, {
                    value: '4',
                    label: '宁夏省'
                    }, {
                    value: '5',
                    label: '广东省'
                }, {
                    value: '6',
                    label: '广西省'
                }, {
                    value: '7',
                    label: '河北省'
                }, {
                    value: '8',
                    label: '贵州省'
                }, {
                    value: '9',
                    label: '辽宁省'
                },
                {
                    value: '10',
                    label: '吉林省'
                },
                {
                    value: '11',
                    label: '安徽省'
                }, {
                    value: '12',
                    label: '福建省'
                }, {
                    value: '13',
                    label: '江西省'
                }, {
                    value: '14',
                    label: '山西省'
                }, {
                    value: '15',
                    label: '山东省'
                },
                {
                    value: '16',
                    label: '河南省'
                },
                {
                    value: '17',
                    label: '湖北省'
                },
                {
                    value: '18',
                    label: '湖南省'
                },
                {
                    value: '19',
                    label: '四川省'
                },
                {
                    value: '20',
                    label: '云南省'
                },
                
                {
                    value: '21',
                    label: '陕西省'
                },
                {
                    value: '22',
                    label: '甘肃省'
                },
                
                {
                    value: '23',
                    label: '青海省'
                },
                
                {
                    value: '24',
                    label: '内蒙古'
                },
                {
                    value: '25',
                    label: '西藏'
                },
                {
                    value: '26',
                    label: '新疆'
                },
                
            ],
            processSandOptions:[
                {
                    value: '1',
                    label: '扬沙'
                    }, {
                    value: '2',
                    label: '沙尘'
                    }, {
                    value: '3',
                    label: '沙尘暴'
                }
            ],
            optionValue:'',
            process:'',
            system:'',
            sheng:'',
            duration:'',
            year1Val:'',
            year2Val:'',
            month1Val:'2023-03-25',
            month2Val:'2023-04-25',
            showCurve:false,
            showCharts:true,
            showEchartTable:true,
            allRespData:[],
            allStartTime:['0221-0222', '0302-0302', '0308-0308', '0314-0314', '0327-0329', '0331-0401', '0415-0415','0427-0429','0430-0430','0505-0505','0510-0510','0517-0517','0531-0531','0609-0610','0815-0816'],
            allINDEX_ALL:[4.5,1.12,0.95,1.5,5.4,12.78,2.25,18.97,1.4,1.38,1.61,1.05,1.05,3.04,2.99],
            allINDEX_AREA:[2.69, 1.28, 0.96, 1.84, 2.77, 6.71, 2.61,6.96,1.82,1.48,1.66,1.37,1.26,1.58,1.81],
            allINDEX_INTENSITY:[1.48,1.35,1.43,1.25,1.16,1.78,1.51,1.77,1.3,1.66,1.67,1.39,1.49,1.75,1.49],
            allINDEX_TIME:[1.13,0.65,0.69,0.65,1.68,1.07,0.57,1.54,0.59,0.56,0.58,0.55,0.56,1.1,1.11],
            formatMonth1:"20230325000000",
            formatMonth2:"20230425000000"

        }
     },
     components:{
        elTableComp
     },
     computed: {
        
     },
     created () {
     },
     mounted(){
         //this.initEcharts()
         this.getImgData()
     },
     methods: {
        initEchartsCurve(){

            var eCharts = document.querySelector('#echartsCurve')
            var myChart = echarts.init(eCharts);
            
            this.mychart2 = myChart;

            var option = {
                title: {
                    text: '沙尘个例对比分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['沙尘过程强度综合指数', '沙尘过程影响面积指数', '沙尘过程站点强度指数', '沙尘过程持续时长指数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                    saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data:  this.allStartTime, //['0221-0222', '0302-0302', '0308-0308', '0314-0314', '0327-0329', '0331-0401', '0415-0415','0427-0429','0430-0430','0505-0505','0510-0510','0517-0517','0531-0531','0609-0610','0815-0816'],
                    axisLabel: {
                        
                    }
                    
                },
                yAxis: {
                    type: 'value'
                },
               // allStartTime:[],
           // allINDEX_ALL:[],
            //allINDEX_AREA:[],
            //allINDEX_INTENSITY:[],
            //allINDEX_TIME:[]
                series: [
                    {
                    name: '沙尘过程强度综合指数',
                    type: 'line',
                    stack: 'Total',
                    data:  this.allINDEX_ALL  //[4.5, 1.12, 0.95, 1.5, 5.4, 12.78, 2.25,18.97,1.4,1.38,1.61,1.05,1.05,3.04,2.99]
                    },
                    {
                    name: '沙尘过程影响面积指数',
                    type: 'line',
                    stack: 'Total',
                    data:  this.allINDEX_AREA //[2.69, 1.28, 0.96, 1.84, 2.77, 6.71, 2.61,6.96,1.82,1.48,1.66,1.37,1.26,1.58,1.81]
                    },
                    {
                    name: '沙尘过程站点强度指数',
                    type: 'line',
                    stack: 'Total',
                    data:  this.allINDEX_INTENSITY //[1.48,1.35,1.43,1.25,1.16,1.78,1.51,1.77,1.3,1.66,1.67,1.39,1.49,1.75,1.49]
                    },
                    {
                    name: '沙尘过程持续时长指数',
                    type: 'line',
                    stack: 'Total',
                    data: this.allINDEX_TIME //[1.13,0.65,0.69,0.65,1.68,1.07,0.57,1.54,0.59,0.56,0.58,0.55,0.56,1.1,1.11]
                    },
                   
                ]
            };

            option && myChart.setOption(option);
    
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },
        initEcharts(){

            var eCharts = document.querySelector('#echartsMangt')
            var myChart = echarts.init(eCharts);
            
            this.mychart = myChart;
            
            const dataAll = [
                this.allINDEX_ALL,//[4.5,1.12,0.95,1.5,5.4,12.78,2.25,18.97,1.4,1.38,1.61,1.05,1.05,3.04,2.99],
                this.allINDEX_AREA,//[2.69,1.28,0.96,1.84,2.77,6.71,2.61,6.96,1.82,1.48,1.66,1.37,1.26,1.58,1.81],
                this.allINDEX_INTENSITY,//[1.48,1.35,1.43,1.25,1.16,1.78,1.51,1.77,1.3,1.66,1.67,1.39,1.49,1.75,1.49],
                this.allINDEX_TIME,//[1.13,0.65,0.69,0.65,1.68,1.07,0.57,1.54,0.59,0.56,0.58,0.55,0.56,1.1,1.11]
            ];
            const markLineOpt = {
            animation: false,
            label: {
                align: 'right'
            },
            lineStyle: {
                type: 'solid'
            },
            tooltip: {
            },
            data: [
                [
                {
                    coord: [0, 3],
                    symbol: 'none'
                },
                {
                    coord: [20, 13],
                    symbol: 'none'
                }
                ]
            ]
            };
            var option = {
            title: [
                {
                text: '沙尘过程强度综合指数',
                textAlign: 'center',
                left: '25%',
              
                top: '0%',
                textStyle: {
                        fontSize:'14px',
                        color:"black"
                    }
                },
                {
                text: '沙尘过程影响面积指数',
                textAlign: 'center',
                left: '75%',
                top: '0%',
                textStyle: {
                        fontSize:'14px',
                        color:"black"
                    }
                
                },
                {
                text: '沙尘过程站点强度指数',
                textAlign: 'center',
                left: '25%',
                top: '50.5%',
                textStyle: {
                        fontSize:'14px',
                        color:"black"
                    }
                },
                {
                text: '沙尘过程持续时长指数',
                textAlign: 'center',
                left: '75%',
                top: '50.5%',
                textStyle: {
                        fontSize:'14px',
                        color:"black"
                    }
                },
            ],
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            grid: [
                { left: '7%', top: '16%', width: '38%', height: '25%' },
                { right: '7%', top: '16%', width: '38%', height: '25%' },
                { left: '7%', bottom: '9%', width: '38%', height: '25%' },
                { right: '7%', bottom: '9%', width: '38%', height: '25%' }
            ],
            tooltip: {
                formatter: 'Group {a}: ({c})'
            },
            xAxis: [
                /*
                { gridIndex: 0, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 1, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 2, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 3, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']}
                */
                //allStartTime
                { gridIndex: 0, type: 'category',data: this.allStartTime, axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 1, type: 'category',data: this.allStartTime, axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 2, type: 'category',data: this.allStartTime, axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 3, type: 'category',data: this.allStartTime, axisLabel:{textStyle:{color:"black"}}}
            ],
            yAxis: [
                { gridIndex: 0, type: 'value', axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 1, type: 'value', axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 2, type: 'value', axisLabel:{textStyle:{color:"black"}}},
                { gridIndex: 3, type: 'value', axisLabel:{textStyle:{color:"black"}} }
            ],
            series: [
                {
                name: 'I',
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: '30%',
                itemStyle: {
                    color: '#0034FF'
                },
                data: dataAll[0],
                markPoint: {
                    data: [
                    { type: 'max', name: 'Max' ,itemStyle: {color: '#FF6600'}},
                    { type: 'min', name: 'Min' ,itemStyle: {color: '#00FF00'}}
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' ,itemStyle: {color: '#0033CC'}}]
                }
                },
                {
                name: 'II',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                barWidth: '30%',
                itemStyle: {
                    color: '#0034FF'
                },
                data: dataAll[1],
                markPoint: {
                    data: [
                    { type: 'max', name: 'Max' ,itemStyle: {color: '#FF6600'}},
                    { type: 'min', name: 'Min' ,itemStyle: {color: '#00FF00'}}
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' ,itemStyle: {color: '#0033CC'}}]
                }
                },
                {
                name: 'III',
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                barWidth: '30%',
                itemStyle: {
                    color: '#0034FF'
                },
                data: dataAll[2],
                markPoint: {
                    data: [
                    { type: 'max', name: 'Max' ,itemStyle: {color: '#FF6600'}},
                    { type: 'min', name: 'Min' ,itemStyle: {color: '#00FF00'}}
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' ,itemStyle: {color: '#0033CC'}}]
                }
                },
                {
                name: 'IV',
                type: 'bar',
                xAxisIndex: 3,
                yAxisIndex: 3,
                barWidth: '30%',
                itemStyle: {
                    color: '#0034FF'
                },
                data: dataAll[3],
                markPoint: {
                    data: [
                    { type: 'max', name: 'Max' ,itemStyle: {color: '#FF6600'}},
                    { type: 'min', name: 'Min' ,itemStyle: {color: '#00FF00'}}
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' ,itemStyle: {color: '#0033CC'}}]
                }
                }
            ]
            };

            option && myChart.setOption(option);
    
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },
        getCurve(){
            if(this.mychart2){
                this.mychart2.dispose()
            }
           
           if(this.mychart){
                this.mychart.dispose()
            }
           
           this.$nextTick(()=>{
                this.getImgData()
                this.showCurve=true
                this.showCharts=false
                //this.initEchartsCurve()
           })
           
        },
        getCharts(){

            this.mychart.dispose()

            if(this.mychart2){
                this.mychart2.dispose()
            }
            
           this.$nextTick(()=>{ 
                this.getImgData()
                this.showCurve=false
                this.showCharts=true
                //this.initEcharts()
           })

           
        },
        changeDate(val) {

            this.formatMonth1 = this.formateDate(val)
            //this.month1Val
            //this.month2Val
        },
        changeDate2(val) {

            this.formatMonth2 = this.formateDate(val)

        },
        formateDate(val) {
            //(20230325000000,20230425010000)
            console.log("val...", val)
            
            var year = new Date(val).getFullYear().toString()
            var month = (new Date(val).getMonth() + 1).toString()
            var date = new Date(val).getDate().toString()

            month.length == 1 ? month = "0" + month : month = month   
            date.length == 1 ? date = "0" + date : date = date

            return year+month+date+"000000"
            //this.formatMonth1 = year+month+date+"000000"
            //this.formatMonth2 = year+month+date+"000000"
               
            //this.month1Val = year+month+date+"000000"
            //this.month2Val = year+month+date+"000000"

        },
        getImgData() {

            //this.month1Val
 
            let params = {
                dataCode: "SEVP_NMC_SAND_CASESUMMARY",
                interfaceId: "getSevpEleByTimeRange",
                //eleValueRanges: `V_RETAIN1_C:${this.process};EFFECT_PROVS:${this.sheng}`,
                elements: "UPDATE_TIME,RYMDHM,DATA_ID,IYMDHM,Datetime,Station_Id_C,Lat,Lon,Year,Mon,Day,Hour,Min,Second,RETAIN1_C,V_RETAIN2_C,RETAIN3_C,CASE_ID,START_TIME,END_TIME,CASE_DESC,EFFECT_SYS,INDEX_AREA,INDEX_TIME,INDEX_INTENSITY,INDEX_ALL,EFFECT_PROVS",
                //timeRange: `(20230325000000,20230425010000)`
                timeRange: `(${this.formatMonth1},${this.formatMonth2})`
            };

            if(this.process){
                params.eleValueRanges = `V_RETAIN1_C:${this.process}`
                if(this.process && this.sheng){
                    params.eleValueRanges = `V_RETAIN1_C:${this.process};EFFECT_PROVS:${this.sheng}`
                }
            }
            

            startLoading();
           
            console.log("params....", params)
    
            utils.getData(`${this.$store.state.api.subMenuDetail2}/proxy/getMusicData`, params).then((data) => {	
                if(data.RespData){
                    
                    this.allStartTime = []
                    this.allRespData = []
                    this.allINDEX_ALL = []
                    this.allINDEX_AREA = []
                    this.allINDEX_INTENSITY = []
                    this.allINDEX_TIME = []

                    console.log("data.....", data)
                    var allData = data.RespData.DS
                    this.allRespData = allData

                    allData.forEach( (elem) => {

                        //this.allStartTime.push(elem['START_TIME'])
                        this.allStartTime.push(elem['START_TIME'].substr(5,elem['START_TIME'].length-1).replace('-','')+"-"+elem['END_TIME'].substr(5,elem['END_TIME'].length-1).replace('-',''))
                        this.allINDEX_ALL.push(elem['INDEX_ALL'])
                        this.allINDEX_AREA.push(elem['INDEX_AREA'])
                        this.allINDEX_INTENSITY.push(elem['INDEX_INTENSITY'])
                        this.allINDEX_TIME.push(elem['INDEX_TIME'])
                    })
                
                    if(this.showCharts){
                        this.initEcharts()
                    }
                    if(this.showCurve){
                        this.initEchartsCurve()
                    }
                    
                }
            
                else {
                
                    endLoading();
                    Message({
                        message: '暂无数据!',
                        type: 'warning'
                    });
                }
            });

        },

     }
 }
 </script>
 <style scoped lang="less">
     .scene-content{
        height:90vh;
     
        display:flex
     }
     .scene-left{
        width:25vw;
        
     }
     .scene-right{
        width:75vw;
       

     }
     .upper-content{
        height: 55vh;
      
     }
     .lower-content{
        height: 33.2vh;
       
     }
     #echartsMangt,#echartsCurve{
    
        height: 100%;
        width: 100%;
 
     }
 </style>
 