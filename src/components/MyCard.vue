<template>
    <el-card v-bind="$attrs" :class="cardClass">
        <template #header v-if="title || $slots.title">
            <div class="card-header">
                <component :is="titleTag" :class="titleClass" v-if="title">
                    {{ title }}
                </component>
                <slot name="title" v-else></slot>
                
                <!-- 标题右侧额外内容 -->
                <div class="card-header-extra" v-if="$slots.extra">
                    <slot name="extra"></slot>
                </div>
            </div>
        </template>
        
        <div class="card-content">
            <slot></slot>
        </div>
    </el-card>
</template>

<script setup>
import { computed } from 'vue'

// 定义 props
const props = defineProps({
    // 标题文本
    title: {
        type: String,
        default: ''
    },
    // 标题级别 (1-3)
    level: {
        type: Number,
        default: 1,
        validator: (value) => [1, 2, 3].includes(value)
    },
    // 是否显示边框
    shadow: {
        type: String,
        default: 'always',
        validator: (value) => ['always', 'hover', 'never'].includes(value)
    }
})

// 计算标题标签
const titleTag = computed(() => `h${props.level + 1}`) // h2, h3, h4

// 计算标题样式类
const titleClass = computed(() => {
    const baseClass = 'card-title'
    const levelClass = `card-title--level${props.level}`
    return `${baseClass} ${levelClass}`
})

// 计算卡片样式类
const cardClass = computed(() => {
    return `custom-card custom-card--level${props.level}`
})
</script>

<script>
export default {
    name: 'CustomCard',
    inheritAttrs: false
}
</script>

<style scoped>
.custom-card {
    margin-bottom: 16px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-title {
    margin: 0;
    font-weight: 600;
    color: var(--el-text-color-primary);
}

.card-title--level1 {
    font-size: 20px;
    line-height: 28px;
}

.card-title--level2 {
    font-size: 18px;
    line-height: 26px;
}

.card-title--level3 {
    font-size: 16px;
    line-height: 24px;
}

.card-header-extra {
    color: var(--el-text-color-regular);
}

.card-content {
    color: var(--el-text-color-primary);
}

/* 不同级别卡片的样式变化 */
.custom-card--level1 {
    border-left: 4px solid var(--el-color-primary);
}

.custom-card--level2 {
    border-left: 3px solid var(--el-color-primary-light-3);
}

.custom-card--level3 {
    border-left: 2px solid var(--el-color-primary-light-5);
}
</style>