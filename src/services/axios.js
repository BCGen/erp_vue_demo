import axios from 'axios'

const $axios = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

$axios.interceptors.response.use(
  response => {
    const { data, status } = response
    /** 需跳轉至登入頁的狀態碼 */
    const returnLoginCodes = ['9996', '9999']

    if (status === 403) {
      window.location = '/'
    } else if (
      status === 200 &&
      data.rtnCode &&
      returnLoginCodes.includes(data.rtnCode.toString())
    ) {
      window.location = '/erp/login'
    }

    return response
  },
  error => {
    return Promise.reject(error)
  }
)

function getBaseURL() {
  const isDev = process.env.NODE_ENV === 'development'
  // 依照 domain 取得 api url
  const baseUrl = `${getOrigin()}/erp`
  const baseUrlDev = process.env.VUE_APP_AXIOS_BASE_URL_DEV

  return isDev ? baseUrlDev || baseUrl : baseUrl
}

function getOrigin() {
  const { host, origin, protocol } = window.location
  return origin || `${protocol}://${host}`
}

export { $axios }
