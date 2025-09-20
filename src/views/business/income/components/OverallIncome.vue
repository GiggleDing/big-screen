<template>
    <v-chart v-if="loaded" style="width: 100%; height: 100%;" :option="option" />
    <div v-else style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        <a-spin :size="32" />
    </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue"
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts"
import { getRevenueOfProvinceByMonth, getPeriodData } from "../../../../api/business"

use([GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])

provide(THEME_KEY, "dark");

const option = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)', '当月完成率(%)', '当月同比(%)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' } },
    series: [
        { name: '2024(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '2025(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } },
        { name: '当月完成率(%)', type: 'line', data: [], yAxisIndex: 1, label: { show: true, position: 'top' } },
        { name: '当月同比(%)', type: 'line', data: [], yAxisIndex: 1, label: { show: true, position: 'top' } }
    ]
})

const loaded = ref(false)

function generatePeriods(year, endMonth) {
    const periods = []
    for(let m = 1; m <= endMonth; m++) {
        const month = m.toString().padStart(2, '0')
        periods.push(Number(`${year}${month}`))
    }
    return periods
}

onMounted(async() => {
    try {
        const [res1, res2] = await Promise.all([
            getRevenueOfProvinceByMonth(2024, 'root'),
            getRevenueOfProvinceByMonth(2025, 'root'),
        ])

        if(res1.data && res1.data.success) {
            option.value.series[0].data = res1.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res2.data && res2.data.success) {
            option.value.xAxis.data = res2.data.data.map(item => item.month.slice(4, 6) + '月')
            option.value.series[1].data = res2.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        
        const periods = generatePeriods(2025, 7)
        const results = await Promise.all(periods.map(p => getPeriodData(p)))
        console.log(results)
        option.value.series[2].data = results.map(res => {
            if(res.data && res.data.currentMonth) {
                return res.data.currentMonth.completionRate
            }
            return 0
        }) 

        option.value.series[3].data = results.map(res => {
            if(res.data && res.data.currentMonth) {
                return res.data.currentMonth.yoy
            }
            return 0
        })

        loaded.value = true
    } catch(e) {
        console.error(e)
    }
})
</script>