import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import apiConfig from '../config/api.config.js';
import mutations from './mutations.js';
import actions from './actions.js';
let state = {
    api: apiConfig,                   //所有关于后台请求接口api地址配置
    user: {},
    noticeData:[],
    isnqIndex:false,
    isMonthly:false,
    isJieqi:false,
    showMainPage:true,
    showForecast:false,
    showImgquery:false,
    
}

export default new Vuex.Store({
    state, mutations, actions
});

