<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>1.2.1 分公司完成情况</span>
      </div>
    </template>
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        size="small"
        stripe
        v-loading="tableData.length === 0"
        style="width: 100%; flex: 1"
        :max-height="tableHeight"
      >
        <el-table-column
          v-for="col in tableColumns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          align="center"
        />
        <el-table-column prop="monthlyTrend" label="分月趋势" :width="200" align="center">
          <template #default="scope">
            <v-chart
              style="height: 50px;"
              autoresize
              ref="chartRef"
              :option="getTrendOption(scope.row.monthlyTrend)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { defineProps } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import VChart from 'vue-echarts'

const props = defineProps({
  tableData: {
    type: Array,
    required: true
  }
})

const tableColumns = [
  { label: '地市', prop: 'areaName' },
  { label: '当月(万)', prop: 'monthRevenue' },
  { label: '完成率', prop: 'completionRate' },
  { label: '环比', prop: 'momRate' },
  { label: '同比', prop: 'yoyRate' },
  { label: '累计', prop: 'accumulatedRevenue' },
  { label: '全年目标(万)', prop: 'annualTarget' },
  { label: '序时完成率', prop: 'scheduleCompletion' },
  { label: '累计同比', prop: 'accumulatedYoyRate' }
]

use([CanvasRenderer, LineChart, GridComponent])

const getTrendOption = (monthlyTrend) => ({
  grid: { top: 5, bottom: 5, left: 5, right: 5 },
  xAxis: { type: 'category', data: Object.keys(monthlyTrend || {}), show: false },
  yAxis: { type: 'value', min: 'dataMin', max: 'dataMax', show: false },
  series: [{ type: 'line', data: Object.values(monthlyTrend || {}) }]
})

// 自适应表格高度
const tableHeight = ref(0)
const calculateHeight = () => {
  const card = document.querySelector('.card')
  if (card) {
    const headerHeight = card.querySelector('.card-header')?.offsetHeight || 40
    tableHeight.value = card.offsetHeight - headerHeight - 20 // 20px padding
  }
}

onMounted(() => {
  calculateHeight()
  window.addEventListener('resize', calculateHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>

<style scoped>
.card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
