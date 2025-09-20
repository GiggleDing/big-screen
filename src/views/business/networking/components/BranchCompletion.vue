<template>
    <el-col style="width: 100%; height: 100%;">
        <el-table v-loading="data.length === 0" height="680px" stripe fit size="small" :data="data">
            <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
            <el-table-column prop="monthlyTrend" label="分月趋势" align="center">
                <template #default="scope">
                    <v-chart style="height: 34.4px;" autoresize :option="getTrendOption(scope.row.monthlyTrend)" />
                </template>
            </el-table-column>
        </el-table>
    </el-col>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDateStore } from '../../../../stores/useDateStore'
import { getRevenueOfNetworking } from '../../../../api/business'
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import { GridComponent } from "echarts/components"
import VChart from "vue-echarts"

use([CanvasRenderer, LineChart, GridComponent])

const props = defineProps({
    profession: {
        type: String,
        required: true
    }
})

const dateStore = useDateStore()

const tableColumns = [
    { label: "地市", prop: "areaName" },
    { label: "当月(万)", prop: "monthRevenue" },
    { label: "完成率", prop: "completionRate", formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-' },
    { label: "环比", prop: "momRate", formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-' },
    { label: "同比", prop: "yoyRate", formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-' },
    { label: "累计", prop: "accumulatedRevenue" },
    { label: "全年目标(万)", prop: "annualTarget" },
    { label: "序时完成率", prop: "scheduleCompletion", formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-' },
    { label: "累计同比", prop: "accumulatedYoyRate", formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-' },
]

const data = ref([])

const getTrendOption = (monthlyTrend) => {
    if (!monthlyTrend) return {}
    const sorted = Object.entries(monthlyTrend).sort(([a], [b]) => a.localeCompare(b))
    return {
        grid: { top: 5, bottom: 5, left: 5, right: 5 },
        xAxis: { type: 'category', data: sorted.map(([k]) => k), show: false },
        yAxis: { type: 'value', min: 'dataMin', max: 'dataMax', show: false },
        series: [{ type: 'line', data: sorted.map(([, v]) => v), smooth: true }]
    }
}

const fetchData = async() => {
    try {
        const dateParam = dateStore.month
        
        let res
        if(props.profession === 'networking') {
            res = await getRevenueOfNetworking(dateParam, "root")
        } else if(props.profession === 'networkingOfPublic') {
            res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'public' })
        } else if (props.profession === 'networkingOfEnterprise') {
            res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'enterprise' })
        }
        if (res.data) {
            data.value = res.data.map((item) => ({
                areaName: item.areaName,
                monthRevenue: Number(item.monthRevenue).toFixed(2),
                completionRate: Number(item.completionRate),
                momRate: Number(item.momRate),
                yoyRate: Number(item.yoyRate),
                accumulatedRevenue: Number(item.accumulatedRevenue).toFixed(2),
                annualTarget: Number(item.annualTarget),
                scheduleCompletion: Number(item.scheduleCompletion),
                accumulatedYoyRate: Number(item.accumulatedYoyRate),
                monthlyTrend: item.monthlyTrend,
            }))
            .sort((a, b) => {
                if(a.areaName === "甘肃省") return -1
                if(b.areaName === "甘肃省") return 1
                return b.completionRate = a.completionRate
            })
        }
    } catch(e) {
        console.error(e)
    }
}

onMounted(fetchData)

watch(
    () => [dateStore.month, props.profession],
    () => {
        fetchData()
    }
)
</script>
