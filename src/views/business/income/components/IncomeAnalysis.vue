<template>
    <el-row style="width: 100%; height: 33%;">
        <h3 style="height: 10%;">公众联网通信收入</h3>
        <v-chart v-if="loaded1" style="width: 100%; height: 90%;" :option="option1" />
        <div v-else style="width: 100%; height: 90%; display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
    <el-row style="width: 100%; height: 33%;">
        <h3 style="height: 10%;">政企联网通信收入</h3>
        <v-chart v-if="loaded2" style="width: 100%; height: 90%;" :option="option2" />
        <div v-else style="width: 100%; height: 90%; display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
    <el-row style="width: 100%; height: 34%;">
        <h3 style="height: 10%;">算网数智收入</h3>
        <v-chart v-if="loaded3" style="width: 100%; height: 90%;" :option="option3" />
        <div v-else style="width: 100%; height: 90%; display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
</template>

<script setup>
import { ref, onMounted, provide, watch } from "vue"
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts"
import { getRevenueOfDigitalIntelligence, getRevenueOfNetworking } from "../../../../api/business"
import { useDateStore } from "../../../../stores/useDateStore"

use([GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])
provide(THEME_KEY, "dark")

const dateStore = useDateStore()

const loaded1 = ref(false)
const loaded2 = ref(false)
const loaded3 = ref(false)

const option1 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' } },
    series: [
        { name: '去年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '今年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } }
    ]
})

const option2 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' } },
    series: [
        { name: '去年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '今年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } }
    ]
})

const option3 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' } },
    series: [
        { name: '去年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '今年(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } }
    ]
})

const fetchData = async() => {
    try {
        loaded1.value = false

        const current = dateStore.month
        const year = parseInt(current.toString().slice(0, 4))
        const lastYearEnd = parseInt(`${year - 1}12`)

        const [res1, res2, res3, res4, res5, res6] = await Promise.all([
            getRevenueOfNetworking(lastYearEnd, 'root',  { profession: 'public' }),
            getRevenueOfNetworking(current, 'root',  { profession: 'public' }),
            getRevenueOfNetworking(lastYearEnd, 'root',  { profession: 'enterprise' }),
            getRevenueOfNetworking(current, 'root',  { profession: 'enterprise' }),
            // getRevenueOfDigitalIntelligence(lastYearEnd, 'root'),
            // getRevenueOfDigitalIntelligence(current, 'root')
        ])

        if(res1.data) {
            const province = res1.data.find(item => item.areaName === '甘肃省')
            if(province?.monthlyTrend) {
                option1.value.series[0].data = Object.values(province.monthlyTrend)
            }
        }

        if(res2.data) {
            const province = res2.data.find(item => item.areaName === '甘肃省')
            if(province?.monthlyTrend) {
                const keys = Object.keys(province.monthlyTrend)
                option1.value.xAxis.data = keys.map(k => k.slice(4) + '月')
                option1.value.series[1].data = Object.values(province.monthlyTrend)
            }
        }

        if(res3.data) {
            const province = res3.data.find(item => item.areaName === '甘肃省')
            if(province?.monthlyTrend) {
                option2.value.series[0].data = Object.values(province.monthlyTrend)
            }
        }

        if(res4.data) {
            const province = res4.data.find(item => item.areaName === '甘肃省')
            if(province?.monthlyTrend) {
                const keys = Object.keys(province.monthlyTrend)
                option2.value.xAxis.data = keys.map(k => k.slice(4) + '月')
                option2.value.series[1].data = Object.values(province.monthlyTrend)
            }
        }

        // if(res5.data) {
        //     const province = res5.data.find(item => item.areaName === '甘肃省')
        //     if(province?.monthlyTrend) {
        //         option3.value.series[0].data = Object.values(province.monthlyTrend)
        //     }
        // }

        // if(res6.data) {
        //     const province = res6.data.find(item => item.areaName === '甘肃省')
        //     if(province?.monthlyTrend) {
        //         const keys = Object.keys(province.monthlyTrend)
        //         option3.value.xAxis.data = keys.map(k => k.slice(4) + '月')
        //         option3.value.series[1].data = Object.values(province.monthlyTrend)
        //     }
        // }

        loaded1.value = true
        // loaded2.value = true
        // loaded3.value = true
    } catch(e) {
        console.error(e)
    }
}

onMounted(fetchData)

watch(() => dateStore.month, fetchData)
</script>
