<template>
    <div class="demo-container">
        <MyCard title="销售数据趋势" :level="1">
            <v-chart class="chart" :option="chartOption" autoresize />
        </MyCard>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import MyCard from '@/components/MyCard.vue'

// 注册 ECharts 组件
use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer
])

// 图表配置
const chartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['销量', '利润']
  },
  grid: {
    left: '10px',
    right: '10px',
    bottom: '10px',
    top: '40px',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '销量',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110],
      smooth: true,
      itemStyle: {
        color: '#409EFF'
      }
    },
    {
      name: '利润',
      type: 'line',
      data: [80, 120, 100, 60, 50, 80],
      smooth: true,
      itemStyle: {
        color: '#67C23A'
      }
    }
  ]
})
</script>

<style scoped>
.chart {
  height: 40vh; /* 视口高度的40% */
  width: 100%;
}
</style>