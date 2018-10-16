import request from './request'
import apiUrl from './apiUrl'
const api_url = apiUrl
const api = {
	//微信登陆
	getToken: (open_id) => request.post(`${api_url}/v1/clients/web/wechat/login`, {
		open_id: open_id
	}),
	//登陆用户信息
	getUser: () => request.get(`${api_url}/v1/user/profile`),
	//获取验证码
	postSmsCode: (phone) => request.post(`${api_url}/v1/get_sms_code`, {
		phone: phone
	}),
	//认证用户
	postCheckSmsCode: (data) => request.post(`${api_url}/v1/check_sms_code_invitation`, {
		phone: data.phone,
		sms_code: data.sms_code,
		invitation_code: data.invitation_code,
		username: data.username,
		open_id: data.open_id,
		wechat_name: data.wechat_name,
		wechat_avatar: data.wechat_avatar
	}),
	//微信端企业列表 （提交数据）
	getMobileCompanies: () => request.get(`${api_url}/v1/mobile_companies`),
	//微信端企业列表 （提交数据）搜索
	getSearchMobileCompanies: (search) => request.get(`${api_url}/v1/mobile_companies?search=${search}`),
	//微信端企业列表 （查看报告）
	getClientCompanies: () => request.get(`${api_url}/v1/client_companies`),
	//报告详情
	getReportsDetail: (id) => request.get(`${api_url}/v1/reports/${id}`),
	//报告部门详情
	getReportDepartsDetail: (id) => request.get(`${api_url}/v1/report_departs/${id}`),
	//报告分享授权
	postInvitations: (id, depart_ids) => request.post(`${api_url}/v1/reports/${id}/invitations`, {
		depart_ids: depart_ids
	}),
	//微信环境
	getSignature: () => request.get(`/api/get-signature`,{
		url: window.location.href.split('#')[0]
	}),
	//微信端订单详情（填写报告，查看报告）
	getOrdersDetail: (id) => request.get(`${api_url}/v1/mobile/orders/${id}`),
	//微信部门问题列表
	getPlanDepartList: (id) => request.get(`${api_url}/v1/plan_depart/${id}/mobile/questions`),
	//微信部门问题详情
	getPlanDepartQuestions: (id) => request.get(`${api_url}/v1/plan_depart_questions/${id}/mobile`),
	//调查过程提问回答
	patchPlanDepartQuestions: (client_answer, id) => request.patch(`${api_url}/v1/plan_depart_questions/${id}/client_answer_question`, {
		client_answer: client_answer
	}),
	//添加进一步提问
	postQuestionDetails: (form) => request.post(`${api_url}/v1/question_details`, {
		question: form.titleQue,
		answer: form.content,
		plan_depart_question_id: form.id
	}),
	//删除进一步提问
	deleteQuestionDetails: (id) => request.delete(`${api_url}/v1/question_details/${id}`),
	//进一步提问编辑
	patchQuestionDetails: (form) => request.patch(`${api_url}/v1/question_details/${form.id}`, {
		question: form.titleQue,
		answer: form.content
	}),
	//进一步问题详情
	getQuestionDetails: (id) => request.get(`${api_url}/v1/question_details/${id}`),
	//上传图片
	postUploadImage: (image) => request.post(`${api_url}/v1/upload_image`, image),
	//补充材料图片url
	patchPlanDepartQuestionsFile: (more_file, id) => request.patch(`${api_url}/v1/plan_depart_questions/${id}/update_question_more_files`, {
		more_file: more_file
	}),
	//最终结论内容
	deletePlanDepartQuestionsFile: (image_url_index, id) => request.post(`${api_url}/v1/plan_depart_questions/${id}/del_question_more_files`, {
		image_url_index: image_url_index
	}),
	//现场确认内容
	patchPlanDepartQuestionsConfirm: (confirm_text, id) => request.patch(`${api_url}/v1/plan_depart_questions/${id}/update_question_confirm_text`, {
		confirm_text: confirm_text
	}),
	//最终结论内容
	patchPlanDepartQuestionsConclusion: (form) => request.patch(`${api_url}/v1/plan_depart_questions/${form.id}/update_question_conclusion_text`, {
		conclusion: form.content,
		conclusion_status: form.severity
	}),
	//审核问题
	patchPlanDepartQuestionsAudit: (form) => request.patch(`${api_url}/v1/plan_depart_questions/${form.id}/audit_question`, {
		status: form.status,
		audit_text: form.content
	}),
	//批量审核问题
	patchAuditMoreQuestion: (form) => request.patch(`${api_url}/v1/plan_depart_questions/audit_more_question`, {
		status: form.status,
		question_ids: form.question_ids
	}),
	//生成报告
	postOrdersCreateReports: (id) => request.post(`${api_url}/v1/orders/${id}/create_reports`),
}

export default api