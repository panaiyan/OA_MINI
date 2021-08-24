// 全局请求路径，也就是后端的请求基准路径
const BASE_URL = 'https://oa.cvnavi.com/api'
// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes = 0;
// 封装请求方法，并向外暴露该方法
const Http = (options) => {
	// 解构请求头参数
	let header = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': "Basic b2E6b2E=",
		...options.header
	};
	// 当前请求不是登录时请求，在header中加上后端返回的token
	if (options.url != 'login') {
		// header["Authorization"] = 'Bearer ' +uni.getStorageSync('token');
		header["Authorization"] = 'Bearer 4ae3f248-37e3-4ff5-9e8a-494de3781623'
	}
	ajaxTimes++;
	// 显示加载中 效果
	if (options.loadingFlag != false) {
		uni.showLoading({
			title: "加载中",
			mask: true,
		});
	}

	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'POST',
			data: options.data || {},
			header,
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			},
			// 完成之后关闭加载效果
			complete: () => {
				ajaxTimes--;
				if (ajaxTimes === 0) {
					//  关闭正在等待的图标
					uni.hideLoading();
				}
			}
		})
	})
}

export default Http