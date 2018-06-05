// axios 初始化设置已经拦截器设置
import axios from './http'
import user from './user'

// axios设置默认值
axios.defaults.timeout = 15000
axios.defaults.baseURL = 'https://together-api.zhlzzz.com'
// axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const api = {
  ...user // 登录相关api
}

// 注册vue插件
api.install = function (Vue, options) {
  if (api.install.installed) {
    return
  }
  api.install.installed = true
  Object.defineProperty(Vue.prototype, '$api', {
    get () {
      return api
    }
  })
}

export { api, axios }
