<template>
  <view class="warkpage">
    <view class="warkpageSearch">
      <text class="warkpagetext">日期</text>
      <!-- <uni-datetime-picker
        class="warkpageInp"
        v-model="vModelDatetime"
        placeholder="请选择日期"
        start="2010-6-10 23:59:59"
        end="3021-6-10 23:59:59"
      ></uni-datetime-picker> -->
      <uni-datetime-picker
        class="warkpageInp"
        v-model="dateStart"
        type="date"
        :value="date"
        start="2020-6-15"
        end="2025-6-15"
        @change="StartdateChange"
      ></uni-datetime-picker>
    </view>
    <!-- <view class="warkpageSearch">
      <text class="warkpagetext">结束日期</text>
      <uni-datetime-picker
        class="warkpageInp"
        v-model="dateEnd"
        type="date"
        :value="date"
        start="2020-6-15"
        end="2025-6-15"
        @change="EnddateChange"
      ></uni-datetime-picker>
    </view> -->
    <view class="warkpageSearch">
      <text class="warkpagetext">负责人</text>
      <uni-easyinput
        v-model="search.userName"
        class="warkpageInp"
        placeholder="请输入负责人搜索"
      ></uni-easyinput>
    </view>
    <view class="btnBox">
      <view class="btnBoxin">
        <button
          type="primary"
          size="mini"
          :loading="loading"
          @click="searchData"
        >
          搜索
        </button>
        <button type="primary" size="mini" @click="openAdd">添加</button>
      </view>
    </view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scrollaaaa">
      <uni-collapse accordion="true">
        <uni-collapse-item
          v-for="(item, index) in workData"
          :key="index"
          :title="
            item.productTimeStr + '—' + item.userName + '—' + item.productName
          "
        >
          <view style="padding: 30rpx"> 日期：{{ item.productTimeStr }} </view>
          <view style="padding: 30rpx"> 产品名称：{{ item.productName }} </view>
          <view style="padding: 30rpx"> 线别：{{ item.line }} </view>
          <view style="padding: 30rpx"> 计划数：{{ item.annualTarget }} </view>
          <view style="padding: 30rpx"> 送检数：{{ item.sendTheNumber }} </view>
          <view style="padding: 30rpx">
            完成数：{{ item.completeTheNumber }}
          </view>
          <view style="padding: 30rpx">
            完成率(%)：{{ item.percentageComplete }}
          </view>
          <view style="padding: 30rpx">
            不良率(%)：{{ item.rejectRatio }}
          </view>
          <view style="padding: 30rpx"> 负责人：{{ item.userName }} </view>
          <view style="padding: 30rpx">
            未完成原因：{{ item.unfinished }}
          </view>
          <view style="padding: 30rpx"> 备注：{{ item.remark }} </view>
        </uni-collapse-item>
      </uni-collapse>
    </scroll-view>
    <view class="pageBtn" v-if="showPage">
      <view class="pageBtnBox">
        <button
          class="addBtn"
          type="default"
          size="mini"
          :disabled="disabledUp"
          @click="upPage"
        >
          上一页
        </button>
        {{ currentPage }}/{{ allPage }}
        <button
          class="downBtn"
          type="default"
          size="mini"
          :disabled="disabledDown"
          @click="nextPage"
        >
          下一页
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import { getSysWeekdayReportPage } from "../../API/workDaily";

export default {
  data() {
    return {
      disabledUp: true,
      disabledDown: false,
      allPage: 0,
      showPage: false,
      currentPage: 0,
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      dateStart:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      dateEnd: "",
      workData: [],
      value: "",
      loading: false,
      search: {
        userName: "",
        current: 1,
        size: 10,
        startTime: "",
        endTime: "",
      },
    };
  },
  onShow() {
    this.search.startTime = this.dateStart + " 00:00:00";
    this.search.endTime = this.dateStart + " 23:59:59";
    this.searchData();
    // setTimeout(() => {
    //   //方法调用的方式触发下拉刷新事件
    //   wx.startPullDownRefresh();
    // }, 1000);
  },
  // onPullDownRefresh() {
  // setTimeout(function () {
  //     uni.stopPullDownRefresh();
  // }, 1000);
  // },
  methods: {
    StartdateChange(val) {
      this.search.startTime = val + " 00:00:00";
      this.search.endTime = val + " 23:59:59";
      new Date();
    },
    EnddateChange(val) {
      this.search.endTime = val + " 23:59:59";
    },
    openAdd() {
      uni.navigateTo({
        url: "/pages/workDaily/addworklist",
      });
    },
    searchData() {
      this.loading = true;
      getSysWeekdayReportPage(this.search).then((res) => {
        if (res.data.flag && res.data.errorCode == 200) {
          this.workData = res.data.data.records;
          this.allPage = res.data.data.pages;
          this.currentPage = res.data.data.current;
          if (res.data.data.total < 11) {
            this.showPage = false;
          } else {
            this.showPage = true;
          }
          if (res.data.data.current == 1) {
            this.disabledUp = true;
            this.disabledDown = false;
          } else if (res.data.data.current == res.data.data.pages) {
            this.disabledUp = false;
            this.disabledDown = true;
          } else {
            this.disabledUp = false;
            this.disabledDown = false;
          }

          this.loading = false;
        } else {
          this.workData = [];
          this.loading = false;
        }
      });
    },
    upPage() {
      if (this.currentPage == 1) {
        this.search.current = 1;
      } else {
        this.currentPage = this.currentPage - 1;
        this.search.current = this.currentPage;
      }
      this.searchData();
    },
    nextPage() {
      if (this.currentPage < this.allPage) {
        this.currentPage = this.currentPage + 1;
        this.search.current = this.currentPage;
      } else {
        this.search.current = this.allPage;
      }
      this.searchData();
    },
  },
};
</script>

<style lang="scss" scoped>
.warkpage {
  width: 100%;
  .warkpageSearch {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .warkpagetext {
    width: 45px;
    margin-left: 5px;
  }
  .warkpageInp {
    width: 75%;
    margin-left: 20px;
  }
  .btnBox {
    position: relative;
    margin-top: 10px;
    height: 35px;
  }
  .btnBoxin {
    position: absolute;
    right: 20px;
  }
  .btnBox .btnBoxin button {
    margin-right: 10px;
  }
  .scrollaaaa {
    height: 65%;
  }
  .pageBtn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    .pageBtnBox {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .addBtn {
        margin-right: 10px;
      }
      .downBtn {
        margin-left: 10px;
      }
    }
  }
}
</style>