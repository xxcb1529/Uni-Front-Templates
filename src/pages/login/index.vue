<route lang="json5" type="page">
    {
        style: {
            navigationBarTitleText: '',
            navigationStyle: 'custom'
        }
    }
</route>
<template>
    <div @click="gotoIndex">登录页面</div>

</template>
<script lang="ts" setup>
import { useRouter } from 'uni-mini-router'
const router = useRouter()
const gotoIndex = () => {
    router.push({ path: '/pages/index/index' })
}

</script>
