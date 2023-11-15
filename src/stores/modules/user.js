// 保存用户状态 token等
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
    'user-message', 
    () => {
        // 在pinia里的直接token就可以访问
        // 定义token
        const token = ref('')
        // 暴露一个设置token的方法
        const setToken = (newToken) => {
          token.value = newToken
        }
        // 清空token的方法
        const removeToken = () => {
          token.value = ''
        }

      return {
        token,
        setToken,
        removeToken
      }
    },
    {
      // 开启持久化
      persist: true
    }
)