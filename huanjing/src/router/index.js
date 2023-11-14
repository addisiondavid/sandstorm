/*引入vue框架*/
import Vue from 'vue'
/*引入路由依赖*/
import Router from 'vue-router'

/*使用路由*/
Vue.use(Router)

/*定义路由*/
export default new Router({
    routes: [
        {
            path: '/',
            meta: { title: 'scene' },
            component: function(resolve) {
                //require(['@/components/w_scene/scene'], resolve);
                require(['@/components/w_scene/scene_content/Img_forcecast'], resolve);
            }
        },
        {
            path: '/forcecast',
            meta: { title: 'scene' },
            component: function(resolve) {
                //require(['@/components/w_scene/scene_content/Img_forcecast'], resolve);
                require(['@/components/w_scene/scene'], resolve);
            }
        },
        {
            path: '/imgquery',
            meta: { title: 'scene' },
            component: function(resolve) {
                require(['@/components/w_scene/scene_content/Img_lookup'], resolve);
            }
        },
        /*
        {
            path: "/detail",
            name: "detail",
            component: function(resolve) {
                require(['@/components/w_scene/scene_content/detail'], resolve);
            },
        },
        {
            path: "/noticeList",
            name: "noticeList",
            component: function(resolve) {
                require(['@/components/w_scene/scene_content/noticeList'], resolve);
            },
        },
        {
            path: "/knowledgeDb",
            name: "knowledgeDb",
            component: function(resolve) {
                require(['@/components/w_scene/scene_content/knowledgeDb'], resolve);
                //require(['@/components/w_scene/scene_content/knowledgeChild/articlePageChild/monthlyService'], resolve);
            },
        },
        {
            path: "/imgshow",
            name: "imgshow",
            component: function(resolve) {
                require(['@/components/w_scene/scene_content/imgshow'], resolve);
            },
        },
*/
    ]
})
