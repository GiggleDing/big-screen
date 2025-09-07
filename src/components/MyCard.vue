<template>
    <div class="my-card">
        <div class="card-header">
            <span class="title-bar" :class="`bar${level}`"></span>
            <component :is="tag" :class="`title${level}`">
                {{ title }}
            </component>
        </div>
        <div class="card-content">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: { type: String, required: true },
    level: { type: Number, default: 1 }
})

const tag = computed(() => {
    if (props.level === 1) return 'h1'
    if (props.level === 2) return 'h2'
    return 'h3'
})
</script>

<style scoped>
.my-card {
    background-color: var(--el-bg-color-overlay);
    border-radius: 8px;
    padding: 10px;
    box-shadow: var(--el-box-shadow-light);
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 10px;
    margin: 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
}

.title-bar {
    width: 4px;
    border-radius: 2px;
    flex-shrink: 0;
}

.bar1 {
    background-color: var(--el-color-primary);
    height: 1.4em;
}

.bar2 {
    background-color: var(--el-color-success);
    height: 1.2em;
}

.bar3 {
    background-color: var(--el-color-danger);
    height: 1em;
}

.title1 {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    margin: 0;
}

.title2 {
    font-size: 16px;
    font-weight: 500;
    color: var(--el-text-color-regular);
    margin: 0;
}

.title3 {
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-secondary);
    margin: 0;
}

.card-content {
    font-size: 14px;
    color: var(--el-text-color-regular);
    margin: 0;
    padding: 5px;
    flex: 1;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    display: flex;
    gap: 5px;
    box-sizing: border-box;
}
</style>
