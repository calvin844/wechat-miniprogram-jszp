const URI = 'https://api.91jiaoshi.com/'
const fetch = require('./fetch')
const app = getApp()

/**
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Objece} params 参数
 * @return {Promise}       包含抓取任务的Promise
 */
function fetchApi(type, params) {
  return fetch(URI, type, params)
}

/**
 * 获取列表类型的数据
 * @param  {String} type   类型，例如：'coming_soon'
 * @param  {Number} page   页码
 * @param  {Number} count  页条数
 * @param  {String} search 搜索关键词
 * @return {Promise}       包含抓取任务的Promise
 */
function find(type, page = 1, count = 20, search = '') {
  const params = {
    start: (page - 1) * count,
    count: count,
    city: getApp().data.currentCity
  }
  return fetchApi(type, search ? Object.assign(params, {
      q: search
    }) : params)
    .then(res => res.data)
}

/**
 * 获取单条类型的数据
 * @param  {Number} id     ID
 * @return {Promise}       包含抓取任务的Promise
 */
function getCompany(id) {
  return fetchApi('company/get_company/' + id)
    .then(res => res.data)
}

function getAd() {
  return fetchApi('ad/get_ad')
    .then(res => res.data)
}

function getDistrict() {
  return fetchApi('category/get_provinces')
    .then(res => res.data)
}

function getSDistrict(p_value) {
  return fetchApi('category/get_cities_bycolumn/' + p_value)
    .then(res => res.data)
}


function getDistrictAll() {
  return fetchApi('category/get_district_all')
    .then(res => res.data)
}


function getArticleCategory() {
  return fetchApi('category/get_article_category')
    .then(res => res.data)
}

function getArticleList(search_str) {
  return fetchApi('article/get_article_list/' + search_str)
    .then(res => res.data)
}

function getCompanyList(search_str) {
  return fetchApi('company/get_company_list/' + search_str)
    .then(res => res.data)
}

function getJobsList(search_str) {
  return fetchApi('job/get_jobs_list/' + search_str)
    .then(res => res.data)
}

function getEmergencyJobList() {
  return fetchApi('job/get_emergency_jobs_list/')
    .then(res => res.data)
}

function getJob(id) {
  return fetchApi('job/get_job/' + id)
    .then(res => res.data)
}


function getJobsCategory() {
  return fetchApi('category/get_job_category')
    .then(res => res.data)
}

function getSubclass(p_value) {
  return fetchApi('category/get_job_subclass_bycolumn/' + p_value)
    .then(res => res.data)
}


function getEducation() {
  return fetchApi('category/get_education')
    .then(res => res.data)
}


function getCompanyType() {
  return fetchApi('category/get_company_type')
    .then(res => res.data)
}


function getExperience() {
  return fetchApi('category/get_experience')
    .then(res => res.data)
}


function getArticle(id) {
  return fetchApi('article/get_article/' + id)
    .then(res => res.data)
}

function getUserinfo(openid) {
  return fetchApi('user/get_user/' + openid)
    .then(res => res.data)
}

function getUserphone(encryptedData, iv, data, sessionKey) {
  return fetchApi('user/decryptData/' + encryptedData + '/' + iv + '/' + data + '/' + sessionKey)
    .then(res => res.data)
}

function setUserinfo(userid, openid) {
  return fetchApi('user/set_user/' + userid + '/' + openid)
    .then(res => res.data)
}

module.exports = {
  fetchApi,
  find,
  getCompany,
  getAd,
  getJobsList,
  getEmergencyJobList,
  getJob,
  getJobsCategory,
  getDistrict,
  getSDistrict,
  getDistrictAll,
  getArticleCategory,
  getSubclass,
  getEducation,
  getExperience,
  getCompanyList,
  getCompanyType,
  getArticleList,
  getArticle,
  getUserinfo,
  setUserinfo,
  getUserphone
}