import { login, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/utils'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        // login({
        //   username,
        //   password
        // }).then(res => {
        //   const data = res.data
        //   commit('setToken', data.access_token)
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        commit('setToken', 'zzz')
        resolve()
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('token', '')
        //   commit('token_type', '')
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(res => {
        //   const data = res.data
        //   commit('setAvator', data.avator)
        //   commit('setUserName', data.user_name)
        //   commit('setUserId', data.user_id)
        //   commit('setAccess', data.access)
        //   resolve(data)
        // }).catch(err => {
        //   reject(err)
        // })
        commit('setAvator', 'avator')
        commit('setUserName', 'user_name')
        commit('setUserId', 'user_id')
        commit('setAccess', [0])
        resolve()
      })
    }
  }
}
