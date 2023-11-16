<script setup>
import { Message, Lock, User } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'

// 切换登录注册
const isShow = ref(true)

// 绑定表单对象
const form = ref()
// 表单对象
const fromModel = ref({
    email: '',
    password: '',
    userName: ''
})
const loading = ref(false)
// 表单校验规则
const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { pattern: /^\S{8,20}$/, message: '密码必须是8-20位的非空字符', trigger: 'blur' }
    ],
    userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
            min: 8,
            max: 20,
            message: '用户账号的长度在8到20之间',
            trigger: 'blur'
        }
    ]
}
// 登录校验
// 1.要将token存到持久化插件中
// 2.跳转到首页
const userStore = useUserStore()

// 登录
const login = async () => {
    // 表单封装的校验函数
    await form.value.validate()
    loading.value = true
    await axios.post('https://api.jqrjq.cn/api/mobile/elogin', fromModel.value)
        .then(res => {
            userStore.token = res.data.data.userinfo.token;
            ElMessage.success('登录成功')
            router.push('/')
        })
        .catch(err => {
            console.log(err);
            ElMessage.error('邮箱或密码错误,请重新输入!')
            // 清空表单
            fromModel.value = {
                email: '',
                password: '',
                userName: ''
            }
        })
        loading.value = false
        
}
// 注册
const register = async () => {
    // 饿了么表单封装的校验函数
    await form.value.validate()
    isShow.value = true
    await axios.post('https://api.jqrjq.cn/api/mobile/eregister', fromModel.value)
        .then(res => {
            ElMessage.success('注册成功,去登录吧!')
            isShow.value = false
        })
        .catch(err => {
            console.log(err);
            ElMessage.error('注册失败!')
            // 清空表单
            fromModel.value = {
                email: '',
                password: '',
                userName: ''
            }
        })
}

// 切换时清空表单内容(利用watch来监视ref变量就是在监视切换)
watch(isShow, () => {
    fromModel.value = {
        email: '',
        password: '',
        userName: ''
    }
})
</script>
<template>
    <el-row v-if="isShow"  v-loading="loading" element-loading-text="Loading...">
        <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark" />
            <div class="img-font">
                <img src="@/assets/pdx.png" class="img">
            </div>
            <div style="margin: 120px;"></div>
            <el-form :model="fromModel" :rules="rules" ref="form">
                <el-form-item prop="email">
                    <el-input v-model="fromModel.email" placeholder="请输入你的邮箱" size="large" :prefix-icon="Message" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入你的密码" :prefix-icon="Lock" type="password" show-password size="large"
                        v-model="fromModel.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100vw" @click="login">用户登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" class="reg">
            <el-button class="reg-font" type="success" @click="isShow = false">用户注册</el-button>
        </el-col>
        <router-link to="/" class="index">返回首页</router-link>
    </el-row>
    <el-row v-else v-loading="loading">
        <el-col :span="24">
            <div class="grid-content ep-bg-purple-dark" />
            <div class="img-font">
                <img src="@/assets/pdx.png" class="img">
            </div>
            <div style="margin: 90px;"></div>
            <el-form :model="fromModel" :rules="rules" ref="form">
                <el-form-item prop="email">
                    <el-input v-model="fromModel.email" placeholder="请输入你的邮箱" size="large" :prefix-icon="Message" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入你的密码" :prefix-icon="Lock" type="password" show-password size="large"
                        v-model="fromModel.password" />
                </el-form-item>
                <el-form-item prop="userName">
                    <el-input placeholder="请输入你的用户名" :prefix-icon="User" size="large" v-model="fromModel.userName" />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" style="width: 100vw" @click="register">用户注册</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" class="reg">
            <el-button class="reg-font" type="primary" @click="isShow = true">用户登录</el-button>
        </el-col>
        <router-link to="/" class="index">返回首页</router-link>
    </el-row>
</template>
<style scoped lang="less">
.img {
    width: 100vw;
    height: 250px;
}

.reg {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.reg-font {
    flex: 1;
}

.index {
    width: 100%;
    margin-top: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #D7D7D7;
    box-shadow: 1px 1px 1px 1px #fff;
    border-radius: 3px;
}
</style>