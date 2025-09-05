<template>
  <div class="my-table-wrapper" ref="tableWrapper">
    <el-table
      ref="tableRef"
      :data="tableData"
      :height="tableHeight"
      :row-style="rowStyle"
      v-loading="props.data.length === 0"
      v-bind="$attrs"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @current-change="handleCurrentChange"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

// 定义 props
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  minRowHeight: {
    type: Number,
    default: 48 // 最小行高
  }
})

// 定义 emits
const emit = defineEmits([
  'selection-change',
  'sort-change', 
  'current-change',
  'row-click',
  'row-dblclick'
])

// 响应式数据
const tableWrapper = ref(null)
const tableRef = ref(null)
const tableHeight = ref('100%')
const wrapperHeight = ref(0)

// 计算属性
const tableData = computed(() => props.data)

// 动态行高计算
const rowStyle = computed(() => {
  return ({ rowIndex }) => {
    if (!props.data.length || props.loading) {
      return {}
    }
    
    // 计算每行应该的高度
    const availableHeight = wrapperHeight.value - 40 // 减去表头高度
    const rowCount = props.data.length
    const calculatedRowHeight = Math.max(
      Math.floor(availableHeight / rowCount), 
      props.minRowHeight
    )
    
    return {
      height: `${calculatedRowHeight}px`
    }
  }
})

// 更新表格尺寸
const updateTableSize = () => {
  if (tableWrapper.value) {
    const rect = tableWrapper.value.getBoundingClientRect()
    wrapperHeight.value = rect.height
    
    // 强制更新表格布局
    nextTick(() => {
      if (tableRef.value) {
        tableRef.value.doLayout()
      }
    })
  }
}

// 监听数据变化
watch(() => props.data, () => {
  nextTick(() => {
    updateTableSize()
  })
}, { deep: true })

watch(() => props.loading, () => {
  nextTick(() => {
    updateTableSize()
  })
})

// 事件处理函数
const handleSelectionChange = (selection) => {
  emit('selection-change', selection)
}

const handleSortChange = (column) => {
  emit('sort-change', column)
}

const handleCurrentChange = (currentRow, oldCurrentRow) => {
  emit('current-change', currentRow, oldCurrentRow)
}

const handleRowClick = (row, column, event) => {
  emit('row-click', row, column, event)
}

const handleRowDblclick = (row, column, event) => {
  emit('row-dblclick', row, column, event)
}

// ResizeObserver 用于监听父容器大小变化
let resizeObserver = null

onMounted(() => {
  updateTableSize()
  
  // 使用 ResizeObserver 监听容器大小变化
  if (tableWrapper.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateTableSize()
    })
    resizeObserver.observe(tableWrapper.value)
  }
  
  // 兜底方案：监听窗口大小变化
  window.addEventListener('resize', updateTableSize)
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', updateTableSize)
})

// 暴露给父组件的方法
defineExpose({
  // 表格实例的方法
  clearSelection: () => tableRef.value?.clearSelection(),
  toggleRowSelection: (row, selected) => tableRef.value?.toggleRowSelection(row, selected),
  toggleAllSelection: () => tableRef.value?.toggleAllSelection(),
  toggleRowExpansion: (row, expanded) => tableRef.value?.toggleRowExpansion(row, expanded),
  setCurrentRow: (row) => tableRef.value?.setCurrentRow(row),
  clearSort: () => tableRef.value?.clearSort(),
  clearFilter: (columnKeys) => tableRef.value?.clearFilter(columnKeys),
  doLayout: () => tableRef.value?.doLayout(),
  sort: (prop, order) => tableRef.value?.sort(prop, order),
  // 自定义方法
  updateSize: updateTableSize,
  getTableRef: () => tableRef.value
})
</script>

<style scoped>
.my-table-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 确保表格占满容器 */
.my-table-wrapper :deep(.el-table) {
  width: 100%;
  height: 100%;
}

/* 自定义加载状态样式 */
.my-table-wrapper :deep(.el-loading-mask) {
  border-radius: 4px;
}

/* 确保表格行高度的样式生效 */
.my-table-wrapper :deep(.el-table__row) {
  transition: height 0.2s ease;
}

/* 空数据状态样式 */
.my-table-wrapper :deep(.el-table__empty-block) {
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 表头样式调整 */
.my-table-wrapper :deep(.el-table__header-wrapper) {
  flex-shrink: 0;
}

/* 表体样式调整 */
.my-table-wrapper :deep(.el-table__body-wrapper) {
  flex: 1;
  overflow-y: auto;
}
</style>