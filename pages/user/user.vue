<template>
	<view class="">
		<view class="center">
			<view class="logo" >
				<image class="logo-img" :src="avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">你好!  {{userName}}</text>
					<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
				</view>
			</view>
			
			
       
       <button open-type='contact' style='border-bottom:none;' class="row shareBtn">
                    <image src="/static/img/kf.png" class="icon" ></image>
                    <view class="label" style="">联系客服</view>
                    <image class="rightArr" src="/static/img/right.png"></image> 
        </button>
         <!-- <view class="row" catchtap='updatePwd'>
                    <image src="../../static/img//pwd.png" class="icon"></image>
                    <text class="label" >修改密码</text>
                    <image class="rightArr" src="../../static/img//right.png"></image>
        </view> -->
        <view class="row" :loading="logoutBtnLoading" @tap="bindLogout">
                    <image src="/static/img/OFF.png" class="icon"></image>
                    <text class="label" >退出登录</text>
                    <image class="rightArr" src="/static/img/right.png"></image>
        </view>
        
       
		<!-- <view class="btn-row">
				<button class="primary" type="primary" :loading="logoutBtnLoading" @tap="bindLogout">退出登录</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		univerifyLogin
	} from '@/common/univerify.js'

	export default {
		data() {
			return {
				avatarUrl: "../../static/img/logo.png",
				logoutBtnLoading: false,
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName'])
		},

		methods: {
			...mapMutations(['logout']),
			
			bindLogout() {
				
					this.logout();
						uni.reLaunch({
							url: '../login/login',
						});
				
			},
			
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	button {
		width: 100%;
	}

	.center {
		flex-direction: column;
		    align-items: center;
	}

	.logo {
		width: 750rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #0faeff;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		color: #FFFFFF;
	}

	.row{
    width: 90%;
    border-bottom: solid thin #f5f5f5;
    height: 100rpx;
    line-height: 90rpx;
    display: flex;
}

.icon{
  height: 50rpx;
  width: 50rpx;
  position: relative;
  margin-top: 25rpx;

}

.label{
    line-height: 100rpx;
    display: inline-block;
    flex: 1;
    margin-left: 30rpx;
    font-family: '微软雅黑';
    font-size: 14px;
    font-weight: normal;

}

.rightArr{
  width: 60rpx;
  height: 60rpx;
  position: relative;
  float: right;
  top: 20rpx;
  right: -20rpx;
}
.shareBtn{
  padding-left: 0rpx;
  padding-right: 0rpx;
      width: 90%;
    margin-left: 5%;
  border-radius: 0px;
  text-align: left;
}
.shareBtn::after {
  border: 0;
}
</style>
