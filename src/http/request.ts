import { message } from 'antd'
import axios from 'axios'

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? "http://localhost:8888/" : "http://www.ndzy01.com:8888/",
    // process.env.NODE_ENV === "production" ? "http://localhost:8888/" : "http://www.ndzy01.com:8888/",
  timeout: 60000, // 请求超时时间
})

//添加一个响应拦截器
service.interceptors.response.use(
  function (response) {
    if (response.data.status === 500) {
      message.error('服务器出错！')
      return Promise.reject('服务器出错！')
    }
    return response
  },
  function (err) {
    message.error('网络错误！')
    return Promise.reject(err)
  }
)

export default service