import axios from 'axios'
// 导入token
import { useUserStore } from '@/stores'
// 导入router
import router from '@/router'

// 配置基地址
const baseURL = 'https://api.jqrjq.cn'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  // 超时时间
  timeout: 1000
})

// 请求拦截器和响应拦截器都是要根据接口文档和axios实例配置的
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const userStore = useUserStore()
    // 如果用户token存在
    if (userStore.token) {
      // 发送请求携带请求头
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
      // 处理成功
      return res
  },
  (err) => {
    // 处理401错误 特殊错误(权限不足或token过期) => 拦截到登录
    // 如果401状态码存在就是错误
    if (err.response?.status === 401) {
      router.push('/login')
    }

    // 捕获错误的失败-> 默认的错误，只要给提示
    // ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

// axios实例默认导出
export default instance
// 基地址默认导出
export { baseURL }
