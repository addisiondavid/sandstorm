<template>
    <div class="scene-content-table">

        <div style="padding:1em;height:100%">
            <el-table :data="paginationArr" border :show-header="true" :row-style="{height:0+'px'}" :cell-style="{padding:2+'px'}"
                @row-click=""
                class="datatable"    :header-cell-style="tableStyle" :row-class-name="setRowClass" >  
                <el-table-column prop="generalIndx" label="沙尘过程综合指数" > </el-table-column>
                <el-table-column prop="areaIndx" label="面积指数" > </el-table-column>
                <el-table-column prop="strongIndx" label="强度指数" > </el-table-column>
                <el-table-column prop="durationIndx" label="时长指数" > </el-table-column>
                <el-table-column prop="Datetime" label="日期" :formatter="formatDate" width="240" >
                </el-table-column>
            </el-table>
            <div style="margin-top:1em;text-align: right;">
                    <el-pagination
                    :total="total"
                    :current-page.sync="current"
                    :background="true"
                    :page-size="size"
                    layout="total, prev, pager, next, jumper"
                    @size-change="sizeList"
                    @current-change="getTableList"
                    class="paginationEl4"/>
            </div>
        </div>

     </div>
    
 </template>
 
 <script>
 import utils from '../../../../assets/js/tools/utils.js';
 import DesUtils from '../../../../assets/js/tools/des.js';
 import axios from '../../../../assets/js/tools/axios.js';
 import { mapState,mapMutations } from 'vuex';
 import { Message } from 'element-ui';
 import * as echarts from 'echarts';

 
 export default {
     name: 'indexHeader',
     data() {
         return{
            localNewsFiles:[],
            tagMenuData:{},
            tableStyle:{
                'background-color': 'black',
                'color':'white',
                'font-weight': '700',
                'padding':'.2em'
            },
           
            tableHead:[
            ],
            // 表格数据
            tableData: [],
            total: 0,
            size: 5,
            current: 1,
            currPage:1,
            paginationArr:[],
            inputSearchText:'',

        }
     },
     components:{
       
     },
     computed: {
        
     },
     created () {
     },
     mounted(){
        this.getNewsFiles()
     },
     methods: {
        setRowClass({ row, rowIndex }){
            console.log("row.........",row)
        },
       
        resetData(){
            //console.log("this.paginationArr...",this.paginationArr)
            this.paginationArr=this.localNewsFiles
            this.getTableList(this.currPage)

        },
       
        sizeList(info) {
            
        },
        getTableList(currPage) {
            //this.size
            console.log("this.localNewsFiles...",this.localNewsFiles)
            this.total = this.localNewsFiles.length 
            this.currPage = currPage;

            let index = this.size * (currPage-1)
            let nums =  this.size * (currPage)

            let tables = []
            tables = []

            for(let i = index;i<nums;i++){
                
                if(this.localNewsFiles[i]){
                    tables.push(this.localNewsFiles[i])
                }
                this.paginationArr = tables;
            
            }
            //this.paginationArr = tables;

        },
        getNewsFiles(ele){
            //startLoading()
			let currMenu=this.subMenu;
			if(ele){
				currMenu=ele;
			}

            this.localNewsFiles =[{Datetime:'2015/02/21-2015/02/22',generalIndx:4.5,areaIndx:2.69,strongIndx:1.48,durationIndx:1.13},{Datetime:'2015/03/02-2015/03/02',generalIndx:1.12,areaIndx:1.28,strongIndx:1.35,durationIndx:0.65},{Datetime:'2015/03/08-2015/03/08',generalIndx:0.95,areaIndx:0.96,strongIndx:1.43,durationIndx:0.69},{Datetime:'2015/03/14-2015/03/14',generalIndx:1.5,areaIndx:1.84,strongIndx:1.25,durationIndx:0.65},{Datetime:'2015/03/27-2015/03/29',generalIndx:5.4,areaIndx:2.77,strongIndx:1.16,durationIndx:1.68},{Datetime:'2015/03/31-2015/04/01',generalIndx:12.78,areaIndx:6.71,strongIndx:1.78,durationIndx:1.07},{Datetime:'2015/04/15-2015/04/15',generalIndx:2.25,areaIndx:2.61,strongIndx:1.51,durationIndx:0.57},{Datetime:'2015/04/27-2015/04/29',generalIndx:18.97,areaIndx:6.96,strongIndx:1.77,durationIndx:1.54},{Datetime:'2015/04/30-2015/04/30',generalIndx:1.4,areaIndx:1.82,strongIndx:1.3,durationIndx:0.59},{Datetime:'2015/05/05-2015/05/05',generalIndx:1.38,areaIndx:1.48,strongIndx:1.66,durationIndx:0.56},]
            this.getTableList('1');
            /*
            axios.post(`${this.$store.state.baseURL}/proxy/getData?confId=`+currMenu.id+`&element=`+currMenu.element+`&time=&ForecastTime=0&manager=&areaCode=100000`).then((res) => {
                console.log("thi.............res",res)
				if(res.RespData){
					this.localNewsFiles = res.RespData.DS;
                    //this.localNewsFiles =[{'RETAIN1':'TEST','Datetime':'202205520'},{'RETAIN1':'TEST','Datetime':'202205520'},{'RETAIN1':'TEST','Datetime':'202205520'},{'RETAIN1':'TEST','Datetime':'202205520'}]
                    
					if(res.RespData.DS.length>20){
						this.localNewsFiles = res.RespData.DS.slice(0,20);
					}else{
						//this.localNewsFiles = res.RespData.DS;
					}
				}else{
					this.localNewsFiles=[]
				}
                //console.log("this.localNewsFiles........",this.localNewsFiles);
                this.getTableList('1');
                endLoading()
            })
            .catch(err=>{
                console.log(err);
                endLoading()
            })
            */
        },
       
		formatDate(row, column) {
		    // 获取单元格数据
		    let data = row[column.property]
		    return data.split('T')[0]
		}
     }
 }
 </script>
 <style scoped lang="less">
    .elInputText .el-input__prefix{
        display: flex;
        align-items: center;
    }

	.datatable{
		width: 100%;color:black;background-color: rgba(0, 0, 51, 0.3686274509);
	}
    .tagContainer{
        padding-top: .5em;
        display:flex;
        align-items: center;
    }
	.el-button--small, .el-button--small.is-round {
	    padding: 2px 6px;
	}
    .setRowClass{
        cursor:pointer
    }
 </style>
 