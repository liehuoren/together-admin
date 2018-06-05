import axios from '@/libs/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password,
    grant_type: 'password',
    scope: 'all'
  }
  return axios.request({
    url: '/oauth/token',
    data,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': 'Basic ZWl2ZXhWZkhVVnUzSVdKUXVJRTlUbXFOazNoZlEzWEE6'
    }
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
