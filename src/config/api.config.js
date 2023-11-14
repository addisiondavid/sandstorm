let apiPublicUrl = '',
    port = '',
    port2 = '',
    baseUrl = '';

/* dev --- 开发模式下 配置*/
if (process.env.NODE_ENV === 'development') {
    apiPublicUrl = '';
    port = '/gis';
    port2 = '/api';
    baseUrl = '/';
}
export default {
    login: `${apiPublicUrl}${port}/a/login`,
    redirect: `/sso/redirect`,
    logout: `${apiPublicUrl}${port}/a/logout`,
    colm: `${apiPublicUrl}${port}/f/sysApi/colmListData`,
    notice: `${apiPublicUrl}${port}/f/cms/article/listData`,
	categoryList: `${apiPublicUrl}${port}/f/cms/category/listData`,
    noticeDetail: `${apiPublicUrl}${port}/a/file/fileList?bizType=article_file`,
    articleDetail: `${apiPublicUrl}${port}/f/cms/article/getArticle`,
    baseUrl:`${baseUrl}`,
    menuData: `${apiPublicUrl}${port}/gis/getMenu`,
    subMenuDetail: `${apiPublicUrl}${port}/proxy/getData`,
    subMenuDetail2:`${apiPublicUrl}${port}`,
    imgBase:`${port}`,
    imgBase2:`${port2}`
    
};
