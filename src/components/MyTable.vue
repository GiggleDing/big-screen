<template>
    <div class="wh-full" ref="wrapperRef">
        <el-table v-bind="$attrs" :data="displayData" :height="tableHeight" v-loading="props.data.length === 0" ref="tableRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <slot />
        </el-table>
    </div>
</template>

<script setup>
import { ref, onUnmounted, watch, nextTick, computed, onMounted } from "vue"

const props = defineProps({
    data: { type: Array, default: () => [] },
    autoStart: { type: Boolean, default: true },
    autoLength: { type: Number, default: 4 },
    scrollInterval: { type: Number, default: 30 }
})

const tableRef = ref(null)
const wrapperRef = ref(null)
const tableHeight = ref(0) // 这里动态计算高度

// 自动计算父容器高度
const updateHeight = () => {
    if (wrapperRef.value) {
        tableHeight.value = wrapperRef.value.clientHeight
    }
}

onMounted(() => {
    updateHeight()
    // 监听容器大小变化，自动调整表格高度
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(wrapperRef.value)
    onUnmounted(() => resizeObserver.disconnect())
})

/* ====== 以下保持你原来的滚动逻辑 ====== */
const isScrolling = ref(false)
const scrollTimerId = ref(null)
const animationFrameId = ref(null)

const displayData = computed(() => {
    if (props.data.length <= props.autoLength) return props.data
    return [...props.data, ...props.data]
})

const clearTimers = () => {
    if (scrollTimerId.value) {
        clearTimeout(scrollTimerId.value)
        scrollTimerId.value = null
    }
    if (animationFrameId.value) {
        cancelAnimationFrame(animationFrameId.value)
        animationFrameId.value = null
    }
}

const getTableWrapper = () => {
    const bodyWrapper = tableRef.value?.$refs.bodyWrapper
    return bodyWrapper?.firstElementChild?.firstElementChild
}

const handleScroll = (tableWrapper) => {
    if (!tableWrapper || !isScrolling.value) return

    tableWrapper.scrollTop += 1
    if (tableWrapper.scrollTop + tableWrapper.clientHeight >= tableWrapper.scrollHeight) {
        tableWrapper.scrollTop = tableWrapper.scrollTop - tableWrapper.scrollHeight / 2
    }

    scrollTimerId.value = window.setTimeout(() => {
        animationFrameId.value = requestAnimationFrame(() => handleScroll(tableWrapper))
    }, props.scrollInterval)
}

const startScroll = () => {
    const tableWrapper = getTableWrapper()
    if (!tableWrapper || props.data.length <= props.autoLength) return
    if (tableWrapper.scrollHeight / 2 < tableWrapper.clientHeight) return

    isScrolling.value = true
    handleScroll(tableWrapper)
}

const stopScroll = () => {
    isScrolling.value = false
    clearTimers()
}

const handleMouseEnter = () => stopScroll()
const handleMouseLeave = () => startScroll()

watch(
    () => props.data,
    (newData) => {
        if (newData?.length > 0 && props.autoStart) {
            nextTick(() => {
                setTimeout(() => {
                    startScroll()
                }, 1000)
            })
        }
    },
    { immediate: true }
)

onUnmounted(() => {
    stopScroll()
})
</script>

<style scoped>
.wh-full {
    width: 100%;
    height: 100%;
}
</style>
