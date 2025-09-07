<script setup>
import MyCard from '@/components/MyCard.vue'

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

</script>

<template>
    <MyCard style="width: 100%; height: 100%;" :level="1" title="1.2.1 分公司完成情况">
        <el-table stripe fit size="small" style="width: 100%; height: 100%;" :data="tableData" v-loading="tableData.length === 0">
            <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" min-width="50" show-overflow-tooltip />
            <el-table-column prop="monthlyTrend" label="分月趋势" align="center">
                <template #default="scope">
                    <v-chart style="height: 20%;" autoresize ref="chartRef" :option="getTrendOption(scope.row.monthlyTrend)" />
                </template>
            </el-table-column>
        </el-table>
    </MyCard>
</template>
