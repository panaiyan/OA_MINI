
import Http from '../common/http'
/**
 * 设备是否在线
 * @param {*} data
 * @returns
 */
export const getDevice=(data)=>{
   return Http({
        method:'get',
        url:'/cv/device/getDevice?isFilter=false&deviceType=1',
        data
    })
}
/**
 * 查询指令
 * @param {*} data
 * @returns
 */
export const stateReport=(data)=>{
   return Http({
        method:'get',
        url:'/cv/command/stateReport',
        data
    })
}
/**
 * 发送指令
 * @param {*} data
 * @returns
 */
export const getOrderInfoById=(data)=>{
   return Http({
        method:'get',
        url:'/cv/orderInfo/getOrderInfoById',
        data,
        loadingFlag:false
    })
}
/**
 * 重启
 * @param {*} data
 * @returns
 */
export const control=(data)=>{
   return Http({
        method:'get',
        url:'/cv/command/control',
        data
    })
}
/**
 * 高级设置保存
 * @param {*} data
 * @returns
 */
export const settingVehicleType=(data)=>{
   return Http({
        method:'get',
        url:'/cv/command/settingVehicleType',
        data
    })
}
/**
 * 高级设置上传
 * @param {*} data
 * @returns
 */
export const settingquery=(data)=>{
   return Http({
        method:'get',
        url:'/cv/command/query',
        data
    })
}
/**
 * 高级设置上传
 * @param {*} data
 * @returns
 */
export const getVersionInfoList=(data)=>{
   return Http({
        method:'get',
        url:'/cv/versionInfo/getVersionInfoList',
        data
    })
}