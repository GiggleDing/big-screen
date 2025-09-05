<template>
    <div v-if="loaded" style="height: 100%; width: 100%;">
        <div style="height: 5%; width: 100%;">
            <h1 style="text-align: center; color: #FFFFFF;">1.1 收入分析</h1>
        </div>
        <div style="height: 15%; width: 100%; display: flex; box-sizing: border-box; padding: 8px; gap: 12px;">
            <!-- 本月模块 -->
            <div style="flex: 1; display: flex; align-items: center; padding: 8px; gap: 12px; background-color: #1C2238;">
                <div style="width: 5%; display: flex; justify-content: center; align-items: center;">
                    <span style="color: rgba(255, 255, 255, 0.65); font-size: 1.5em; font-weight: bold; line-height: 1.1; text-align: center;">
                        本<br/>月
                    </span>
                </div>
                <a-divider direction="vertical" style="height: 100%;" />
                <div style="flex: 1; display: flex; justify-content: space-around; align-items: center;">
                    <a-statistic title="当月完成（万）" :value="currentMonth[0]" animation /><a-divider direction="vertical" style="height: 80%;" />
                    <a-statistic title="当月同比（%）" :value="currentMonth[1]" animation /><a-divider direction="vertical" style="height: 80%;" />
                    <a-statistic title="当月完成率（%）" :value="currentMonth[2]" animation /><a-divider direction="vertical" style="height: 80%;" />
                    <a-statistic title="当月收入缺口（万）" :value="currentMonth[3]" animation />
                </div>
            </div>

            <!-- 累计模块 -->
            <div style="flex: 1; display: flex; align-items: center; padding: 8px; gap: 12px; background-color: #1C2238;">
                <div style="width: 5%; display: flex; justify-content: center; align-items: center;">
                    <span style="color: rgba(255, 255, 255, 0.65); font-size: 1.5em; font-weight: bold; line-height: 1.1; text-align: center;">
                        累<br/>计
                    </span>
                </div>
                <a-divider direction="vertical" style="height: 100%;" />
                <div style="flex: 1; display: flex; justify-content: space-around; align-items: center;">
                    <a-statistic title="累计完成（万）" :value="accumulated[0]" animation /><a-divider direction="vertical" />
                    <a-statistic title="累计同比（%）" :value="accumulated[1]" animation /><a-divider direction="vertical" />
                    <a-statistic title="序时完成率（%）" :value="accumulated[2]" animation /><a-divider direction="vertical" />
                    <a-statistic title="累计收入缺口（万）" :value="accumulated[3]" animation /><!-- <a-divider direction="vertical" />
                    <a-statistic title="累计毛利缺口（万）" :value="125670" /> -->
                </div>
            </div>
        </div>

        <div style="height: 80%; width: 100%; display: flex;; box-sizing: border-box; padding: 8px; gap: 12px;">
            <div style="height: 100%; width: 60%; padding: 8px; gap: 12px; background-color: #1C2238;">
                <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.65);">
                    1.1.1 整体收入情况
                </div>
                <div style="width: 100%; height: calc(50% - 15px);">
                    <Vchart style="height: 100%; width: 100%;" :option="option1" />
                </div>
                <div style="height: calc(50% - 15px); width: 100%; display: flex;">
                    <div style="width: 50%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.65);">
                            1.1.2 专业线收入
                        </div>
                        <div style="height: calc(100% - 30px); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.45);">公众渠道</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :bordered="false" :data="data1" size="mini" :pagination="false" class="custom-table" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.45);">政企渠道</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :bordered="false" :data="data2" size="mini" :pagination="false" class="custom-table" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 50%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.65);">
                            1.1.3 分业务收入
                        </div>
                        <div style="height: calc(100% - 30px); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.45);">联网通信</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :bordered="false" :data="data3" size="mini" :pagination="false" class="custom-table" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.45);">算网数智</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :bordered="false" :data="data4" size="mini" :pagination="false" class="custom-table" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 100%; width: 40%; display: flex; flex-direction: column; padding: 8px; gap: 12px; background-color: #1C2238;">
                <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.65);">
                    1.1.4 收入分析
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.45);">公众联网通信收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option2" />
                    </div>
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.45);">政企联网通信收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option3" />
                    </div>
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center; color: rgba(255, 255, 255, 0.45);">算网数智收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option4" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else style="height:100%; display:flex; align-items:center; justify-content:center;">
        <a-spin size="large" tip="数据加载中..." />
    </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from "echarts/renderers"
import { BarChart, LineChart, GaugeChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components"
import Vchart from "vue-echarts"
import { ref, onMounted } from "vue"
import { getPeriodData, getAccumulatedRevenue, getRevenueOfProvinceByMonth, getRevenueOfProvinceAnalysis } from '@/api/products'

use([CanvasRenderer, BarChart, LineChart, GaugeChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

// 记得改回来
const loaded = ref(true)
const option1 = ref({
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

const option2 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)', '当月完成率(%)', '当月同比(%)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' } },
    series: [
        { name: '2024(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '2025(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } },
    ]
})

const option3 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)', '当月完成率(%)', '当月同比(%)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' }  },
    series: [
        { name: '2024(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '2025(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } },
    ]
})

const option4 = ref({
    grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
    xAxis: { data: [] },
    yAxis: [{ type: 'value', show: false }, { type: 'value', show: false }],
    legend: { show: true, data: ['2024(万)', '2025(万)', '当月完成率(%)', '当月同比(%)'], top: '5%', textStyle: { color: 'rgba(255, 255, 255, 0.65)' }  },
    series: [
        { name: '2024(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: false, position: 'top' } },
        { name: '2025(万)', type: 'bar', data: [], yAxisIndex: 0, label: { show: true, position: 'top' } },
    ]
})

const currentMonth = ref([0, 0, 0, 0])
const accumulated = ref([0, 0, 0, 0])

const columns = [
    {
        title: '累计完成（万）',
        dataIndex: 'completed'
    },
    {
        title: '累计同比（%）',
        dataIndex: 'yoy'
    },
    {
        title: '序时完成率（%）',
        dataIndex: 'progressRate'
    }, 
    {
        title: '收入缺口（万）',
        dataIndex: 'incomeGap'
    }
]

const data1 = ref([])
const data2 = ref([])
const data3 = ref([])
const data4 = ref([])

function generatePeriods(year, endMonth) {
    const periods = []
    for(let m = 1; m <= endMonth; m++) {
        const month = m.toString().padStart(2, '0')
        periods.push(Number(`${year}${month}`))
    }
    return periods
}

onMounted(async () => {
    try {
        const [res1, res2, resOfTable1, resOfTable2, resOfTable3, resOfTable4, res1ofOption2, res2OfOption2, res1ofOption3, res2OfOption3, res1ofOption4, res2OfOption4, res4, accumulatedRes] = await Promise.all([
            getRevenueOfProvinceByMonth(2024, 'root'),
            getRevenueOfProvinceByMonth(2025, 'root'),
            getAccumulatedRevenue(202507, 'root', { profession: 'public' }),
            getAccumulatedRevenue(202507, 'root', { profession: 'enterprise' }),
            getAccumulatedRevenue(202507, 'root', { business: 'networking' }),
            getAccumulatedRevenue(202507, 'root', { business: 'digitalIntelligence' }),
            getRevenueOfProvinceByMonth(2024, 'root', { profession: 'public', business: 'networking'}),
            getRevenueOfProvinceByMonth(2025, 'root', { profession: 'public', business: 'networking'}),
            getRevenueOfProvinceByMonth(2024, 'root', { profession: 'enterprise', business: 'networking'}),
            getRevenueOfProvinceByMonth(2025, 'root', { profession: 'enterprise', business: 'networking'}),
            getRevenueOfProvinceByMonth(2024, 'root', { business: 'digitalIntelligence'}),
            getRevenueOfProvinceByMonth(2025, 'root', { business: 'digitalIntelligence'}),
            getPeriodData(202507),
            getAccumulatedRevenue(202507, 'root'),
        ])

        if(res1.data && res1.data.success) {
            // option1.value.xAxis.data = res1.data.data.map(item => item.month.slice(4, 6) + '月')
            option1.value.series[0].data = res1.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res2.data && res2.data.success) {
            option1.value.xAxis.data = res2.data.data.map(item => item.month.slice(4, 6) + '月')
            option1.value.series[1].data = res2.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(resOfTable1.data && resOfTable1.data.success) {
            data1.value = [{
                'completed': resOfTable1.data.data.completed,
                'yoy': resOfTable1.data.data.yoy,
                'progressRate': resOfTable1.data.data.progressRate,
                'incomeGap': resOfTable1.data.data.incomeGap,
            }]
        }

        if(resOfTable2.data && resOfTable2.data.success) {
            data2.value = [{
                'completed': resOfTable2.data.data.completed,
                'yoy': resOfTable2.data.data.yoy,
                'progressRate': resOfTable2.data.data.progressRate,
                'incomeGap': resOfTable2.data.data.incomeGap,
            }]
        }

        if(resOfTable3.data && resOfTable3.data.success) {
            data3.value = [{
                'completed': resOfTable3.data.data.completed,
                'yoy': resOfTable3.data.data.yoy,
                'progressRate': resOfTable3.data.data.progressRate,
                'incomeGap': resOfTable3.data.data.incomeGap,
            }]
        }

        if(resOfTable4.data && resOfTable4.data.success) {
            data4.value = [{
                'completed': resOfTable4.data.data.completed,
                'yoy': resOfTable4.data.data.yoy,
                'progressRate': resOfTable4.data.data.progressRate,
                'incomeGap': resOfTable4.data.data.incomeGap,
            }]
        }

        if(res1ofOption2.data && res1ofOption2.data.success) {
            // option1.value.xAxis.data = res1.data.data.map(item => item.month.slice(4, 6) + '月')
            option2.value.series[0].data = res1ofOption2.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res2OfOption2.data && res2OfOption2.data.success) {
            option2.value.xAxis.data = res2OfOption2.data.data.map(item => item.month.slice(4, 6) + '月')
            option2.value.series[1].data = res2OfOption2.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        
        if(res1ofOption3.data && res1ofOption3.data.success) {
            // option1.value.xAxis.data = res1.data.data.map(item => item.month.slice(4, 6) + '月')
            option3.value.series[0].data = res1ofOption3.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res2OfOption3.data && res2OfOption3.data.success) {
            option3.value.xAxis.data = res2OfOption3.data.data.map(item => item.month.slice(4, 6) + '月')
            option3.value.series[1].data = res2OfOption3.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res1ofOption4.data && res1ofOption4.data.success) {
            // option1.value.xAxis.data = res1.data.data.map(item => item.month.slice(4, 6) + '月')
            option4.value.series[0].data = res1ofOption4.data.data.map(item => (item.value / 10000).toFixed(2))
        }

        if(res2OfOption4.data && res2OfOption4.data.success) {
            option4.value.xAxis.data = res2OfOption4.data.data.map(item => item.month.slice(4, 6) + '月')
            option4.value.series[1].data = res2OfOption4.data.data.map(item => (item.value / 10000).toFixed(2))
        }
        // if(res3.data.success && Array.isArray(res3.data.data) && res3.data.data.length > 0) {
        //     monthComplete.value = +(res3.data.data[0].value / 10000).toFixed(2)
        //     monthRate.value = +(res3.data.data[0].rate * 100).toFixed(2)
        // }

        if(res4.data && res4.data.currentMonth) {
            currentMonth.value[0] = res4.data.currentMonth.completed
            currentMonth.value[1] = res4.data.currentMonth.yoy
            currentMonth.value[2] = res4.data.currentMonth.completionRate
            currentMonth.value[3] = res4.data.currentMonth.incomeGap
        }

        const periods = generatePeriods(2025, 7)
        const results = await Promise.all(periods.map(p => getPeriodData(p)))
        console.log(results)
        option1.value.series[2].data = results.map(res => {
            if(res.data && res.data.currentMonth) {
                return res.data.currentMonth.completionRate
            }
            return 0
        }) 

        option1.value.series[3].data = results.map(res => {
            if(res.data && res.data.currentMonth) {
                return res.data.currentMonth.yoy
            }
            return 0
        })

        if(accumulatedRes.data && accumulatedRes.data.success) {
            accumulated.value[0] = accumulatedRes.data.data.completed
            accumulated.value[1] = accumulatedRes.data.data.yoy
            accumulated.value[2] = accumulatedRes.data.data.progressRate
            accumulated.value[3] = accumulatedRes.data.data.incomeGap
        }

        loaded.value = true
    } catch (e) {
        console.error(e)
    }
})
</script>

<style scoped>

/* 表头背景 & 字体 */
:deep(.custom-table .arco-table-th) {
  background-color: #0A0F25;
  color: rgba(255, 255, 255, 0.65);
  font-weight: bold;
}

/* 表格行 */
:deep(.custom-table .arco-table-td) {
  background-color: #1C2238;
  color: #fff;
}

:deep(.custom-table .arco-table-tr:hover .arco-table-td) {
  background-color: #2A314B;
}

/* ---- Statistic 部分 ---- */
:deep(.arco-statistic .arco-statistic-title) {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}

:deep(.arco-statistic .arco-statistic-value) {
  color: #fff;
  font-weight: bold;
}


:deep(.arco-statistic .arco-statistic-title) {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}

:deep(.arco-statistic .arco-statistic-content .arco-statistic-value) {
  color: #fff;
  font-weight: bold;
}

</style>