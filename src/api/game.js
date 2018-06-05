import { axios } from './index'
import qs from 'qs'

const game = {
  getGameTypeList (params) {
    var url = '/game-types'
    return axios.get(url, {params:params}).then(res => {
      return res
    })
    .catch(e => {
      return Promise.reject(e)
    })
  },

  createDiscuss (data) {
    return axios.post('/discusses', data)
      .then(res => {
        return res
      })
      .catch(e => {
        return Promise.reject(e)
      })
  },
  updateDiscuss (id, data) {
    var url = '/discusses/' + id
    return axios.put(url, data)
      .then(res => {
        return res
      })
      .catch(e => {
        return Promise.reject(e)
      })
  },
  deleteDiscuss (id) {
    var url = '/discusses/' + id
    return axios.delete(url)
      .then(res => {
        return res
      })
      .catch(e => {
        return Promise.reject(e)
      })
  },
  getDiscuss (id) {
    var url = '/discusses/' + id
    return axios.get(url)
      .then(res => {
        return res
      })
      .catch(e => {
        return Promise.reject(e)
      })
  }
  
}

export default game