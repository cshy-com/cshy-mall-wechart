/*
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-05-22 14:08:22
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-24 15:15:24
 * @FilePath: \cshy-wechat\libs\order.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
    preOrderApi
} from '@/api/order.js';
import util from 'utils/util'

/**
 * 去商品详情
 */
export function goShopDetail(item, uid) {
    return new Promise(resolve => {
        if (item.activityH5 && item.activityH5.type === "1") {
            uni.navigateTo({
                url: `/pages/activity/goods_seckill_details/index?id=${item.activityH5.id}`
            })
        } else if (item.activityH5 && item.activityH5.type === "2") {
            uni.navigateTo({
                url: `/pages/activity/goods_bargain_details/index?id=${item.activityH5.id}&startBargainUid=${uid}`
            })
        } else if (item.activityH5 && item.activityH5.type === "3") {
            uni.navigateTo({
                url: `/pages/activity/goods_combination_details/index?id=${item.activityH5.id}`
            })
        } else {
            resolve(item);
        }
    });
}

/**
 * 活动商品、普通商品、购物车、再次购买预下单
 */
export function getPreOrder(preOrderType, orderDetails) {

    return new Promise((resolve, reject) => {
        preOrderApi({
            "preOrderType": preOrderType,
            "orderDetails": orderDetails,
            isGiftCard: 0 //是否礼品卡订单 0 否 1 是    
        }).then(res => {
            uni.navigateTo({
                url: '/pages/users/order_confirm/index?preOrderNo=' + res.data.preOrderNo
            });
        }).catch(err => {
            return util.Tips({
                title: err
            });
        })
    });
}
export function getPreOrderGift(preOrderType, orderDetails, pickupCode) {
    return new Promise((resolve, reject) => {
        preOrderApi({
            "preOrderType": preOrderType,
            "orderDetails": orderDetails,
            isGiftCard: 1
        }).then(res => {
            uni.navigateTo({
                url: `/pages/users/order_confirm/gift_index?preOrderNo=${res.data.preOrderNo}&pickupCode=${pickupCode}`
            });
        }).catch(err => {
            return util.Tips({
                title: err
            });
        })
    });
}