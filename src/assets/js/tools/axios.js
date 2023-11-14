import AXIOS from 'axios';

class Axios {
    constructor() {
        this.init();
    }
    init() {
        AXIOS.defaults.timeout = 5000;
        AXIOS.defaults.baseURL = '';
        //AXIOS.defaults.baseURL = '/v3';
        AXIOS.defaults.withCredentials = true;

        //http request 拦截器
        // AXIOS.interceptors.request.use(
        //   config => {
        //     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        //     config.data = JSON.stringify(config.data);
        //     config.headers = {
        //       'Content-Type':'application/x-www-form-urlencoded'
        //     }
        //     // if(token){
        //     //   config.params = {'token':token}
        //     // }
        //     return config;
        //   },
        //   error => {
        //     return Promise.reject(err);
        //   }
        // );

        //http response 拦截器
        // AXIOS.interceptors.response.use(
        //   response => {
        //     if(response.data.errCode ==2){
        //       router.push({
        //         path:"/login",
        //         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        //       })
        //     }
        //     return response;
        //   },
        //   error => {
        //     return Promise.reject(error)
        //   }
        // )

    }
    /**
     * 封装get方法
     * @param url
     * @param data
     * @returns {Promise}
     */
    fetch(url,params={}) {
      return new Promise((resolve,reject) => {
            AXIOS.get(url,{
                params:params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            });
      });
    }
    /**
     * 封装post请求
     * @param url
     * @param data
     * @returns {Promise}
     */
     post(url,data = {}) {
       return new Promise((resolve,reject) => {
         AXIOS.post(url,data)
              .then(response => {
                  resolve(response.data);
              },err => {
                  reject(err)
              });
       });
     }
     /**
     * 封装patch请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    patch(url,data = {}){
      return new Promise((resolve,reject) => {
        AXIOS.patch(url,data)
             .then(response => {
                 resolve(response.data);
             },err => {
                 reject(err)
             });
      });
    }
    /**
    * 封装put请求
    * @param url
    * @param data
    * @returns {Promise}
    */
   put(url,data = {}){
     return new Promise((resolve,reject) => {
       AXIOS.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            });
     });
   }

}
let axios = new Axios();

export default axios;
