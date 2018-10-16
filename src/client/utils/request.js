import { getCookie, setCookie, delCookie } from './'
import router from '../router/router'
const Fly = require("flyio/dist/npm/fly")
const request = new Fly

request.interceptors.request.use((request) => {
	request.headers.Accept = 'application/json'
	request.headers.Authorization = 'Bearer ' + getCookie('mobile_token')
	return request
})

request.interceptors.response.use(
	(response, promise) => {
		return promise.resolve(response.data)
	},
	(err, promise) => {
		if(err.status == 401){
			router.push({name: 'WechatLogin'})
		}
		return promise.resolve()
	}
)

export default request