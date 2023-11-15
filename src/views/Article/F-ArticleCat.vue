<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()
// 在onMounted中发送请求拿到该文章详情... 通过one那个接口 但是这里我直接路由传参了
</script>
<template>
    <el-card class="box-card">
        <h1>文章详情</h1>
        <div style="margin-top: 20px; padding-left: 10px; padding-right: 10px;">
            这是文章id为:{{ route.query.id }}的文章详情.........
        </div>
        <div class="content">
            {{  route.query.content }}
        </div>
    </el-card>
</template>
<style scoped>
.box-card {
    width: 100vw;
    height: 100vw;
}

h1 {
    font-size: 20px;
    font-weight: bold;
    margin-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
}

.content{
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
}
</style>