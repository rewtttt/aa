import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/F-Index.vue'
import { useUserStore } from '@/stores'
// import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 首页、登录页、个人详情、文章详情皆为一级路由
    {
      path: '/',
      name: 'layout',
      component: Layout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/F-LoginIndex.vue')
    },
    {
      // 动态路由传参 params需要配置路径
      // 查询参数传参query不需要配置路径
      path: '/article',
      name: 'article',
      component: () => import('@/views/Article/F-ArticleCat.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/User/F-User.vue')
    }
  ]
})

// 配置前置路由守卫(用户中心一开始不能访问)
// 需要权限的页面就配置到这里来统一管理
router.beforeEach(to => {
  const useStore = useUserStore()
  if(!useStore.token && to.path === '/user'){
    ElMessage.error('没有访问权限,请先登录后在访问')
    return '/login'
  } else {
    return true
  }
})

export default router
