const router = require('express').Router()
const config = require('./config')
const axios = require('axios')
const UserRouter = require('./UserRouter')
const wechatConfig = {
	//第一个为设置网页授权回调地址
	wechatRedirectUrl: "https://wx.check.elinkport.com",
	appId: "wx36a613df95aa13eb",
	appSecret: "ac4f1a12a04070d4ce28a30f0d434546",
}
const Wechat = require('wechat-jssdk')
const wx = new Wechat(wechatConfig)

//配置微信环境
router.use('/get-signature', async(req, res) => {
	wx.jssdk.getSignature(req.query.url).then((signatureDate) => {
		res.json(signatureDate)
	})
})

router.use('/user', UserRouter)

router.use('/login', async(req, res, next) => {
	const code = req.query.code || void 0
	// 获取微信access_token与unionid用于登录
	const data = await getToken(code)
	const openid = data.openid
	const access_token = data.access_token
	const user = await getUserInfo(access_token, openid)
	res.cookie('openid', user.openid, null)
	res.cookie('nickname', encodeURIComponent(user.nickname), null)
	res.cookie('headimgurl', user.headimgurl, null)
	res.redirect('/#/WechatLogin')
})
// 获取微信的access_token
async function getToken(code) {
	const reqUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appid}&secret=${config.wx.secret}&code=${code}&grant_type=authorization_code&connect_redirect=1#wechat_redirect`
	const data = await axios.get(reqUrl)
	return data.data
}
// 获取微信用户信息
async function getUserInfo(access_token, openid) {
	const reqUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
	const data = await axios.get(reqUrl)
	return data.data
}

router.use('/*', (req, res) => {
    res.status(404).json('【SERVER ERROR】Interface Not Found !')
})

module.exports = router
