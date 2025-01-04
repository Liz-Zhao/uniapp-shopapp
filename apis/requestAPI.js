// 基础配置
export const BASE_URL = 'http://127.0.0.1:3000'
const TIME_OUT = 10000

// 请求拦截器
const requestInterceptor = (config) => {
	// 添加token
	const token = uni.getStorageSync('token')
	if (token) {
		config.header = {
			...config.header,
			'Authorization': `Bearer ${token}`
		}
	}
	return config
}

// 响应拦截器
const responseInterceptor = (response) => {
	const {
		statusCode,
		data
	} = response

	if (statusCode >= 200 && statusCode < 300) {
		return Promise.resolve(data)
	}

	// 处理错误情况
	switch (statusCode) {
		case 401:
			// 未授权，跳转登录
			// uni.navigateTo({
			// 	url: '/pages/login/login'
			// })
			uni.showToast({
				title:'未登录'
			})
			break
		case 404:
			uni.showToast({
				title: '请求的资源不存在',
				icon: 'none'
			})
			break
		default:
			uni.showToast({
				title: '请求失败',
				icon: 'none'
			})
	}

	return Promise.reject(response)
}

// 封装请求方法
const request = (options = {}) => {
	return new Promise((resolve, reject) => {
		const config = {
            ...options,
			url: options.url ? (BASE_URL + options.url) : BASE_URL,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header || {},
			timeout: TIME_OUT,
			
		}
		// 应用请求拦截器
		const interceptedConfig = requestInterceptor(config)

		uni.request({
			...interceptedConfig,
			success: (res) => {
				resolve(responseInterceptor(res))
			},
			fail: (err) => {
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				})
				reject(err)
			}
		})
	})
}

// 导出便捷请求方法
export const http = {
	get: (url, data, options = {}) => {
		return request({
			url,
			method: 'GET',
			data,
			...options
		})
	},

	post: (url, data, options = {}) => {
		return request({
			url,
			method: 'POST',
			data,
			...options
		})
	},

	put: (url, data, options = {}) => {
		return request({
			url,
			method: 'PUT',
			data,
			...options
		})
	},

	delete: (url, data, options = {}) => {
		return request({
			url,
			method: 'DELETE',
			data,
			...options
		})
	}
}

// export default request