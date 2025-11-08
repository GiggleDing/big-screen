<template>
    <el-row :gutter="10" style="width: 100%; height: 100%">
        <el-col :span=8>
            <h3 style="margin: 0; font-size: 16px;">一类</h3>
            <v-chart v-if="loaded1" style="width: 100%; height: 55%" :option="option1" />
            <div v-else style="width: 100%; height: 55%; display: flex; align-items: center; justify-content: center;">
                <a-spin :size="32" />
            </div>
            <h3 style="margin: 0; font-size: 16px;">一类后三位</h3>
            <dv-scroll-board :config="config1" style="width: 100%; height: 33%"/>
        </el-col>
        <el-col :span=8>
            <h3 style="margin: 0; font-size: 16px;">二类</h3>
            <v-chart v-if="loaded2" style="width: 100%; height: 55%" :option="option2" />
            <div v-else style="width: 100%; height: 55%; display: flex; align-items: center; justify-content: center;">
                <a-spin :size="32" />
            </div>
            <h3 style="margin: 0; font-size: 16px;">二类后三位</h3>
            <dv-scroll-board :config="config2" style="width: 100%; height: 33%"/>
        </el-col>
        <el-col :span=8>
            <h3 style="margin: 0; font-size: 16px;">三类</h3>
            <v-chart v-if="loaded3" style="width: 100%; height: 55%" :option="option3" />
            <div v-else style="width: 100%; height: 55%; display: flex; align-items: center; justify-content: center;">
                <a-spin :size="32" />
            </div>
            <h3 style="margin: 0; font-size: 16px;">三类后三位</h3>
            <dv-scroll-board :config="config3" style="width: 100%; height: 33%"/>
        </el-col>
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
import { getDevOfMobile } from '../../../../api/business'

use([GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer])
provide(THEME_KEY, "dark")

const dateStore = useDateStore()

const loaded1 = ref(false)
const loaded2 = ref(false)
const loaded3 = ref(false)

const option1 = ref({})
const option2 = ref({})
const option3 = ref({})

const config1 = ref({
    header: ['分公司', '当月值', '完成率同比', '完成率环比'],
    data: [],
    rowNum: 3
})

const config2 = ref({
    header: ['分公司', '当月值', '完成率同比', '完成率环比'],
    data: [],
    rowNum: 3
})

const config3 = ref({
    header: ['分公司', '当月值', '完成率同比', '完成率环比'],
    data: [],
    rowNum: 3
})

const buildTableData = (list, rowNum = 3) => {
    if(!Array.isArray(list)) return []
    // 按完成率降序排序（高 -> 低），取最后 rowNum 项（完成率最低的几项）
    const sorted = [...list].sort((a, b) => b.completionRate - a.completionRate)
    const bottom = sorted.slice(-rowNum)
    // 为展示从低到高排序（便于从最差到较差查看）
    const bottomSorted = bottom.sort((a, b) => a.completionRate - b.completionRate)
    return bottomSorted.map(i => {
        const monthVal = i.devUserCnt ?? '-'
        const yoy = (i.completionRateYoY !== undefined && i.completionRateYoY !== null) ? `${i.completionRateYoY}%` : '-'
        const mom = (i.completionRateMoM !== undefined && i.completionRateMoM !== null) ? `${i.completionRateMoM}%` : '-'
        return [i.areaName ?? '-', monthVal, yoy, mom]
    })
}

const buildOption = (list) => {
    const sorted = [...list].sort((a, b) => b.completionRate - a.completionRate)

    return {
        grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
        xAxis: { data: sorted.map(i => i.areaName) },
        yAxis: [
            { type: 'value', show: false },
            { type: 'value', show: false }
        ],
        legend: { 
            show: true, 
            data: ['移网发展(户)', '完成率(%)'], 
            top: '5%', 
            textStyle: { color: 'rgba(255, 255, 255, 0.65)' } 
        },
        series: [
            { 
                name: '移网发展(户)',
                type: 'bar',
                data: sorted.map(i => i.devUserCnt),
                yAxisIndex: 0,
                label: { show: false, position: 'top' }
            },
            { 
                name: '完成率(%)',
                type: 'line', 
                data: sorted.map(i => i.completionRate), 
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

        let res = await getDevOfMobile(dateParam, "root")

        if(res.data) {
            const cities1 = ['庆阳', '临夏', '酒泉', '兰州', '天水']
            const category1 = res.data.filter((i) => cities1.includes(i.areaName))

            const cities2 = ['陇南', '平凉', '张掖', '白银', '定西', '武威']
            const category2 = res.data.filter((i) => cities2.includes(i.areaName))

            const cities3 = ['嘉峪关', '甘南', '金昌']
            const category3 = res.data.filter((i) => cities3.includes(i.areaName))

            option1.value = buildOption(category1)
            option2.value = buildOption(category2)
            option3.value = buildOption(category3)

            // 用接口数据填充表格
            config1.value.data = buildTableData(category1, config1.value.rowNum)
            config2.value.data = buildTableData(category2, config2.value.rowNum)
            config3.value.data = buildTableData(category3, config3.value.rowNum)

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
    () => [dateStore.month],
    () => {
        fetchData()
    }
)
</script>
