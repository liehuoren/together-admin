import axios from '@/libs/api.request'

export const getArticleList = () => {
  return axios.request({
    url: '/articles',
    method: 'get'
  })
}
