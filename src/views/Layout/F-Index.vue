<style scoped>
.top-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
}

.top-bar-1 {
    margin-top: 2vw;
}

.font-father {
    display: flex;
    overflow-x: auto;
    height: 50px;
    position: relative;
}

.font {
    margin-top: 20px;
    flex: 1 0 auto;
    font-size: 20px;
    margin-left: 3vw;
    color: darkgrey;
}

.last {
    margin-right: 20px;
}

.btn1 {
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
    position: sticky;
    right: 0;
    line-height: 30px;
    margin-top: 10px;
}

.btn2 {
  height: 50px;
  width: 50px;
  border-radius:50%;
  background: url(src/assets/pdx.png) no-repeat;
  background-size: cover;

}

::-webkit-scrollbar {
    /* 去除横向滚动条 */
    display: none;
}
</style>
<template>
    <div>
        <div class="header">
            <div class="top">
                <div class="top-bar">
                    <div class="top-bar-1"><span style="font-size: 18px;">文章</span>
                    </div>
                    <div>
                        <button class="btn2" @click="goToUser"></button>
                        <!-- <button class="btn2">二</button> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="font-father" v-show="flag1">
                <!-- 给最后一个元素单独设置样式 -->
                <span v-show="flag1" class="font" v-for="(items, index) in articleCats" :key="index"
                    :class="index === articleCats.length - 1 ? 'last' : ''">
                    {{ items.catName }}
                </span>
                <button class="btn1" @click="handleClick()" v-show="flag1">more</button>
            </div>
            <div v-show="!flag2" class="server">
                <van-search show-action label="选择" v-model="search" placeholder="搜索频道">
                    <template #action>
                        <div @click="handleClick()" style="font-size: 20px;">×</div>
                    </template>
                </van-search>
                <van-grid>
                    <van-grid-item text="后端" @click="gridClick" />
                    <van-grid-item text="前端" @click="gridClick" />
                    <van-grid-item text="算法" @click="gridClick" />
                    <van-grid-item text="视频" @click="gridClick" />
                    <van-grid-item text="云原生" @click="gridClick" />
                    <van-grid-item text="云平台" @click="gridClick" />
                    <van-grid-item text="前沿技术" @click="gridClick" />
                    <van-grid-item text="运维" @click="gridClick" />
                    <van-grid-item text="服务器" @click="gridClick" />
                    <van-grid-item text="操作系统" @click="gridClick" />
                    <van-grid-item text="软件工程" @click="gridClick" />
                    <van-grid-item text="测试" @click="gridClick" />
                    <van-grid-item text="搜索" @click="gridClick" />
                    <van-grid-item text="安全" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="后端" @click="gridClick" />
                    <van-grid-item text="前端" @click="gridClick" />
                    <van-grid-item text="移动开发" @click="gridClick" />
                    <van-grid-item text="编程语言" @click="gridClick" />
                    <van-grid-item text="搜索" @click="gridClick" />
                    <van-grid-item text="安全" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="后端" @click="gridClick" />
                    <van-grid-item text="前端" @click="gridClick" />
                    <van-grid-item text="移动开发" @click="gridClick" />
                    <van-grid-item text="编程语言" @click="gridClick" />
                    <van-grid-item text="搜索" @click="gridClick" />
                    <van-grid-item text="安全" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="游戏" @click="gridClick" />
                    <van-grid-item text="后端" @click="gridClick" />
                    <van-grid-item text="前端" @click="gridClick" />
                    <van-grid-item text="移动开发" @click="gridClick" />
                    <van-grid-item text="编程语言" @click="gridClick" />
                </van-grid>
            </div>
        </div>
    </div>
    <div class="main" v-show="flag2">
        <el-card style="margin-top: 5px;">
            <h1 style="font-weight: bold; font-size:25px; color: #000; margin-bottom: 20px;" class="h1">文章列表</h1>
            <TShowInNav :items="processedData"></TShowInNav>
            <el-empty description="没有数据" v-if="showEmpty" />
        </el-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import TShowInNav from '@/components/F-ShowInNav.vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores'
import { getListServe,getArticleListServe } from '@/api/article.js'
// 没有数据时占位
const showEmpty = ref(false)

const search = ref('');
let flag1 = ref(true)
let flag2 = ref(true)

const gridClick = () => {
    console.log('我被点击了')
}

const handleClick = () => {
    flag1.value = !flag1.value
    flag2.value = !flag2.value
}

// token
// const token = "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MDA1NjUzNTUsInN1YiI6InR0cTEyMyIsImlhdCI6MTY5Nzk3MzM1NTM2MX0.rFPWLCKiLTaKqdjMfwq1aRvnMP2p3AO7hL01z57swnr0-6f9LK5D0_VhyF5RbaJN-QqOrd4WYKI_FjzqSiphIQ"

// 储存文章
const articleCats = ref([])

// 创建一个 ref 来存储处理后的时间
const processedData = ref([]);

const userStore = useUserStore()
// 获取文章分类接口的方法
const getList = async () => {
    if (userStore.token) {
        const res = await getListServe(userStore.token)
        articleCats.value = res.data.data.articleCats
    }else{
        console.log('没有数据')
    }
}


// 获取文章列表
const getArticleList = async () => {
    if (userStore.token) {
        const res = await axios.get('https://api.jqrjq.cn/api/article/all', {
            headers: {
                'token': userStore.token
            }
        })
        // 处理时间
        res.data.data.articles.map(article => {
            const processedArticle = {
                // 其它照旧展开
                ...article,
                // 调用时间处理函数处理接口返回的时间
                updateTime: formatDate(article.updateTime),
                createTime: formatDate(article.createTime)
            };
            processedData.value.push(processedArticle);
        })

        showEmpty.value = false
    } else {
        showEmpty.value = true
        console.log('没有数据')
    }
}

// 辅助函数，用于格式化日期
function formatDate(dateString) {
    //创建时间对象 
    const date = new Date(dateString);
    // 调用时间对象的方法返回  
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

onMounted(() => {
    getList()
    getArticleList()
})


// 一上来的用户中心是不给访问的
const router = useRouter()
const goToUser = () => {
    router.push('/user')
}
</script>

