<template>
  <view class="deviceCheckUp">
    <!-- <uni-collapse> -->
    <!-- <uni-collapse-item :open="true" title="接收时间："> -->
    <view class="InfoBox">
      <view class="title">接收时间：</view>
      <view class="basicInfo">
        <view class="itemLine">
          经度： <span class="eeeColor">{{ lastState.Longitude }}</span>
        </view>
        <view class="itemLine">
          纬度： <span class="eeeColor">{{ lastState.Latitude }}</span>
        </view>
        <view class="itemLine localsapn">
          地址：<span class="eeeColor">{{ lastState.Address }}</span>
          <image
            class="localimg"
            @click="toLocal"
            v-if="lastState.gcj02 != null"
            src="/static/img/local.png"
          ></image>
        </view>
        <view class="itemLine">
          gps速度：<span class="eeeColor">{{ lastState.Speed / 10 }}km/h</span>
        </view>
        <view class="itemLine">
          vss速度：<span class="eeeColor">{{ lastState.DSpeed / 10 }}km/h</span>
        </view>
        <view class="itemLine">
          can速度：<span class="eeeColor"
            >{{ lastState.mqbCanObj["key15"] }}km/h</span
          >
        </view>
        <view class="itemLine">
          载重：<span class="eeeColor">{{ lastState.LoadRatio }}%</span>
        </view>
        <view class="itemLine">
          温度1：<span class="eeeColor">{{ lastState.Temperature2_p }}</span>
        </view>
        <view class="itemLine">
          温度2：<span class="eeeColor">{{ lastState.Temperature2_p }}</span>
        </view>

        <view class="itemLine">
          ACC：
          <span :class="['eeeColor', stateFlagCh(0)]">{{
            stateFlagopenClose(0)
          }}</span>
        </view>
        <view class="itemLine">
          IO_0：<span :class="['eeeColor', stateFlagCh(8)]">{{
            stateFlagopenClose(8)
          }}</span>
        </view>
        <view class="itemLine">
          CAN0：<span :class="['eeeColor', stateFlagCh(1)]">{{
            stateFlagopenClose(1)
          }}</span>
        </view>
        <view class="itemLine">
          IO_1：<span :class="['eeeColor', stateFlagCh(9)]">{{
            stateFlagopenClose(9)
          }}</span>
        </view>
        <view class="itemLine">
          CAN1：<span :class="['eeeColor', stateFlagCh(2)]">{{
            stateFlagopenClose(2)
          }}</span>
        </view>
        <view class="itemLine">
          IO_2：<span :class="['eeeColor', stateFlagCh(10)]">{{
            stateFlagopenClose(10)
          }}</span>
        </view>
        <view class="itemLine">
          疲劳识别：<span :class="['eeeColor', stateFlagCh(3)]">{{
            stateFlagCamere(3)
          }}</span>
        </view>
        <view class="itemLine">
          IO_3：<span :class="['eeeColor', stateFlagCh(11)]">{{
            stateFlagopenClose(11)
          }}</span>
        </view>
        <view class="itemLine">
          Camere_1：<span :class="['eeeColor', stateFlagCh(4)]">{{
            stateFlagCamere(4)
          }}</span>
        </view>
        <view class="itemLine">
          IO_4：<span :class="['eeeColor', stateFlagCh(12)]">{{
            stateFlagopenClose(12)
          }}</span>
        </view>
        <view class="itemLine">
          Camere_2：<span :class="['eeeColor', stateFlagCh(5)]">{{
            stateFlagCamere(5)
          }}</span>
        </view>
        <view class="itemLine">
          IO_5：<span :class="['eeeColor', stateFlagCh(13)]">{{
            stateFlagopenClose(13)
          }}</span>
        </view>
        <view class="itemLine">
          Camere_3：<span :class="['eeeColor', stateFlagCh(6)]">{{
            stateFlagCamere(6)
          }}</span>
        </view>
        <view class="itemLine">
          IO_6：<span :class="['eeeColor', stateFlagCh(14)]">{{
            stateFlagopenClose(14)
          }}</span>
        </view>
        <view class="itemLine">
          Camere_4：<span :class="['eeeColor', stateFlagCh(7)]">{{
            stateFlagCamere(7)
          }}</span>
        </view>
        <view class="itemLine">
          IO_7：<span :class="['eeeColor', stateFlagCh(15)]">{{
            stateFlagopenClose(15)
          }}</span>
        </view>
        <view class="itemLine">
          平台1：<span class="eeeColor">{{
            lastState.connectedStateserver1
          }}</span>
        </view>
        <view class="itemLine">
          平台2：<span class="eeeColor">{{
            lastState.connectedStateserver2
          }}</span>
        </view>
        <view class="itemLine">
          油位：<span class="eeeColor"
            >{{ lastState.mqbCanObj["key1525"] }}%</span
          >
        </view>
        <view class="itemLine">
          报警：<span class="eeeColor">{{ lastState.alarmStr }}</span>
        </view>
      </view>
    </view>
    <!-- </uni-collapse-item> -->
    <!-- <uni-collapse-item :open="true" title="Can数据"> -->
    <view class="canBox">
      <view class="title">Can数据</view>
      <view class="list">
        <view class="canRow">
          <view class="itemLine">名称 </view>
          <view class="itemLine">值 </view>
          <view class="itemLine">单位 </view>
        </view>
        <view class="canRow" v-for="item in lastState.MqbCan" :key="item.Id">
          <view class="itemLine">{{ item.Name }} </view>
          <view class="itemLine">{{ item.Value }} </view>
          <view class="itemLine">{{ item.Label }} </view>
        </view>
      </view>
    </view>
    <!-- </uni-collapse-item>
          </uni-collapse> -->
    <!-- <uni-collapse-item :open="true" title="下发指令："> -->
    <view class="InfoBox">
      <view class="title">下发指令：</view>
      <view class="basicInfo">
        <picker
          class="itemLine"
          @change="pickArr_0bindMultiPickerChange"
          :value="index_0"
          :range="pickArr_0"
        >
          <view class="itemLine"
            >上报间隔：
            <span class="eeeColor">{{ pickArr_0[index_0] }} s</span></view
          >
        </picker>
        <picker
          class="itemLine"
          @change="pickArr_1bindMultiPickerChange"
          :value="index_1"
          :range="pickArr_1"
        >
          <view class="itemLine"
            >有效时间：<span class="eeeColor"
              >{{ pickArr_1[index_1] }} s</span
            ></view
          >
        </picker>
        <view class="loadInfo" v-if="check.state >= 0"
          >{{ check.ret }}
          <image
            class="loading"
            v-if="check.state == 0"
            src="/static/img/loading.gif"
          ></image>
        </view>
      </view>
    </view>
    <!-- </uni-collapse-item> -->

    <button type="primary" class="btnBottom" @click="sendCmd">立即查询</button>
  </view>
</template>

<script>
/**
 * 设备检查 设备详情
 */
import { stateReport } from "@/API/svt";
import startCdOrder from "@/common/startCdOrder";

import { getDeviceBackdata } from "@/common/common";
export default {
  mixins: [startCdOrder],
  data() {
    return {
      deviceInfo: {},
      lastState: { stateFlagArr: [] },
      pickArr_0: [1, 5, 10, 30],
      pickArr_1: [30, 60, 90, 120, 180, 300, 600],
      index_0: 1,
      index_1: 0,
    };
  },

  created() {
    this.setpage("checkUp");
    getDeviceBackdata().then((newData) => {
      this.deviceInfo = newData;
      this.lastState = this.deviceInfo.lastState;
    });
  },
  methods: {
    stateFlagCh(index) {
      return this.lastState.stateFlagArr[index] == 1 ? "" : "chRed";
    },
    stateFlagopenClose(index) {
      return this.lastState.stateFlagArr[index] == 1 ? "开" : "关";
    },
    stateFlagCamere(index) {
      return this.lastState.stateFlagArr[index] == 1 ? "正常" : "未接或未知";
    },
    pickArr_0bindMultiPickerChange(e) {
      this.index_0 = e.target.value;
    },
    pickArr_1bindMultiPickerChange(e) {
      this.index_1 = e.target.value;
    },
    /**
     * 立即查询指令
     */
    sendCmd() {
      stateReport({
        sendMode: 0,
        deviceType: 1,
        deviceNumber: this.deviceInfo.deviceNumber,
        interval: this.pickArr_0[this.index_0],
        validity: this.pickArr_1[this.index_1],
        state: 0, //0|1 0:有效期内生效，1:一直上报
      }).then((res) => {
        if (res.errorCode == "200") {
          uni.showToast({
            title: "操作成功",
            duration: 800,
          });
          this.startCd(res.data.orderId);
        } else {
          uni.showToast({
            title: "操作失败：" + res.data.msg,
            icon: "none",
          });
        }
      });
    },
    // startCd(orderId) {
    //   this.check = {
    //     state: 0, //-1 未检测 0 检测中 1 检测完成
    //     times: 0,
    //     ret: "指令检测中",
    //     orderId: orderId + "",
    //   };
    //   //开始检测
    //   setTimeout(() => {
    //     this.checkState(orderId);
    //   }, 1500);
    // },
    // checkState(orderId) {
    //   if (this.check.times > 60) {
    //     this.check.state = 2;
    //     this.check.ret = "检测超时";
    //     return;
    //   }
    //   if (this.check.state == 0) {
    //   this.check.times++;
    //     //检测指令下发状态
    //     this.checkOrder(orderId);
    //   } else if (this.check.state == 1) {
    //     //检测修改状态
    //     this.checkOrder(orderId);
    //   }
    // },
    // /**
    //  * 检查指令是否下发成功
    //  */
    // checkOrder(orderId) {
    //   ({ orderId }).then((ret) => {
    //     if (ret.errorCode == 200) {
    //       if (isNull(ret.data)) {
    //         //有可能指令还没有入库， 把它当成发送中来处理
    //         this.check.state = 0;
    //         this.check.ret = "指令发送中";
    //       } else {
    //         if (ret.data.sendResult == 2) {
    //           ////0:等待发送;1:发送成功;2:发送失败;
    //           uni.showModal({
    //             title: "提示",
    //             content: "检测到指令发送失败",
    //           });
    //           this.check.state = 1;
    //           this.check.ret = "指令发送失败";
    //         } else if (ret.data.sendResult == 1) {
    //           this.check.state = 1;
    //           this.check.ret = "指令已发送";
    //         } else if (ret.data.sendResult == 0) {
    //           this.check.state = 0;
    //           this.check.ret = "指令发送中";
    //         }
    //       }
    //     }
    //     setTimeout(() => {
    //       this.checkState(orderId);
    //     }, 2000);
    //   });
    // },
    toLocal() {
      this.endCd();
      uni.navigateTo({
        url:
          "/pages/position/position?Latitude=" +
          this.lastState.gcj02.x +
          "&Longitude=" +
          this.lastState.gcj02.y +
          "&palteCod=" +
          this.deviceInfo.p03,
      });
    },
  },
  beforeDestroy(){
    this.endCd()
  },
};
</script>

<style  lang='scss'>
.deviceCheckUp {
  margin-bottom: 100px;
  .title {
    padding: 10px;
    background: #e8e4e4;
  }
  .InfoBox {
    .basicInfo {
      margin: 10px;
      .itemLine {
        min-width: 48%;
        display: inline-block;
        margin: 3% 0;

        .localimg {
          width: 50rpx;
          height: 50rpx;
          position: absolute;
          right: 22px;
          margin-top: -12px;
        }
      }
      .localsapn {
        width: 88%;
      }
      .chRed {
        color: chocolate;
      }
    }
  }
  .canBox {
    .list {
      height: 200px;
      overflow-y: scroll;
    }
    .canRow {
      margin: 12px 0;
      .itemLine {
        padding-left: 2%;
        width: 30%;
        display: inline-block;
        text-align: left;
      }
    }
  }
  .btnBottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  .loadInfo {
    width: 100%;
    text-align: center;
    line-height: 60rpx;
    font-size: 13px;
    color: rgb(81, 81, 81);
    display: flex;
    justify-content: center;
    margin-top: 20rpx;
  }
  .loading {
    height: 30rpx;
    width: 30rpx;
    margin-left: 12rpx;
    margin-top: 15rpx;
  }
}
.eeeColor {
  color: rgb(92, 89, 89);
}
.uni-collapse-cell__title {
  background: #e8e4e4;
}
</style>