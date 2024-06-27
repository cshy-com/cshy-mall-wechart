/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-05-17 11:20:54
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-17 12:05:44
 * @FilePath: \cshy-apple\utils\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { spread } from "@/api/user";
import Cache from "@/utils/cache";

/**
 * 静默授权绑定上下级，使用在已经登录后扫描了别人的推广二维码
 * @param {Object} puid
 */
export function silenceBindingSpread() {

    let puid
        //#ifdef H5
    puid = Cache.get('spread');
    //#endif

    //#ifdef MP
    puid = getApp().globalData.spid;
    //#endif

    puid = parseInt(puid);
    if (Number.isNaN(puid)) {
        puid = 0;
    }
    if (puid) {
        spread(puid).then(res => {}).catch(res => {});
        //#ifdef H5
        Cache.clear('spread');
        //#endif

        //#ifdef MP
        getApp().globalData.spid = 0;
        getApp().globalData.code = 0;
        //#endif
    } else {
        Cache.set('spread', 0);
    }
}

export function isWeixin() {
    if (navigator && navigator.userAgent) {
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
    }
}

export function parseQuery() {
    const res = {};

    const query = (location.href.split("?")[1] || "")
        .trim()
        .replace(/^(\?|#|&)/, "");

    if (!query) {
        return res;
    }

    query.split("&").forEach(param => {
        const parts = param.replace(/\+/g, " ").split("=");
        const key = decodeURIComponent(parts.shift());
        const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

        if (res[key] === undefined) {
            res[key] = val;
        } else if (Array.isArray(res[key])) {
            res[key].push(val);
        } else {
            res[key] = [res[key], val];
        }
    });

    return res;
}

// #ifdef H5
const VUE_APP_WS_URL = process.env.VUE_APP_WS_URL || `ws://${location.hostname}:20001`;
export {
    VUE_APP_WS_URL
}
// #endif



export default parseQuery;