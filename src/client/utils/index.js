import Vue from 'vue'
import WechatJSSDK from 'wechat-jssdk/dist/client'
import api from './api'

export async function GetWechatJSSDK() {
	const signature = await api.getSignature()
	const config = {
		appId: signature.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
		timestamp: signature.timestamp, // 必填，生成签名的时间戳
		nonceStr: signature.nonceStr, // 必填，生成签名的随机串
		signature: signature.signature, // 必填，签名，见附录1
		success: function(wechatObj) {
			wechatObj.wx.hideAllNonBaseMenuItem()
		},
		error: function(err, wechatObj) {
			console.log('err', err)
		}, //微信签名失败回调函数, 跟 'errorCallback' 一样
		debug: false,
		jsApiList: ['hideAllNonBaseMenuItem']
	}
	const wechatObj = await new WechatJSSDK(config)
}

export async function Pusher() {
	const DataUser = await api.getUser()
	const user = `users.${DataUser.data.id}`
	console.log(Vue)
//	this.$echo.private(user).listen('SetAuditUserNotification', (payload) => {
//		console.log(payload)
//	})
}

export function hasClass(el, className) {
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
	return reg.test(el.className)
}

export function addClass(el, className) {
	if(hasClass(el, className)) {
		return
	}

	let newClass = el.className.split(' ')
	newClass.push(className)
	el.className = newClass.join(' ')
}

export function removeClass(el, className) {
	if(!hasClass(el, className)) {
		return
	}

	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
	el.className = el.className.replace(reg, ' ')
}

export function getRect(el) {
	if(el instanceof window.SVGElement) {
		let rect = el.getBoundingClientRect()
		return {
			top: rect.top,
			left: rect.left,
			width: rect.width,
			height: rect.height
		}
	} else {
		return {
			top: el.offsetTop,
			left: el.offsetLeft,
			width: el.offsetWidth,
			height: el.offsetHeight
		}
	}
}

export function formatIndexList(list) {
	const result = []
	delete list.ret_code
	for(let key in list) {
		result.push(list[key]);
	}
	return result
}

export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return false;
}

export function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function scrollLeft(element, endOffset) {
	var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fun) {
		setTimeout(fun, 1000 / 60);
	};

	function scrollTo(element, endOffset, params) {
		var startOffset;
		var scrollProp;
		if(params.horizontal) {
			startOffset = element.scrollLeft;
			scrollProp = 'scrollLeft';
		} else if(params.vertical) {
			startOffset = element.scrollTop;
			scrollProp = 'scrollTop';
		}

		var distance = endOffset - startOffset;
		var forward = true;
		if(distance == 0) {
			return;
		}

		forward = (distance > 0);

		function scroll() {
			var speed = 2 + Math.abs(endOffset - startOffset) / 5;
			if(!forward) {
				speed = -speed;
			}
			startOffset += speed;
			element[scrollProp] = startOffset;
			if(startOffset < endOffset && speed > 0 || startOffset > endOffset && speed < 0) {
				raf(scroll);
			}
		}

		scroll();
	}
	scrollTo(element, endOffset, {
		horizontal: true
	});
}

export function getBase64(file, callback) {
	var maxWidth = 640;
	if(file.files && file.files[0]) {
		var thisFile = file.files[0];
		//		if(thisFile.size > 2019200) {
		//			// mualert.alertBox("图片不能超过800K");  
		//			alert("图片不能超过2M");
		//			return
		//		};
		var reader = new FileReader();
		reader.onload = function(event) {
			var imgUrl = event.target.result;
			var img = new Image();
			img.onload = function() {
				var canvasId = 'canvasBase64Imgid',
					canvas = document.getElementById(canvasId);
				if(canvas != null) {
					document.body.removeChild(canvas);
				}
				var canvas = document.createElement("canvas");
				canvas.innerHTML = 'New Canvas';
				canvas.setAttribute("id", canvasId);
				canvas.style.display = 'none';
				document.body.appendChild(canvas);
				canvas.width = this.width;
				canvas.height = this.height;
				var imageWidth = this.width,
					imageHeight = this.height;
				if(this.width > maxWidth) {
					imageWidth = maxWidth;
					imageHeight = this.height * maxWidth / this.width;
					canvas.width = imageWidth;
					canvas.height = imageHeight;
				}
				var context = canvas.getContext('2d');
				context.clearRect(0, 0, imageWidth, imageHeight);
				context.drawImage(this, 0, 0, imageWidth, imageHeight);
				var base64 = canvas.toDataURL('image/png', 1);
				var imgbase = base64.substr(22);
				callback(imgbase)
				//this.imgUrl =   
			}
			img.src = imgUrl;
		}
		reader.readAsDataURL(file.files[0]);
	}
}

export function formatAppoint(appoint_cases) {
	appoint_cases.forEach(e => {
		delete e.created_at
		delete e.deleted_at
		delete e.updated_at
	})
	return appoint_cases
}