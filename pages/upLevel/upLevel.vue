<template>
  <view class="upLevel">
    <view class="InfoBox">
      <view class="title">设备基本信息(下拉刷新数据)</view>
      <view class="basicInfo">
        <view class="itemLine">
          终端ID： <span class="eeeColor">{{ deviceInfo.device_code }}</span>
        </view>
        <view class="itemLine">
          终端型号： <span class="eeeColor">{{ deviceInfo.deviceModel }}</span>
        </view>
        <view class="itemLine">
          硬件版本： <span class="eeeColor">{{ deviceInfo.p0f }}</span>
        </view>
        <view class="itemLine" style="width: 100%">
          boot版本：
          <span class="eeeColor">{{ deviceInfo.softwareVersion }}</span>
        </view>
        <view class="itemLine" style="width: 100%">
          固件版本： <span class="eeeColor">{{ deviceInfo.p05 }}</span>
        </view>
        <view class="itemLine" style="width: 100%">
          车牌号： <span class="eeeColor">{{ deviceInfo.p03 }}</span>
        </view>
      </view>
      <view class="loadInfo" v-if="check.state >= 0"
        >{{ check.ret }}
        <image
          class="loading"
          v-if="check.state == 0"
          src="/static/img/loading.gif"
        ></image>
      </view>
    </view>

    <view class="InfoBox">
      <view class="title">可选升级版本列表</view>
      <view class="basicInfo"></view>
      <button type="primary" class="saveBtn" @click="save">保存</button>
    </view>
  </view>
</template>

<script>
import { settingVehicleType, settingquery } from "@/API/svt";
import { isNull } from "@/common/filter";
import startCdOrder from "@/common/startCdOrder";
import { getDeviceBackdata } from "@/common/common";
export default {
  mixins: [startCdOrder],
  data() {
    return {
      deviceInfo: {},
      index: null,
      plateCodeTypes: [
        "大型汽车",
        "挂车",
        "小型汽车",
        "使馆汽车",
        "领馆汽车",
        "港澳入出境车",
        "教练汽车",
        "警用汽车",
        "普通摩托车",
        "轻便摩托车",
        "使馆摩托车",
        "领馆摩托车",
        "教练摩托车",
        "警用摩托车",
        "低速车",
        "临时行驶车",
        "临时入境汽车",
        "临时入境摩托",
        "拖拉机",
      ],
    };
  },
  created() {
    this.setpage("type");
    getDeviceBackdata().then((newData) => {
      this.deviceInfo = newData;
    });
  },
  methods: {
    PickerChange(e) {
      this.index = e.target.value;
    },
    save() {
      let type = this.plateCodeTypes[this.index];
      if (isNull(type)) {
        uni.showToast({
          title: "请填写车牌类型",
          icon: "none",
        });
        return;
      }
      settingVehicleType({
        sendMode: 0,
        deviceType: 1,
        deviceNumber: this.deviceInfo.deviceNumber,
        type,
      }).then((res) => {
        if (res.errorCode != 200 && res.data) {
          uni.showModal({
            title: "提示",
            content: "操作失败：" + res.msg,
            showCancel: false,
          });
        } else {
          //下发成功
          uni.showToast({
            title: "操作成功",
            duration: 800,
          });
          this.startCd(res.data.orderId);
          this.upPara();
        }
      });
    },
    //上报参数
    upPara: function () {
      settingquery({
        ids: 0,
        sendMode: 0,
        deviceType: 1,
        deviceNumber: this.deviceInfo.deviceNumber,
      });
    },
  },
};
</script>

<style  lang='scss' scoped>
.upLevel {
  margin-bottom: 100px;
  .InfoBox {
    .title {
      padding: 10px;
      background: #e8e4e4;
    }
    .basicInfo {
      margin: 10px;
      .itemLine {
        min-width: 48%;
        display: inline-block;
        margin: 3% 0;
      }
      .eeeColor {
        color: rgb(92, 89, 89);
      }
      .texTColor {
        color: #108ee9;
        position: absolute;
        right: 5px;
        margin-top: -16px;
      }
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
    .saveBtn {
      width: 86%;
      margin-left: 7%;
      height: 80rpx;
      line-height: 80rpx;
      color: #ffffff;
      font-size: 15px;
    }
  }
}
</style>