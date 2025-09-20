<template>
    <el-container style="width: 100%; height: 100%;">
        <el-header style="height: 6%; display: flex; align-items: center; position: relative;">
            <div>
                <a-space>
                    <el-button size="large" @click=handleClick plain>
                        <el-icon><Operation /></el-icon>
                    </el-button>
                    {{ current_time }}
                </a-space>
            </div>
            <div style="position: absolute; left: 50%; transform: translateX(-50%);">
                <slot name="header-center"></slot>
            </div>
            <div style="margin-left: auto; display: flex; gap: 8px;">
                <slot name="header-right"></slot>
            </div>
        </el-header>

        <el-main style="height: 94%;">
            <dv-border-box8 :dur="10">
                <div style="height: 100%; width: 100%; padding: 10px; box-sizing: border-box;">
                    <slot name="main"></slot>
                </div>
            </dv-border-box8>
        </el-main>

        <el-drawer v-model="drawer" title="目录" direction="ltr" :show-close="false">
            <el-menu router default-active="/">
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item index="/business/income">收入分析</el-menu-item>
                <el-menu-item index="/business/networking">联网通信主营出账收入</el-menu-item>
            </el-menu>
        </el-drawer>
    </el-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import dayjs from 'dayjs'

const drawer = ref(false)
const handleClick = () => {
    drawer.value = true
}

const current_time = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"))

let timer = null

onMounted(() => {
    timer = setInterval(() => {
        current_time.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer)
})
</script>
