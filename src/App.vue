<script setup>
import { ref } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'

const visible = ref(false)
const router = useRouter()
const route = useRoute()

const handleClick = () => {
    visible.value = true
}

// 判断当前路由是否匹配
const isActive = (to) => route.path === to

const handleMenuClick = (to) => {
    visible.value = false
    if (route.path !== to) {
        router.push(to)
    }
}
</script>

<template>
    <div style="width: 100%; height: 100vh; box-sizing: border-box; overflow: hidden; background-color: #0A0F25;">
        <div style="position: fixed; top: 20px; left: 20px; z-index: 1000;">
            <a-button @click="handleClick" style="background-color: #1C2238;">
                <icon-menu style="color: rgba(255, 255, 255, 0.65);" />
            </a-button>
        </div>
        <a-drawer
            v-model:visible="visible"
            :width="340"
            placement="left"
            :header="false"
            :footer="false"
            unmountOnClose
            :body-style="{ backgroundColor: '#0A0F25', color: '#fff' }"
            :header-style="{ backgroundColor: '#0A0F25', color: '#fff' }"
        >
            <template #title>
                <span style="color: #fff;">目录</span>
            </template>
            <p style="font-size: 1.5em;">目录</p>
            <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
                <a-button block :type="isActive('/') ? 'primary' : undefined" @click="handleMenuClick('/')">
                    首页
                </a-button>
                <a-button block :type="isActive('/business/income') ? 'primary' : undefined" @click="handleMenuClick('/business/income')">
                    收入分析
                </a-button>
            </div>
        </a-drawer>
        <div style="height: 100%;">
            <RouterView />
        </div>
    </div>
</template>
