/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:08:28
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2023-11-02 10:08:46
 * @FilePath: \cshy-h5\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    HTTP_REQUEST_URL,
    HEADER,
    TOKENNAME,
    HEADERPARAMS
} from '@/config/app';
import {
    toLogin,
    checkLogin
} from '../libs/login';
import store from '../store';


/**
 * 发送请求
 */
function baseRequest(url, method, data, {
    noAuth = false,
    noVerify = false
}, params) {
    let Url = HTTP_REQUEST_URL,
        header = HEADER
    if (params != undefined) {
        header = HEADERPARAMS;
    }
    if (!noAuth) {
        //登录过期自动登录
        if (!store.state.app.token && !checkLogin()) {

            toLogin();
            return Promise.reject({
                msg: '未登录'
            });
        }
    }
    if (store.state.app.token) header[TOKENNAME] = store.state.app.token;
    return new Promise((reslove, reject) => {
        uni.request({
            url: Url + '/api/front/' + url,
            method: method || 'GET',
            header: header,
            data: data || {},
            success: (res) => {
                if (noVerify)
                    reslove(res.data, res);
                else if (res.data.code == 200)
                    reslove(res.data, res);
                else if ([410000, 410001, 410002, 401].indexOf(res.data.code) !== -1) {
                    let options = getCurrentPages()[0].options
                    if (options.hasOwnProperty("pickupCode")) {

                        toLogin(`/pages/users/login/gift_index?id=${options.id}&pickupCode=${options.pickupCode}`)

                    } else {
                        toLogin();
                    }


                    reject(res.data);
                } else
                    reject(res.data.message || '系统错误');
            },
            fail: (msg) => {
                reject('请求失败');
            }
        })
    });
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
    request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt || {}, params)
});



export default request;