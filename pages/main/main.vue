<template>
  <view class="content" v-if='hasLogin'>
    <view class="center">

      <ul  >
	   <li class="menuItem" @click="toWorkDaily">
		   <image  :src="workDailyicon"></image>
		   <span>工作日报</span>
	   </li>
	   <li class="menuItem" @click="toSVT">
		   <image  :src="svticon"></image>
		   <span>SVT工具</span>
	   </li>
	  </ul>
    </view>

  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      avatarUrl: "../../static/img/logo.png",
      workDailyicon: "../../static/img/more.png",
      svticon: "../../static/img/svt.png",
	  	logoutBtnLoading: false,
    };
  },
  computed: mapState(["hasLogin", "userName"]),
  onLoad() {
    // 如果没登录
    if (this.hasLogin) {
    } else {
      uni.reLaunch({
        url: '../login/login',
      });
    }
  },
  methods: {
    ...mapMutations(["login","logout"]),
			bindLogout() {

					this.logout();
						uni.reLaunch({
							url: '../login/login',
						});
			},
    toWorkDaily() {
      uni.navigateTo({
        url: "/pages/workDaily/workDaily",
      });
    },
    toSVT() {
      uni.navigateTo({
        url: "/pages/svt/svt",
      });
    },
  },
};
</script>

<style>
.content{
	padding: 0;
	  align-items: center;
}
.center{
	width: 100%;
	margin-top: 9%;
}
.logo {
  height: 300rpx;
  padding: 20rpx;
  box-sizing: border-box;
  background-color: #0faeff;
  	display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50rpx;
}
.logo-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 150rpx;
}

.logo-title {
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-left: 20rpx;
}

.uer-name {
  height: 60rpx;
  line-height: 60rpx;
  color: #ffffff;
}
.menuItem{
	display: flex;
    width: 150rpx;
    flex-direction: column;
    align-items: center;
	padding: 50rpx;
  float: left;
}
.menuItem image{
	    width: 80rpx;
    height: 80rpx;
}
	.btn-row{
		position: absolute;
		bottom: 10%;
		width: 400rpx;
	}
</style>
