<template>
    <div class="container">
        <h2>1.2.2 完成率排名</h2>
        <div class="charts-container">
            <div class="chart-wrapper">
                <h3>一类</h3>
                <v-chart :option="option1" autoresize class="chart" />
            </div>
            <div class="chart-wrapper">
                <h3>二类</h3>
                <v-chart :option="option2" autoresize class="chart" />
            </div>
            <div class="chart-wrapper">
                <h3>三类</h3>
                <v-chart :option="option3" autoresize class="chart" />
            </div>
        </div>
    </div>
</template>

<!-- TODO: 显示正在加载中 -->

<script setup>
import { ref, watch, computed } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])

const props = defineProps({
    branchData: {
        type: Array,
        default: () => []
    }
})

const oneCategoryData = computed(() => props.branchData.filter(item => item.category === '1'))
const twoCategoryData = computed(() => props.branchData.filter(item => item.category === '2'))
const threeCategoryData = computed(() => props.branchData.filter(item => item.category === '3'))

const option1 = ref({})
const option2 = ref({})
const option3 = ref({})

function buildOption(data) {
    const sortedData = [...data].sort(
        (a, b) => Number(b.scheduleCompletion) - Number(a.scheduleCompletion)
    )

    return {
        grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
        xAxis: {
            data: sortedData.map(item => item.areaName)
        },
        yAxis: [
            {
                type: 'value',
                name: '序时完成(万元)',
                show: false
            },
            {
                type: 'value',
                name: '序时完成率',
                position: 'right',
                show: false
            }
        ],
        legend: {
            data: ['序时完成(万元)', '序时完成率'],
            top: '1%',
            right: '5%'
        },
        series: [
            {
                name: '序时完成(万元)',
                type: 'bar',
                data: sortedData.map(item => Number(item.accumulatedRevenue)),
                yAxisIndex: 0,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                }
            },
            {
                name: '序时完成率',
                type: 'line',
                data: sortedData.map(item => Number(item.scheduleCompletion)),
                yAxisIndex: 1,
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%'
                }
            }
        ]
    }
}

watch(oneCategoryData, (data) => { option1.value = buildOption(data) }, { immediate: true })
watch(twoCategoryData, (data) => { option2.value = buildOption(data) }, { immediate: true })
watch(threeCategoryData, (data) => { option3.value = buildOption(data) }, { immediate: true })
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.container > h2 {
    width: 100%;
    margin: 0;
    padding: 8px 0;
}

.charts-container {
    flex: 1; /* 占据剩余高度 */
    display: flex;
    flex-direction: column;
    gap: 8px; /* 每个图表间距 */
}

.chart-wrapper {
    flex: 1; /* 三个图表平分剩余高度 */
    display: flex;
    flex-direction: column;
}

.chart-wrapper h3 {
    margin: 0;
    padding: 4px 0;
    text-align: left;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>