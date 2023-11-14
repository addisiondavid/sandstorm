import { Loading } from 'element-ui';

let loading = null;
let startLoading = function(options) {
    let option = Object.assign({
        target: document.querySelector('body'),
        lock: true,
        text: '拼命加载中......',
        background: 'rgba(0, 0, 0, 0.7)',
        fullscreen: true
    }, options);
    loading = Loading.service(option);
}

let endLoading = function() {
    loading.close();
}

export {
    startLoading,
    endLoading
}
