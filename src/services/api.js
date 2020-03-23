import { $axios } from './axios'
import { jsonToFormData } from '@/utils/form'
import * as path from './constants'

/***********
 * Auth API
 ***********/

/**
 * 登出
 */
export function logout(corpCode) {
  return $axios.post('logout', { corpCode })
}

/**
 * 取得 Auth 列表
 * @param {'BANNER' | 'CODE' | 'OPENING' | 'QRCODE' | 'RESUME'} pageId 頁面 ID
 */
export function getAuth(pageId) {
  return $axios.get(path.AUTH, { params: { pageId } })
}

/*************
 * Banner API
 *************/

/**
 * 取得 Banner 列表
 */
export function getBanners() {
  return $axios.get(path.BANNERS)
}

/**
 * 取得 Banner 資料
 * @param {String} id Banner Id
 */
export function getBanner(id) {
  return $axios.get(`${path.BANNER}/${id}`)
}

/**
 * 新增 Banner 資料
 * @param {*} data Banner 資料
 */
export function postBanner(data) {
  return $axios.post(path.BANNER, jsonToFormData(data, ['urlPc', 'urlPhone']))
}

/**
 * 刪除 Banner 資料
 * @param {string*} id Banner Id
 */
export function deleteBanner(id) {
  return $axios.delete(`${path.BANNER}/${id}`)
}

/**************
 * 字庫 API
 **************/

/**
 * 取得字庫列表
 */
export function getDictionaries(params) {
  return $axios.get(path.DICTIONARIES, { params })
}

/**
 * 取得字庫資料
 * @param {String} id 字庫 Id
 */
export function getDictionary(id) {
  return $axios.get(`${path.DICTIONARY_RESULT}/${id}`)
}

/**
 * 新增/修改字庫資料
 * @param {*} data 字庫資料
 */
export function postDictionary(data) {
  return $axios.post(path.DICTIONARIES, data)
}

/**********
 * 職缺 API
 **********/

/**
 * 取得職缺列表
 * @param {{ typeid: Number, wpid: Array, status: Number }} [params] 參數
 */
export function getOpenings(data) {
  if (data) {
    const wpid = data.wpid ? data.wpid.join(',') : null
    const params = { ...data, wpid }

    return $axios.get(path.OPENINGS, { params })
  }
  return $axios.get(path.OPENINGS)
}

/**
 * 編輯職缺列表排序
 * @param {*} data 職缺排序資料
 */
export function postOpeningsOrder(data) {
  return $axios.post(path.OPENINGS, { data: data })
}

/**
 *  取得職缺資料
 * @param {string} id 資料 id
 */
export function getOpening(id) {
  return new Promise((resolve, reject) => {
    $axios
      .get(`${path.OPENING}/${id}`)
      .then(response => {
        let { lang, skill } = response.data.data
        lang = lang ? lang.toString().split(',') : lang
        skill = skill ? skill.toString().split(',') : skill

        const result = response

        result.data.data = {
          ...result.data.data,
          skill,
          lang
        }
        resolve(result)
      })
      .catch(e => reject(e))
  })
}

/**
 * 編輯職缺資料
 * @param {string} id 資料 id
 * @param {*} data 職缺資料
 */
export function patchOpening(id, data) {
  let { lang, skill, wpid } = data
  lang = Array.isArray(lang) ? lang.join(',') : lang
  skill = Array.isArray(skill) ? skill.join(',') : skill
  wpid = Array.isArray(wpid) ? wpid.join(',') : skill

  return $axios.patch(`${path.OPENING}/${id}`, { ...data, lang, skill, wpid })
}

/**
 * 新增職缺資料
 * @param {*} data 職缺資料
 */
export function postOpening(data) {
  let { lang, skill, wpid } = data

  lang = Array.isArray(lang) ? lang.join(',') : lang
  skill = Array.isArray(skill) ? skill.join(',') : skill
  wpid = Array.isArray(wpid) ? wpid.join(',') : wpid

  return $axios.post(path.OPENING, { ...data, lang, skill, wpid })
}

/**************
 * 隱私權 API
 **************/

/**
 * 取得隱私權列表
 */
export function getPrivacies(params) {
  return $axios.get(path.PRIVACIES, { params })
}

/**
 * 取得隱私權資料
 * @param {String} id 隱私權 Id
 */
export function getPrivacy(id) {
  return $axios.get(`${path.PRIVACY}/${id}`)
}

/**
 * 新增隱私權資料
 * @param {*} data 隱私權資料
 */
export function postPrivacy(data) {
  return $axios.post(path.PRIVACY, data)
}

/**
 * 更新隱私權資料
 * @param {*} data 隱私權資料
 */
export function patchPrivacy(id, data) {
  return $axios.patch(`${path.PRIVACY}/${id}`, data)
}

/**************
 * QR Code API
 **************/

/**
 * 取得 QR Code
 */
export function getQRCode() {
  return $axios.get(`${path.QR_CODE}/1`)
}

/**
 * 編輯 QR Code
 * @param {*} data 資料
 */
export function patchQRCode(data) {
  return $axios.patch(`${path.QR_CODE}/1`, data)
}

/***********
 * 履歷 API
 ***********/

/**
 * 取得履歷列表
 * @param {{ ds: String, de: String }} [params] 參數
 */
export function getResumes(params) {
  return $axios.get(path.RESUMES, { params })
}

/***********
 * 選單 API
 **********/

/**
 * 取得選單列表
 * @param { String } id 選單類別 Id
 */
export function getCodeData(id) {
  return $axios.get(`${path.CODEDATAS}/${id}`)
}

/**
 * 編輯選單列表
 */
export function postCodeData(data) {
  return $axios.post(path.CODEDATAS, data)
}

/**
 * 取得選單列表
 * @param {'ALL' | 'OPENING' | 'WORKPLACE' | 'EDU' | 'INFORMATION'  | 'SCHOOL' | 'VETERAN' | 'LANGCONDITION' | 'SKILL' | 'LANGABILITY' } type 選單類型
 */
export function getCodes(type) {
  return $axios.get(path.CODES, { params: { type } })
}

/**********
 * 下載 API
 **********/

/**
 * 下載 Excel
 * @param {String} id 資料 Id
 */
export function getResumeExcel(ids) {
  const id = ids.length ? ids.join(',') : ''

  return $axios.post(path.RESUME_EXCEL, { id }, { responseType: 'arraybuffer' })
}

/**
 * 下載 PDF
 * @param {String} id 資料 Id
 */
export function getResumePdf(id) {
  return $axios.get(`${path.RESUME_PDF}/${id}`, {
    responseType: 'arraybuffer'
  })
}

/**
 * 下載 ZIP
 * @param {String} ids 資料 Id 列表
 */
export function getResumeZip(ids) {
  const id = ids.length ? ids.join(',') : ''

  return $axios.post(path.RESUME_ZIP, { id }, { responseType: 'arraybuffer' })
}

export function getUserInfo() {
  return $axios.get(path.USER_INFO, {
    data: {}
  })
}

export function getMenu() {
  return $axios.get(path.MENU, {
    data: {}
  })
}
