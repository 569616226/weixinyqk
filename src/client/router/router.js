import Vue from 'vue'
import Router from 'vue-router'

import auth from './../pages/auth' //验证
import WechatLogin from './../pages/WechatLogin' //微信登陆
import AuthCustomer from './../pages/AuthCustomer' //认证客户 || 认证顾问
/*********************************顾问*********************************/
import AuthSuccess from './../pages/AuthSuccess' //认证成功
import SelectionEnterprises from './../pages/SelectionEnterprises' //选择企业
import FillReport from './../pages/FillReport' //填写报告
import Auditing from './../pages/Auditing' //我的审核
import Project from './../pages/Project' //项目进展
import ReportList from './../pages/ReportList' //报告列表
import ReportDetail from './../pages/ReportDetail' //报告详情-调查过程
import ReportDetailField from './../pages/ReportDetailField' //报告详情-现场确认
import ReportDetailFinal from './../pages/ReportDetailFinal' //报告详情-最终结论
import AddQuestion from './../pages/AddQuestion' //添加提问记录
import AddField from './../pages/AddField' //添加现场确认
import AddConclusion from './../pages/AddConclusion' //填写结论
import AuditList from './../pages/AuditList' //审核列表
import AddDismissal from './../pages/AddDismissal' //驳回原因
/********************************企业主*********************************/
import SelectReport from './../pages/SelectReport' //选择报告
import ReportIndex from './../pages/ReportIndex' //报告主页
import DepartDetailSum from './../pages/DepartDetailSum' //详情报告总数
import DepartDetail from './../pages/DepartDetail' //详情报告
import ShareDepart from './../pages/ShareDepart' //选择分享部门
import ShareReport from './../pages/ShareReport' //分享报告
import Share from './../pages/Share' //分享

const parentComponent = {
	template: '<router-view></router-view>'
}

Vue.use(Router)

var router = new Router({
	routes: [{
		path: '/auth',
		name: 'auth',
		meta: {
			title: '微信授权'
		},
		component: auth
	}, {
		path: '/WechatLogin',
		name: 'WechatLogin',
		meta: {
			title: '微信登陆'
		},
		component: WechatLogin
	}, {
		path: '/Consultant',
		component: parentComponent,
		meta: {
			title: '顾问'
		},
		children: [{
			name: 'AuthCustomer',
			path: 'AuthCustomer',
			meta: {
				title: '认证用户'
			},
			component: AuthCustomer
		}, {
			name: 'AuthSuccess',
			path: 'AuthSuccess',
			meta: {
				title: '认证成功'
			},
			component: AuthSuccess
		}, {
			name: 'SelectionEnterprises',
			path: 'SelectionEnterprises',
			meta: {
				title: '选择企业'
			},
			component: SelectionEnterprises
		}, {
			name: 'FillReport',
			path: 'FillReport/:id',
			meta: {
				title: '填写报告'
			},
			component: FillReport
		}, {
			name: 'Auditing',
			path: 'Auditing/:id',
			meta: {
				title: '我的审核'
			},
			component: Auditing
		}, {
			name: 'Project',
			path: 'Project/:id',
			meta: {
				title: '项目进展'
			},
			component: Project
		}, {
			name: 'ReportList',
			path: 'ReportList/:id',
			meta: {
				title: '报告列表'
			},
			component: ReportList
		}, {
			name: 'ReportDetail',
			path: 'ReportDetail/:id',
			meta: {
				title: '报告详情'
			},
			component: ReportDetail
		}, {
			name: 'ReportDetailField',
			path: 'ReportDetailField/:id',
			meta: {
				title: '报告详情'
			},
			component: ReportDetailField
		}, {
			name: 'ReportDetailFinal',
			path: 'ReportDetailFinal/:id',
			meta: {
				title: '报告详情'
			},
			component: ReportDetailFinal
		}, {
			name: 'AddQuestion',
			path: 'AddQuestion/:id',
			meta: {
				title: '添加提问记录'
			},
			component: AddQuestion
		}, {
			name: 'EditQuestion',
			path: 'EditQuestion/:id',
			meta: {
				title: '编辑提问记录'
			},
			component: AddQuestion
		}, {
			name: 'AddField',
			path: 'AddField/:id',
			meta: {
				title: '添加现场确认'
			},
			component: AddField
		}, {
			name: 'EditField',
			path: 'EditField/:id',
			meta: {
				title: '编辑现场确认'
			},
			component: AddField
		}, {
			name: 'AddConclusion',
			path: 'AddConclusion/:id',
			meta: {
				title: '填写结论'
			},
			component: AddConclusion
		}, {
			name: 'EditConclusion',
			path: 'EditConclusion/:id',
			meta: {
				title: '编辑结论'
			},
			component: AddConclusion
		}, {
			name: 'AuditList',
			path: 'AuditList/:id',
			meta: {
				title: '审核列表'
			},
			component: AuditList
		}, {
			name: 'AddDismissal',
			path: 'AddDismissal/:id',
			meta: {
				title: '驳回原因'
			},
			component: AddDismissal
		}]
	}, {
		path: '/Owner',
		component: parentComponent,
		meta: {
			title: '企业主'
		},
		children: [{
			name: 'SelectReport',
			path: 'SelectReport',
			meta: {
				title: '诊断报告'
			},
			component: SelectReport
		}, {
			name: 'ReportIndex',
			path: 'ReportIndex/:id',
			meta: {
				title: '报告主页'
			},
			component: ReportIndex
		}, {
			name: 'DepartDetailSum',
			path: 'DepartDetailSum/:id',
			meta: {
				title: '详情报告'
			},
			component: DepartDetailSum
		}, {
			name: 'DepartDetail',
			path: 'DepartDetail',
			meta: {
				title: '详情报告'
			},
			component: DepartDetail
		}, {
			name: 'ShareDepart',
			path: 'ShareDepart/:id',
			meta: {
				title: '选择分享部门'
			},
			component: ShareDepart
		}, {
			name: 'ShareReport',
			path: 'ShareReport/:id',
			meta: {
				title: '分享报告'
			},
			component: ShareReport
		}, {
			name: 'Share',
			path: 'Share',
			meta: {
				title: '分享'
			},
			component: Share
		}]
	}],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

export default router