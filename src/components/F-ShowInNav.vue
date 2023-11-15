<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
    items: Array
})

const router = useRouter()
const goToXQ = (id, content) => {
    // params需要路由配置一个 xxx/:id
    // 1.路径跳转params传参
    // router.push(`/article/${id}`);

    // // 2.命名路由跳转params传参
    // router.push({
    //     name: 'article',
    //     params: {
    //         id: id
    //     }
    // });

    // // 3.路径跳转query传参
    router.push({
        path: '/article',
        query: {
            id: id,
            content:content
        }
    })
    // // 4.命名路由跳转query传参
    // router.push({
    //     name: 'article',
    //     query: {
    //         id: id
    //     }
    // })
}

</script>

<template>
    <div class="main" v-for="(items, index) in items" :key=index>
        <div @click="goToXQ(items.id, items.content)">
            <div class="header">
                <span>User: ttq123</span>
                <span class="id">ID: {{ items.id }}</span>
            </div>
            <div class="content">
                <span>CatName: {{ items.title }}</span>
            </div>
            <div class="footer">
                <span>创建时间: {{ items.createTime }}</span>
                <span>更新时间: {{ items.updateTime }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main {
    margin-top: 20px;
    border-bottom: 2px solid #EDEFF6;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgba(245, 246, 247,.1);
}

.header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.content {
    margin-bottom: 20px;
}

.footer {
    display: flex;
    justify-content: space-between;
}
</style>
