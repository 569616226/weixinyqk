import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import './styles/index.css'
import { getCookie, setCookie, GetWechatJSSDK } from './utils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import initRichText from './utils/initHTMLEditor'
import 'font-awesome/css/font-awesome.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueClipboard from 'vue-clipboard2'
import Pusher from 'pusher-js'
import VueEcho from 'vue-echo'
import Echo from "laravel-echo"
window.io = require('socket.io-client')
import api from './utils/api'

Vue.use(ElementUI)
Vue.use(Vant)
initRichText()
Vue.use(VueClipboard)

Vue.config.debug = true
Vue.config.productionTip = false
//动态设置title
Vue.directive('title', {
	inserted: function(el, binding) {
		document.title = el.dataset.title
	}
})

//广播
const EchoInstance = new Echo({
	broadcaster: 'socket.io',
	host: 'https://echo.elinkport.com:6001'
})
Vue.use(VueEcho, EchoInstance)

router.beforeEach((to, from, next) => {
	if(to.name == 'Share') {
		next()
	} else {
		if(getCookie('openid')) {
			if(getCookie('mobile_token')) {
				if(to.path == '/') {
					next("/WechatLogin")
				} else {
					if(to.name != 'ShareReport') {
						GetWechatJSSDK()
						next()
					} else {
						next()
					}
				}
			} else {
				if(to.name == 'AuthCustomer' || to.name == 'WechatLogin') {
					next()
				} else {
					next("/WechatLogin")
				}
			}
			next()

		} else {
			if(to.name == 'auth') {
				next()
			} else {
				next("/auth")
			}
		}
	}
})

new Vue({
	el: '#app',
	router: router,
	store: store,
	template: '<App/>',
	components: {
		App
	},
	methods: {
		async getUsersId() {
			const data = await api.getToken(getCookie('openid'))
			setCookie('mobile_token', data.access_token)
			const DataUser = await api.getUser()
			if(DataUser.data.is_audit.toString() != getCookie('is_audit') || DataUser.data.is_frozen.toString() != getCookie('is_frozen') || DataUser.data.is_client_admin.toString() != getCookie('is_client_admin')) {
				this.$router.push({
					name: 'WechatLogin'
				})
			}
			const socketId = this.$echo.socketId()
			const userid = `user.${DataUser.data.id}`
			this.$echo.connector.options.auth.headers['X-Socket-ID'] = socketId
			this.$echo.channel(userid).listen('.private.set_audit_user', (e) => {
				if(e.id == DataUser.data.id) {
					const is_audit = e.is_audit
					if(is_audit.toString() != getCookie('is_audit')) {
						this.$router.push({
							name: 'WechatLogin'
						})
					}
				}
			}).listen('.private.frozen_user', (e) => {
				if(e.id == DataUser.data.id) {
					const is_frozen = e.is_frozen
					if(is_frozen.toString() != getCookie('is_frozen')) {
						this.$router.push({
							name: 'WechatLogin'
						})
					}
				}
			}).listen('.private.set_client_admin_user', (e) => {
				if(e.id == DataUser.data.id) {
					const is_client_admin = e.is_client_admin
					if(is_client_admin.toString() != getCookie('is_client_admin')) {
						this.$router.push({
							name: 'WechatLogin'
						})
					}
				}
			})
		}
	},
	mounted() {
		this.getUsersId()
	}
})