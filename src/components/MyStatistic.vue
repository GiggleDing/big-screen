<template>
    <div class="statistic-card">
        <el-statistic :value="value">
            <template #title>
                <div style="display: inline-flex; align-items: center">
                    {{ title }}
                    <el-tooltip v-if="tooltip" effect="dark" :content="tooltip" placement="top">
                        <el-icon style="margin-left: 4px" :size="12">
                            <Warning />
                        </el-icon>
                    </el-tooltip>
                </div>
            </template>
        </el-statistic>

        <div class="statistic-footer" v-if="footerItems.length > 0">
            <div class="footer-item" v-for="(item, index) in footerItems" :key="index">
                <span>{{ item.label }}</span>
                <span :class="getColorClass(item)">
                    {{ item.value }}
                    <el-icon v-if="item.icon">
                        <component :is="item.icon" />
                    </el-icon>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CaretTop, CaretBottom, Warning } from '@element-plus/icons-vue'

interface FooterItem {
    label: string
    value: string | number
    type?: 'green' | 'red'
    icon?: any
}

const props = defineProps<{
    title: string
    value: number | string
    tooltip?: string
    footerItems?: FooterItem[]
}>()

const footerItems = props.footerItems ?? []

/** 动态计算颜色 */
const getColorClass = (item: FooterItem) => {
    if (item.type) return item.type

    const num = Number(String(item.value).replace(/[^0-9.-]/g, '')) // 提取数值
    if (!isNaN(num)) {
        if (num > 0) return 'green'
        if (num < 0) return 'red'
    }
    return ''
}
</script>

<style scoped>
.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}
.red {
    color: var(--el-color-error);
}
</style>
