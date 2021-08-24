<template>
  <view class="content">
    <view class="imageCenter">
      <image
        style="width: 200px; height: 200px; background-color: #eeeeee"
        mode="center"
        :src="loginImg"
      ></image>
    </view>
    <view class="input-group">
      <view class="input-row border">
        <text class="title">账号：</text>
        <m-input
          class="m-input"
          type="text"
          clearable
          focus
          v-model="username"
          placeholder="请输入账号"
        ></m-input>
      </view>

      <view class="input-row border">
        <text class="title">密码：</text>
        <m-input
          type="password"
          displayable
          v-model="password"
          placeholder="请输入密码"
        ></m-input>
      </view>
    </view>
    <view class="btn-row">
      <button
        type="primary"
        class="primary"
        :loading="loginBtnLoading"
        @tap="bindLogin"
      >
        登录
      </button>
    </view>
     <view class='bottomCopyright'>
       <view class="copyright">© 上海势航网络科技有限公司</view>
        <view class="kfphone">客服电话：<text catchtap='callKf'>400-100-8256</text></view>
     </view>
  </view>
</template>

<script>
import { mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";
import hex_sha512 from "../../static/js/sha";
	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginBtnLoading:false,
				grant_type:'password',
				scope: 'server',
				username: 'root',
				password: '9527',
				loginImg:'../../static/img/login.png'
			}
		},

		methods: {
			...mapMutations(['login']),

			async loginByPwd() {
				if(!this.username||!this.password){
					return uni.showModal({
									content: '请输入用正确的账号和密码',
									showCancel: false,
					})
				}
				const data = {
					grant_type: 'password',
					scope: 'server',
					username: this.username,
					password:hex_sha512(hex_sha512(this.password) + "&" + this.username)
				};
				this.loginBtnLoading = true

				uni.request({
					url: 'https://oa.cvnavi.com/api/auth/oauth/token',
					 method: "POST",
					header: {
						'content-type':'application/x-www-form-urlencoded',
					'Authorization': "Basic b2E6b2E="
					},
					data:data,
					success: (res) => {

						let text=''
						if(res.data.access_token){
							uni.setStorageSync('token', res.data.access_token)
								uni.setStorageSync('username', res.data.realName)
								res.data.access_token&&this.toMain(res.data.realName);

						}else{
								 text=res.data.msg
							uni.showModal({
									content: text,
									showCancel: false,
								})
						}
						this.loginBtnLoading = false

					}
				});
			},

			bindLogin() {

						this.loginByPwd()

			},
			getUserInfo() {

			},

			toMain(userName) {
				this.login(userName)
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '../main/main',
				});

				// 	uni.navigateTo({
        // url: "/pages/svt/svt",
				// })
			},
		}


	}
</script>

<style>
.content{
	align-items: center;
    /* justify-content: space-evenly; */
}
.btn-row {
  width: 500rpx;
}
.bottomCopyright{
  position: absolute;
  bottom: 50px;
  color: #4a4b4c;
}
.input-group {
	margin-bottom:30%;
}
</style>
