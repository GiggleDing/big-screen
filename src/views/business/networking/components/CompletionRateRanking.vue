<template>
    <MyCard style="width: 100%; height: 100%;" title="1.2.2 完成率排名" :level="1">
        <MyCard v-loading="oneCategoryData.length === 0" style="width: 100%; height: 100%;" :level="2" title="一类">
            <v-chart :option="option1" autoresize class="chart" />
        </MyCard>

        <MyCard v-loading="twoCategoryData.length === 0" style="width: 100%; height: 100%;" :level="2" title="二类">
            <v-chart :option="option2" autoresize class="chart" />
        </MyCard>

        <MyCard v-loading="threeCategoryData.length === 0" style="width: 100%; height: 100%;" :level="2" title="三类">
            <v-chart :option="option3" autoresize class="chart" />
        </MyCard>
    </MyCard>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import MyCard from '@/components/MyCard.vue'

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
            { type: 'value', name: '序时完成(万元)', show: false },
            { type: 'value', name: '序时完成率', position: 'right', show: false }
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
                label: { show: true, position: 'top', formatter: '{c}' }
            },
            {
                name: '序时完成率',
                type: 'line',
                data: sortedData.map(item => Number(item.scheduleCompletion)),
                yAxisIndex: 1,
                label: { show: true, position: 'top', formatter: '{c}%' }
            }
        ]
    }
}

watch(oneCategoryData, (data) => { option1.value = buildOption(data) }, { immediate: true })
watch(twoCategoryData, (data) => { option2.value = buildOption(data) }, { immediate: true })
watch(threeCategoryData, (data) => { option3.value = buildOption(data) }, { immediate: true })
</script>

<style scoped>
.chart {
    width: 100%;
    height: 12vh;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12vh;
    color: #1890ff;
    font-weight: bold;
}
</style>
