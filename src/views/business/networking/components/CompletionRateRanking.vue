<template>
    <el-row style="width: 100%; height: 33%;">
        <h3 style="margin: 0; font-size: 16px;">一类</h3>
        <v-chart v-if="loaded1" style="width: 100%; height: calc(100% - 24px);" :option="option1" />
        <div v-else style="width: 100%; height: calc(100% - 24px); display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
    <el-row style="width: 100%; height: 33%;">
        <h3 style="margin: 0; font-size: 16px;">二类</h3>
        <v-chart v-if="loaded2" style="width: 100%; height: calc(100% - 24px);" :option="option2" />
        <div v-else style="width: 100%;  height: calc(100% - 24px); display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
    <el-row style="width: 100%; height: 34%;">
        <h3 style="margin: 0; font-size: 16px;">三类</h3>
        <v-chart v-if="loaded3" style="width: 100%; height: calc(100% - 24px);" :option="option3" />
        <div v-else style="width: 100%; height: calc(100% - 24px); display: flex; align-items: center; justify-content: center;">
            <a-spin :size="32" />
        </div>
    </el-row>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart, { THEME_KEY } from "vue-echarts"
import { useDateStore } from '../../../../stores/useDateStore'
import { getRevenueOfNetworking } from '../../../../api/business'

use([GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])
provide(THEME_KEY, "dark")

const props = defineProps({
    profession: {
        type: String,
        required: true
    }
})

const dateStore = useDateStore()

const loaded1 = ref(false)
const loaded2 = ref(false)
const loaded3 = ref(false)

const option1 = ref({})
const option2 = ref({})
const option3 = ref({})

const buildOption = (list) => {
    const sorted = [...list].sort((a, b) => b.scheduleCompletion - a.scheduleCompletion)

    return {
        grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
        xAxis: { data: sorted.map(i => i.areaName) },
        yAxis: [
            { type: 'value', show: false },
            { type: 'value', show: false }
        ],
        legend: { 
            show: true, 
            data: ['序时完成(万元)', '序时完成率'], 
            top: '5%', 
            textStyle: { color: 'rgba(255, 255, 255, 0.65)' } 
        },
        series: [
            { 
                name: '序时完成(万元)', 
                type: 'bar', 
                data: sorted.map(i => i.accumulatedRevenue), 
                yAxisIndex: 0, 
                label: { show: false, position: 'top' } 
            },
            { 
                name: '序时完成率', 
                type: 'line', 
                data: sorted.map(i => i.scheduleCompletion), 
                yAxisIndex: 1, 
                label: { show: true, position: 'top', formatter: '{c}%' } 
            }
        ]
    }
}

const fetchData = async() => {
    try {
        loaded1.value = false
        loaded2.value = false
        loaded3.value = false

        const dateParam = dateStore.month

        let res
        if(props.profession === 'networking') {
            res = await getRevenueOfNetworking(dateParam, "root")
        } else if(props.profession === 'networkingOfPublic') {
            res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'public' })
        } else if (props.profession === 'networkingOfEnterprise') {
            res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'enterprise' })
        }

        if(res.data) {
            const category1 = res.data.filter((i) => i.category === "1")
            const category2 = res.data.filter((i) => i.category === "2")
            const category3 = res.data.filter((i) => i.category === "3")

            option1.value = buildOption(category1)
            option2.value = buildOption(category2)
            option3.value = buildOption(category3)

            loaded1.value = true
            loaded2.value = true
            loaded3.value = true
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
