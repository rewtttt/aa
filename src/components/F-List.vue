<template>
    <div class="box1">
        <p class="p1"><slot></slot></p>
        <div class="box2">
            <button @click="handleClick">点赞</button> &nbsp; &nbsp; &nbsp;<span>{{ num }}</span>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter()

    let num = ref(0) //点赞数
    let flag = localStorage.getItem('key') //取到值就是登录成功了

    const handleClick = () => {
        if(!flag){
            router.push('/index')
        }
        num.value++
    }
</script>

<style>
    .box1{
        width: 1000px;
        height: 110px;
        background-color: #efefef;
        display: flex;
        align-items: center;
    }
    .box2{
        margin-top: 25px;
    }
</style>