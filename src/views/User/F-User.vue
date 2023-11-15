<script setup>
import { House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
// 发送请求拿到用户头像

const router = useRouter()
const goToLayout = () => {
    // 跳转至首页
    router.push('/')
}

const userStore = useUserStore()
// 退出登录
const goExit = async () => {
    await ElMessageBox.confirm(
        '你确认退出吗?',
        '退出',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'Info',
        }
    )
    userStore.removeToken()
    ElMessage.success('退出成功')
    router.push('/login')
}
</script>

<template>
    <div class="header">
      <el-icon><House style="width: 2em; height: 3em;" @click="goToLayout"/></el-icon>
    </div>
    <div class="img-font">
        <img src="../../assets/pdx.png" class="img">
    </div>

    <div class="main">
      <el-button type="primary" plain>浏览历史</el-button>
      <el-button type="primary" plain>收藏夹</el-button>
      <el-button type="primary" plain @click="goExit">退出登录</el-button>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}

.img-font {
    display: flex;
    justify-content: center;
}

.img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    margin-top: 50px;
}

.main {
    display: flex;
    justify-content: center;
  margin-top: 20px;
}

</style>
