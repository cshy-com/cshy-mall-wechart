/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:08:28
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-20 14:54:24
 * @FilePath: \cshy-h5\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App'
import store from './store'
import Cache from './utils/cache'
import util from 'utils/util'
import configs from './config/app.js'
import * as Order from './libs/order';

Vue.prototype.$util = util;
Vue.prototype.$config = configs;
Vue.prototype.$Cache = Cache;
Vue.prototype.$eventHub = new Vue();
Vue.config.productionTip = false
Vue.prototype.$Order = Order;
console.log('a')
    // #ifdef H5
import { parseQuery } from "./utils";
import Auth from './libs/wechat';
import { SPREAD } from './config/cache';

Vue.prototype.$wechat = Auth;


import VConsole from './components/vconsole.min.js'

let systemInfo = uni.getSystemInfoSync();

// 判断网络类型
if (systemInfo.networkType === 'wifi') { // Wi-Fi连接
    console.log('当前为Wi-Fi连接');
    new VConsole
} else if (systemInfo.networkType === '4g' || systemInfo.networkType === '5g') { // 移动网络（4G或5G）
    console.log('当前为移动网络连接');
} else { // 其他情况
    console.log('无法确定当前网络类型');
}

// new VConsole
process.env.NODE_ENV !== 'production' ? new VConsole : ''


// #endif



// import Vant from "vant";

//注意这里引入的是less文件而不是css文件，引入css文件会导致控制台报错无法编译成功
// import 'vant/lib/index.less'
// Vue.use(Vant)

import commonUserTabBar from "@/components/commonUserTabBar.vue" //路径根据你的文件修改
Vue.component('commonUserTabBar', commonUserTabBar)
Vue.prototype.$getURLParams = function() {
    let url = location.href;
    let requestParams = {};
    if (url.indexOf("?") !== -1) {
        let str = url.substr(url.indexOf("?") + 1); //截取?后面的内容作为字符串
        console.log(str, '?后面的内容');
        let strs = str.split("&"); //将字符串内容以&分隔为一个数组
        console.log(strs, '以&切割的数组');
        for (let i = 0; i < strs.length; i++) {
            requestParams[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            // 将数组元素中'='左边的内容作为对象的属性名，'='右边的内容作为对象对应属性的属性值
        }
    }
    console.log(requestParams, "处理后的对象");
    return requestParams;

}
App.mpType = 'app'


const app = new Vue({
    ...App,
    store,
    // Vant,
    Cache
})
app.$mount();