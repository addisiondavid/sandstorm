import axios from './axios.js';
import { startLoading, endLoading } from '../../../config/comsConfig/ele-ui/el-loading.js';

class Utils {
    constructor() {
        this.hasOwnProperty = Object.prototype.hasOwnProperty;
        this.propIsEnumerable = Object.prototype.propertyIsEnumerable;
    }
    isObj(x) {
        let type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }

    toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        return Object(val);
    }

    assignKey(to, from, key) {
        var val = from[key];
        if (val === undefined || val === null) {
            return;
        }
        if (this.hasOwnProperty.call(to, key)) {
            if (to[key] === undefined || to[key] === null) {
                throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
            }
        }
        if (!this.hasOwnProperty.call(to, key) || !this.isObj(val)) {
            to[key] = val;
        } else {
            to[key] = this.assign(Object(to[key]), from[key]);
        }
    }

    assign(to, from) {
        if (to === from) {
            return to;
        }
        from = Object(from);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                this.assignKey(to, from, key);
            }
        }
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    this.assignKey(to, from, symbols[i]);
                }
            }
        }
        return to;
    }

    deepAssign(target) {
        target = this.toObject(target);
        for (var s = 1; s < arguments.length; s++) {
            this.assign(target, arguments[s]);
        }
        return target;
    }
    /*
        根据中心经纬度，半径（公里）-> 计算正北、南、东、西经纬度
        @param {lon,lat,radius}
        @retrun {log: [], lat: []}
    */
    byCenterPointGetFourCoordinate({lon, lat, radius}) {
        const PI = 3.14159265;
        const degree = (24901 * 1609) / 360.0;
        const raidusMile = radius * 1000;

        const dpmLat = 1 / degree;
        const radiusLat = dpmLat * raidusMile;
        const minLat = (lat - radiusLat).toFixed(5);
        const maxLat = Math.abs((lat + radiusLat).toFixed(5));
        const mpdLng = degree * Math.cos(lat * (PI / 180));
        const dpmLng = 1 / mpdLng;
        const radiusLng = dpmLng * raidusMile;
        const minLng = (lon - radiusLng).toFixed(5);
        const maxLng = Math.abs((lon + radiusLng).toFixed(5));
        return {
            'lon': `[${minLng}, ${maxLng}]`,
            'lat': `[${minLat}, ${maxLat}]`
        }
    }

    /**
     * [getData 提供统一获取要素数据的方法]
     * @param  {[type]} url     [请求地址]
     * @param  {[type]} params [请求参数对象]
     * @return {[type]}        [请求到的数据：cmiss数据格式]
     */
    getData(url, params) {
        startLoading();
        return new Promise((resolve, reject) => {
            axios.fetch(url, params).then((response) => {
                resolve(response);
                endLoading();
            },(e) => {
                endLoading();
                return console.log('数据请求失败，请稍后重试！');
            });
        });
    }

    /**
     * [getQueryString 获取url中的参数]
     * @param  {[type]} name [参数名称]
     * @return {[type]}      [参数值]
     */
    getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        let result = window.location.search.substr(1) || window.location.hash.split("?")[1];
        return (result ? decodeURIComponent((result.match(reg))[2]) : null);
    }

    /**
     * [getQueryUrlParamsToSaveLocalStorage 获取url地址相应的参数，并存到本地]
     * @param  {[type]} urlParams [需要获取的参数列表（可选，不填将存在所有参数）]
     * @return {[type]}           [存储在本地的参数对象]
     */
    getQueryUrlParamsToSaveLocalStorage(urlParams, key) {
        let url = window.location.search,
            params = urlParams || {},
            num = url.indexOf('?');
        if (!localStorage.getItem('urlParams') || !JSON.parse(localStorage.getItem('urlParams'))[key]) {
            if (num != -1) {
                let strs = url.substr(num + 1).split('&');
                for(let i = 0; i < strs.length; i++) {
                    if (JSON.stringify(params) != '{}' && params.hasOwnProperty(strs[i].split('=')[0])) {
                        params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
                    }
                }
            }
            params = JSON.stringify(params);
            localStorage.setItem('urlParams', params);
        }
    }
    /**
     * [setCookie cookie操作]
     * @type {[type]}
     */
    setCookie(name, value, days = 1) {
        let d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    }
    getCookie(name) {
        let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    delCookie(name) {
        this.setCookie(name, '', -1);
    }

}
let utils = new Utils();

export default utils;
