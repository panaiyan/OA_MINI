import { getDevice } from "@/API/svt";
import {  parseState } from "@/common/filter";
export const getDeviceBackdata=(data)=>{
    let deviceNumber=uni.getStorageSync("deviceNumber"),obj={};
   
    if(data){
        obj=data
    }else{
        obj={deviceNumber}
    }
    console.log(obj,'deviceid')
    return getDevice(obj).then(res=>{
        if(res.flag){
            const newDate=res.data
            newDate.lastState= parseState(res.data.lastState)
            uni.setStorageSync("deviceNumber", res.data.deviceNumber);
               //设备在线
            if(newDate.onlineRedis){
                return newDate
            }else{
                uni.showModal({
                    content: "当前设备不在线",
                    showCancel: false,
                  });
                  return false
            }
        }else{
            //设备不在线
            uni.showModal({
                content: res.msg,
                showCancel: false,
              });
              return false
        }
    })
}