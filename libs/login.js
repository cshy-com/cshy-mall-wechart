/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-09-07 17:29:05
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2023-10-26 16:03:09
 * @FilePath: \app\libs\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from "../store";
import Cache from '../utils/cache';
import { Debounce } from '@/utils/validate.js'
// #ifdef H5
import { isWeixin } from "../utils";
import auth from './wechat';
// #endif

import { LOGIN_STATUS, USER_INFO, EXPIRES_TIME, STATE_R_KEY, BACK_URL } from './../config/cache';

function prePage() {
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 1];
    return prePage.route;
}

export const toLogin = Debounce(_toLogin, 800)

export function _toLogin(push, pathLogin) {

    store.commit("LOGOUT");

    let path = prePage();

    let login_back_url = Cache.get(BACK_URL);
    // #ifdef H5
    // path = location.href;
    path = location.pathname + location.search;
    // #endif

    if (!pathLogin) {
        pathLogin = '/page/users/login/index'
        Cache.set('login_back_url', push);
    }
    if (push) {
        uni.navigateTo({
            url: push
        })
    } else {
        uni.navigateTo({
            url: '/pages/users/login/index'
        })
    }

}


export function checkLogin() {
    let token = Cache.get(LOGIN_STATUS);
    let expiresTime = Cache.get(EXPIRES_TIME);
    let newTime = Math.round(new Date() / 1000);
    if (expiresTime < newTime || !token) {
        Cache.clear(LOGIN_STATUS);
        Cache.clear(EXPIRES_TIME);
        Cache.clear(USER_INFO);
        Cache.clear(STATE_R_KEY);
        return false;
    } else {
        store.commit('UPDATE_LOGIN', token);
        let userInfo = Cache.get(USER_INFO, true);
        if (userInfo) {
            store.commit('UPDATE_USERINFO', userInfo);
        }
        return true;
    }

}