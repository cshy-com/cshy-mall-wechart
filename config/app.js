/*
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-09-07 17:29:05
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-07 18:25:52
 * @FilePath: \app\config\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// let domain = 'https://cshy.store/mall-front'
let domain = 'http://192.168.5.2:8082'
module.exports = {
    // 请求域名 格式： https://您的域名
    // #ifdef MP
    HTTP_REQUEST_URL: domain,
    // #endif
    HTTP_ADMIN_URL: 'https://cshy.store/mall-admin', //PC后台的API请求地址，上传图片用
    // #ifdef H5
    //H5接口是浏览器地址
    // HTTP_REQUEST_URL: window.location.protocol+"//"+window.location.host,
    // http://api.java.crmeb.net:20001
    HTTP_REQUEST_URL: domain,
    // #endif
    HTTP_FILE_URL: 'https://cshy.store/',
    HEADER: {
        'content-type': 'application/json'
    },
    HEADERPARAMS: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    // 回话密钥名称 请勿修改此配置
    TOKENNAME: 'Authorization',
    // 缓存时间 0 永久
    EXPIRE: 0,
    //分页最多显示条数
    LIMIT: 10,
    PHONE: '18071091202'
};