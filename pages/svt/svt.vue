<template>
  <div class="SVTPage">
    <div class="boxSVT">
      <picker
        mode="selector"
        :range="schoolList"
        :range-key="'name'"
        class="itemPicker"
        @change="selectChange"
      >
        {{ name }}
      </picker>

      <div class="uniInput">
        <input focus placeholder="请输入" v-model="code" />
      </div>
      <div class="scanCode" @click="scanCode()">
        <image :src="scanBtn" class="scanImg"></image>
      </div>
    </div>
    <button
      type="primary"
      class="primarybtn"
      :loading="loading"
      @tap="startCheck"
    >
      开始检测
    </button>
  </div>
</template>

<script>
import { getDevice } from "@/API/svt.js";
import {getDeviceBackdata} from '@/common/common'
export default {
  data() {
    return {
      loading: false,
      schoolList: [
        { name: "设备ID", value: 0 },
        { name: "VIN", value: 1 },
      ],
      name: "设备ID",
      selectId: 0,
      code: "0007859",
      scanBtn: "../../static/img/scanBtn.png",
    };
  },

  methods: {
    scanCode() {
      uni.scanCode({
        success: function (res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        },
      });
    },
    selectChange(e) {
      const index = e.target.value;
      this.name = this.schoolList[index].name;
      // 根据业务需求 判断你是否需要数组中的其他数据 一般都是会需要id的  嘿嘿
      this.selectId = this.schoolList[index].value;
      console.log("picker发送选择改变，携带值为", this.selectId);
    },
    /**
     * 开始检测
     */
    startCheck() {
      if (!this.code) {
        return;
      }
      let data = {};
      if (this.selectId == 0) {
        data.deviceNumber = this.code;
      } else {
        data.vin = this.code; //SLGV0123456789877
      }
      //  //跳转设备信息页面
      //       uni.navigateTo({
      //         url: "/pages/device/device?deviceId=" + this.code,
      //       });
      // this.getDevicOnline(data);
       getDeviceBackdata(data).then(newData=>{
         if(newData){
           //跳转设备信息页面
            uni.navigateTo({
              url: "/pages/deviceModify/deviceModify",
              // url: "/pages/deviceCheckUp/deviceCheckUp?deviceId=" + res.data.deviceNumber,
            });
         }
       })
    },
    //检测设备是否在线
    getDevicOnline(data) {
      this.loading = true;
      getDevice(data).then((res) => {
        console.log(res.data, "re");
        if (res.flag) {
          //设备在线
          if (res.data.onlineRedis) {
            uni.setStorageSync("deviceInfo", res.data);
            uni.setStorageSync("deviceNumber", res.data.deviceNumber);
            //跳转设备信息页面
            uni.navigateTo({
              url: "/pages/deviceModify/deviceModify",
              // url: "/pages/deviceCheckUp/deviceCheckUp?deviceId=" + res.data.deviceNumber,
            });
          } else {
            uni.showModal({
              content: "当前设备不在线",
              showCancel: false,
            });
          }
        } else {
          uni.showModal({
            content: res.msg,
            showCancel: false,
          });
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.SVTPage {
  width: 100%;
  .boxSVT {
    width: 90%;
    height: 50px;
    border: 2px solid #0faeff;
    border-radius: 30px;
    margin-left: 5%;
    margin-top: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemPicker {
      width: 12%;
      margin-left:4%;
      padding-right:1% ;
      border-right: 1px solid #d9d9d9;
    }
    .uniInput {
      flex: 1;
      margin-left: 2%;
    }
    .scanCode {
      width: 13%;
      margin-right: 2%;
      border-left:  1px solid #d9d9d9;
      .scanImg {
        width: 30px;
        height: 30px;
        margin-left: 15%;
      }
    }
  }
  .primarybtn {
    width: 90%;
    margin: 15% 5% 0 5%;
  }
}
</style>