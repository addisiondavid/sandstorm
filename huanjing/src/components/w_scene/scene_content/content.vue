<template>
    <div class="scene-content">
         <div class="scene-left" >

            <div style="border:1px black solid; height: 97%;margin-top: .7em;padding-top: .5em;" >

                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>年份:</b></p>
                    <el-date-picker v-model="year1Val" size="mini" type="year" style="width:80px"></el-date-picker>
                    <span style="margin-left:.4em;margin-right:.4em">-</span>
                    <el-date-picker v-model="year2Val" size="mini" type="year" style="width:80px"></el-date-picker>
                </div>

                <div style="line-height:40px;display:flex;padding-left: 1.4em;">
                    <p style="width:70px"><b>月份:</b></p>
                    <el-date-picker v-model="month1Val" size="mini" type="month" style="width:80px"></el-date-picker>
                    <span style="margin-left:.4em;margin-right:.4em">-</span>
                    <el-date-picker v-model="month2Val" size="mini" type="month" style="width:80px"></el-date-picker>
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
         <div class="scene-right">
            <div style="padding-top: .8em;">
                <div class="upper-content">
                    <div id="echartsMangt"    v-if="showCharts"></div>
                    <div id="echartsCurve"    v-if="showCurve"></div>


                </div>
                <div class="lower-content">

                    <elTableComp v-if="showEchartTable"></elTableComp>

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
 import * as echarts from 'echarts';
 import elTableComp from './mainContent/elTableComp';
 
 export default {
     name: 'indexHeader',
     data() {
         return{
            mychart:null,
            mychart2:null,
            leftChartMenu:[{'Name':'年份',"Category":'calendar','Type':'year'},{'Name':'月份',"Category":'calendar','Type':'month'},{'Name':'过程类型','Category':'SelectBox','vModel':'process'},{'Name':'影响省份','Category':'SelectBox','vModel':'sheng'},{'Name':'影响时长','Category':'SelectBox','vModel':'duration'},{'Name':'影响系统','Category':'SelectBox','vModel':'system'}],
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            shengOptions:[
                {
                    value: '选项1',
                    label: '江苏省'
                    }, {
                    value: '选项2',
                    label: '浙江省'
                    }, {
                    value: '选项3',
                    label: '黑龙江省'
                    }, {
                    value: '选项4',
                    label: '宁夏省'
                    }, {
                    value: '选项5',
                    label: '广东省'
                }, {
                    value: '选项5',
                    label: '广西省'
                }
            ],
            processSandOptions:[
                {
                    value: '选项1',
                    label: '扬沙'
                    }, {
                    value: '选项2',
                    label: '沙尘'
                    }, {
                    value: '选项3',
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
            month1Val:'',
            month2Val:'',
            showCurve:false,
            showCharts:true,
            showEchartTable:true,

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
         this.initEcharts()
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
                    data: ['沙尘过程综合指数', '沙尘过程面积指数', '沙尘过程强度指数', '沙尘过程时长指数']
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
                    data: ['0221-0222', '0302-0302', '0308-0308', '0314-0314', '0327-0329', '0331-0401', '0415-0415','0427-0429','0430-0430','0505-0505','0510-0510','0517-0517','0531-0531','0609-0610','0815-0816'],
                    axisLabel: {
                        
                    }
                    
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    name: '沙尘过程综合指数',
                    type: 'line',
                    stack: 'Total',
                    data: [4.5, 1.12, 0.95, 1.5, 5.4, 12.78, 2.25,18.97,1.4,1.38,1.61,1.05,1.05,3.04,2.99]
                    },
                    {
                    name: '沙尘过程面积指数',
                    type: 'line',
                    stack: 'Total',
                    data: [2.69, 1.28, 0.96, 1.84, 2.77, 6.71, 2.61,6.96,1.82,1.48,1.66,1.37,1.26,1.58,1.81]
                    },
                    {
                    name: '沙尘过程强度指数',
                    type: 'line',
                    stack: 'Total',
                    data: [1.48,1.35,1.43,1.25,1.16,1.78,1.51,1.77,1.3,1.66,1.67,1.39,1.49,1.75,1.49]
                    },
                    {
                    name: '沙尘过程时长指数',
                    type: 'line',
                    stack: 'Total',
                    data: [1.13,0.65,0.69,0.65,1.68,1.07,0.57,1.54,0.59,0.56,0.58,0.55,0.56,1.1,1.11]
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
                [4.5,1.12,0.95,1.5,5.4,12.78,2.25,18.97,1.4,1.38,1.61,1.05,1.05,3.04,2.99],
                [2.69,1.28,0.96,1.84,2.77,6.71,2.61,6.96,1.82,1.48,1.66,1.37,1.26,1.58,1.81],
                [1.48,1.35,1.43,1.25,1.16,1.78,1.51,1.77,1.3,1.66,1.67,1.39,1.49,1.75,1.49],
                [1.13,0.65,0.69,0.65,1.68,1.07,0.57,1.54,0.59,0.56,0.58,0.55,0.56,1.1,1.11]
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
                text: '沙尘过程综合指数',
                textAlign: 'center',
                left: '25%',
              
                top: '0%',
                textStyle: {
                        fontSize:'14px',
                    
                    }
                },
                {
                text: '沙尘过程面积指数',
                textAlign: 'center',
                left: '75%',
                top: '0%',
                textStyle: {
                        fontSize:'14px',
                    
                    }
                
                },
                {
                text: '沙尘过程强度指数',
                textAlign: 'center',
                left: '25%',
                top: '50.5%',
                textStyle: {
                        fontSize:'14px',
                    
                    }
                },
                {
                text: '沙尘过程时长指数',
                textAlign: 'center',
                left: '75%',
                top: '50.5%',
                textStyle: {
                        fontSize:'14px',
                    
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
                { gridIndex: 0, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 1, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 2, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']},
                { gridIndex: 3, type: 'category',data: ['0221', '0302', '0308', '0314', '0327', '0331', '0415','0427', '0430', '0505', '0510', '0517', '0531', '0609', '0815']}
            ],
            yAxis: [
                { gridIndex: 0, type: 'value'},
                { gridIndex: 1, type: 'value' },
                { gridIndex: 2, type: 'value'},
                { gridIndex: 3, type: 'value' }
            ],
            series: [
                {
                name: 'I',
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: {
                    color: '#0099FF'
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
                itemStyle: {
                    color: '#0099FF'
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
                itemStyle: {
                    color: '#0099FF'
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
                itemStyle: {
                    color: '#0099FF'
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
           this.mychart.dispose()
           this.showCurve=true
           this.showCharts=false
           this.$nextTick(()=>{
            this.initEchartsCurve()
           })
           
        },
        getCharts(){
           this.mychart2.dispose()
           this.showCurve=false
           this.showCharts=true
           this.$nextTick(()=>{
            this.initEcharts()
           })
           
        }
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
 