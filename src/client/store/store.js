import Vue from 'vue'
import Vuex from 'vuex'
import api from '../utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		ReportListActive: {
			active: 0
		},
		AuditListActive: {
			active: 0
		},
		ReportDetailActive: {
			active: 1
		},
		MobileCompaniesData: [],
		ClientCompaniesData: [],
		ReportsDetailData: {
			id: '',
			data: []
		},
		ReportDepartsDetailData: {
			id: '',
			data: []
		},
		OrdersDetailData: {
			id: '',
			data: []
		},
		PlanDepartListData: {
			id: '',
			data: []
		},
		PlanDepartQuestionsData: {
			id: '',
			data: []
		}
	},
	getters: {

	},
	mutations: {
		MobileCompaniesData(state, data) {
			state.MobileCompaniesData = data
		},
		ClientCompaniesData(state, data) {
			state.ClientCompaniesData = data
		},
		ReportsDetailData(state, data) {
			state.ReportsDetailData.data = data
		},
		ReportDepartsDetailData(state, data) {
			state.ReportDepartsDetailData.data = data
		},
		OrdersDetailData(state, data) {
			state.OrdersDetailData.data = data
		},
		PlanDepartListData(state, data) {
			state.PlanDepartListData.data = data
		},
		PlanDepartQuestionsData(state, data) {
			state.PlanDepartQuestionsData.data = data
		},
	},
	actions: {
		async getMobileCompanies({
			state,
			commit
		}) {
			const data = await api.getMobileCompanies()
			commit('MobileCompaniesData', data.data)
		},
		async getSearchMobileCompanies({
			state,
			commit
		}, search) {
			const data = await api.getSearchMobileCompanies(search)
			commit('MobileCompaniesData', data.data)
		},
		async getClientCompanies({
			state,
			commit
		}) {
			const data = await api.getClientCompanies()
			commit('ClientCompaniesData', data.data)
		},
		async getReportsDetail({
			state,
			commit
		}, id) {
			const data = await api.getReportsDetail(id)
			state.ReportsDetailData.id = id
			commit('ReportsDetailData', data.data)
		},
		async getReportDepartsDetail({
			state,
			commit
		}, id) {
			const data = await api.getReportDepartsDetail(id)
			state.ReportDepartsDetailData.id = id
			commit('ReportDepartsDetailData', data.data)
		},
		async getOrdersDetail({
			state,
			commit
		}, id) {
			const data = await api.getOrdersDetail(id)
			state.OrdersDetailData.id = id
			commit('OrdersDetailData', data.data)
		},
		async getPlanDepartList({
			state,
			commit
		}, id) {
			const data = await api.getPlanDepartList(id)
			state.PlanDepartListData.id = id
			commit('PlanDepartListData', data)
		},
		async getPlanDepartQuestions({
			state,
			commit
		}, id) {
			const data = await api.getPlanDepartQuestions(id)
			state.PlanDepartQuestionsData.id = id
			commit('PlanDepartQuestionsData', data.data)
		},
	}
})

export default store