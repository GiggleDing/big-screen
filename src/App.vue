<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const drawer = ref(false)

const handleClick = () => {
    drawer.value = true
}

</script>

<template>
    <div style="width: 100%; height: 100vh; box-sizing: border-box; overflow: hidden;">
        <div style="position: fixed; top: 20px; left: 20px; z-index: 1000;">
            <!-- <a-button @click="handleClick"> -->
            <el-button @click="handleClick">
                <el-icon><icon-menu /></el-icon>
            </el-button>
        </div>
        <el-drawer v-model="drawer" direction="ltr" :show-close="false" title="目录">
            <el-menu :router="true" default-active="/">
                <el-menu-item index="/">
                    <el-icon><HomeFilled /></el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/business/income">
                    <el-icon><Flag /></el-icon>
                    <span>收入分析</span>
                </el-menu-item>
                <el-menu-item index="/business/networking">
                    <el-icon><Flag /></el-icon>
                    <span>联网通信主营出账收入</span>
                </el-menu-item>
            </el-menu>
        </el-drawer>
        <div style="height: 100%;">
            <RouterView />
        </div>
    </div>
</template>
