<template>
  <view class='deviceModify'>
    <!-- <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scrollaaaa"> -->
      <view class="InfoBox">
        <view class="title">设备基本信息(下拉刷新数据)</view>
        <view class="basicInfo">
          <span> 终端ID： value</span>
          <span> 终端型号： value</span>
          <span style="width: 100%"> 硬件版本： value</span>
          <span style="width: 100%"> 固件版本： value</span>
          <span style="width: 100%"> ICCID： value</span>
          <span style="width: 100%"> 车牌号： value</span>
          <span style="width: 100%"> 车牌颜色： value</span>
          <span style="width: 100%"> VIN： value</span>
          <span style="width: 100%"> SIM卡号： value</span>
          <span style="width: 100%"> 脉冲系数： value</span>
          <span> 休眠间隔： value</span>
          <span> 唤醒间隔： value</span>
          <span> 心跳间隔： value</span>
          <span> 速度源： value</span>
          <!-- <view v-if="type == 'guo6'">
          <span> 平台启动参数： value</span>
          <span> 国家激活参数： value</span>
          <span> 平台排放协议： value</span>
          <span> 发动机类型： value</span>
          <span> 客户厂家： value</span>
          <span> 发动机厂家： value</span>
        </view> -->
          <!-- <view v-if="type == 'newEnergy'">
          <span> 登陆方式： value</span>
          <span> 车辆类型： value</span>
          <span> 单体电池限值： value</span>
          <span> 温度探针限值： value</span>
          <span> 协议类型： value</span>
          <span> 三级故障测试： value</span>
          <span> 盲区测试： value</span>
          <span> 平台配置： value</span>
        </view> -->
        </view>
        <view class="title">服务器信息</view>
        <view class="serves">
          <view class="servesTitle">
            <span class="servesTitleL"> 第一平台({{ status }}) </span>
            <view class="servesTitleR">
              <switch checked @change="switchChange" />
              <button type="warn" size="mini" plain="true">注销</button>
            </view>
          </view>

          <view class="servesItem" v-if="status == '已开启'">
            <span class="leftSpan">IP</span>
            <uni-easyinput class="inputItem" v-model="formData.sendTheNumber" />
            <button type="primary" class="rightSpan" plain="true">选取</button>
          </view>

          <view class="servesItem" v-if="status == '已开启'">
            <span class="leftSpan">端口</span>
            <uni-easyinput class="inputItem" v-model="formData.sendTheNumber" />
          </view>

          <view class="servesItem" v-if="status == '已开启'">
            <span class="leftSpan">鉴权码</span>
            <uni-easyinput
              class="inputItem"
              disabled
              v-model="formData.sendTheNumber"
            />
            <button type="primary" class="rightSpan" plain="true">清空</button>
          </view>
        </view>

        <view class="serves">
          <view class="servesTitle">
            <span class="servesTitleL"> 第二平台({{ status1 }}) </span>
            <view class="servesTitleR">
              <switch @change="switchChange1" />
              <button type="warn" size="mini" plain="true">注销</button>
            </view>
          </view>

          <view class="servesItem" v-if="status1 == '已开启'">
            <span class="leftSpan">IP</span>
            <uni-easyinput class="inputItem" v-model="formData.sendTheNumber" />
            <button type="primary" class="rightSpan" plain="true">选取</button>
          </view>

          <view class="servesItem" v-if="status1 == '已开启'">
            <span class="leftSpan">端口</span>
            <uni-easyinput class="inputItem" v-model="formData.sendTheNumber" />
          </view>

          <view class="servesItem" v-if="status1 == '已开启'">
            <span class="leftSpan">鉴权码</span>
            <uni-easyinput
              class="inputItem"
              disabled
              v-model="formData.sendTheNumber"
            />
            <button type="primary" class="rightSpan" plain="true">清空</button>
          </view>
        </view>
      </view>
    <!-- </scroll-view> -->
    <!-- <view class="InfoBox">
      <view class="title">实时信息</view>
      <view class="basicInfo">
        <span> 4G信号： value</span>
        <span> 定位星数： value</span>
        <span> 联网状态： value</span>
        <span> 平台在线： value</span>
        <span> 定位状态： value</span>
        <span> 定位天线状态： value</span>
        <span> CAN1状态： value</span>
        <span> CAN2状态： value</span>
        <span> SD卡状态： value</span>
        <span> 加密芯片状态： value</span>
        <span> ACC信号状态： value</span>
        <view v-if="type == 'guo6'">
          <span> GSENSOR状态： value</span>
        </view>
        <view v-if="type == 'newEnergy'">
          <span> 充电信号状态: value</span>
        </view>
      </view>
    </view> -->

    <button type="primary" class="saveBtn">保存</button>
    <view class='tabBottom'>
      <view @click="restart" class='tab_item'>
        <span>重启</span>
      </view>
      <view @click="toState" class='tab_item'>
        <span>设备检查</span>
      </view>
      <view @click="toDevicePlateCodeType" class='tab_item'>
        <span>车牌类型</span>
      </view>
      <view @click="toUpLevel" class='tab_item'>
        <span>设备升级</span>
      </view>
    </view>
  </view>
</template>

<script>
import {control} from '@/API/svt'
import {getDeviceBackdata} from '@/common/common'
export default {
  data() {
    return {
      scrollTop: 0,
      deviceInfo:{},
      type: "newEnergy",
      formData: {
        sendTheNumber: "",
      },
      status: "已开启",
      status1: "已关闭",
    };
  },
  created() {
     getDeviceBackdata().then(newData=>{
         this.deviceInfo=newData
       })
  },
  methods: {
    switchChange(e) {
      this.status = e.target.value ? "已开启" : "已关闭";
    },
    switchChange1(e) {
      this.status1 = e.target.value ? "已开启" : "已关闭";
    },
    restart(){
       uni.showModal({
          title: '提示',
          content: '确定重启设备？',
           success: (res) => {
              if (res.confirm) {
              this.rest()

              } 
           }
       })
    },
    rest(){
       control({
              deviceNumber:this.deviceInfo.deviceNumber,
              deviceType:1,
              sendMode:0,
              type:1
            }).then(res=>{
         console.log(res,'res')
              // if(app.unValid(res)) return;
              if(res.errorCode == 200){
                uni.showModal({
                  title:'提示',content:'下发指令完成',showCancel:false
                })
              }else{
                uni.showModal({
                  title:'提示',content:'操作失败：'+res.data.msg,showCancel:false
                })
              }
            })
    },
    toState(){
       uni.navigateTo({
              url: "/pages/deviceCheckUp/deviceCheckUp",
       });
    },
    toDevicePlateCodeType(){
       uni.navigateTo({
      url: '/pages/devicePlateCodeType/devicePlateCodeType',
    })
    },
    toUpLevel(){
      
       uni.navigateTo({
      url: '/pages/upLevel/upLevel',
    })
    },

  },
};
</script>

<style scoped lang='scss'>
.deviceModify{
margin-bottom: 100px;
.InfoBox {
  .title {
     padding: 10px;
      background: #e8e4e4;
  }
  .basicInfo {
    margin: 10px;

    span {
      min-width: 48%;
      display: inline-block;
      margin: 3% 0;
    }
  }
  .serves {
    width: 95%;
    margin: 15px 2.5%;
    border: 1px solid #eee;
    // height: 300px;
    .servesTitle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3%;
      padding: 0 1.5% 0 2%;
      border-bottom: 1px solid #eee;
    }
    .servesTitleL {
      height: 40px;
      line-height: 40px;
    }
    .servesTitleR {
      //  width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .servesItem {
      display: flex;
      align-items: center;
      margin-bottom: 3%;
      .leftSpan {
        width: 14%;
        text-align: center;
      }
      .inputItem {
        width: 66%;
        margin-right: 2%;
      }
    }
    .rightSpan {
      height: 36px;
      line-height: 36px;
    }
  }
}
  .saveBtn{
      width: 95%;
      margin:0 2.5% 3% 2.5%;
  }
  .tabBottom{
    position: fixed;
    z-index: 9;
    bottom: 0;
    display: flex;
    flex-direction: row;
    height: 50px;
    background: #888;
    color: #fff;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    .tab_item{
    
  }
  }
}

</style>