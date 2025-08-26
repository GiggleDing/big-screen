<template>
    <div style="height: 100%; width: 100%;">
        <div style="height: 5%; width: 100%;">
            <h1 style="text-align: center;">1.1 收入分析</h1>
        </div>
        <div style="height: 10%; width: 100%; display: flex;">
            <div style="width: 5%; display: flex; justify-content: center; align-items: center;">
                <span style="font-size: 1.5em; font-weight: bold; line-height: 1.1; text-align: center;">
                    本<br/>月
                </span>
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="当月完成（万）" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="当月同比" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="当月完成率" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="当月收入缺口" :value="125670" />
            </div>
            <div style="width: 5%; display: flex; justify-content: center; align-items: center;">
                <span style="font-size: 1.5em; font-weight: bold; line-height: 1.1; text-align: center;">
                    累<br/>计
                </span>
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="累计完成（万）" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="累计同比" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="序时完成率" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="累计收入缺口（万）" :value="125670" />
            </div>
            <div style="width: 10%; display: flex; justify-content: center; align-items: center;">
                <a-statistic title="累计毛利缺口（万）" :value="125670" />
            </div>
        </div>
        <div style="height: 85%; width: 100%; display: flex;">
            <div style="height: 100%; width: 60%;">
                <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center;">
                    1.1.1 整体收入情况
                </div>
                <div style="width: 100%; height: calc(50% - 15px);">
                    <Vchart style="height: 100%; width: 100%;" :option="option1" />
                </div>
                <div style="height: calc(50% - 15px); width: 100%; display: flex;">
                    <div style="width: 50%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center;">
                            1.1.2 专业线收入
                        </div>
                        <div style="height: calc(100% - 30px); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center;">公众渠道</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :data="data" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center;">政企渠道</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :data="data" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 50%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center;">
                            1.1.3 分业务收入
                        </div>
                        <div style="height: calc(100% - 30px); width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center;">联网通信</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :data="data" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                            <div style="height: 50%; width: 100%; flex: 1; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 20%; display: flex; align-items: center; justify-content: center;">算网数智</div>
                                <div style="width: 80%; display: flex; align-items: center; justify-content: center;">
                                    <a-table :columns="columns" :data="data" style="height: 100%; width: 100%;" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 100%; width: 40%; display: flex; flex-direction: column;">
                <div style="width: 100%; height: 30px; font-size: 1.5em; font-weight: bold; display: flex; align-items: center;">
                    1.1.4 收入分析
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center;">公众联网通信收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option1" />
                    </div>
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center;">政企联网通信收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option1" />
                    </div>
                    <div style="width: 100%; height: 33.33%;">
                        <div style="width: 100%; height: 30px; font-weight: bold; display: flex; align-items: center;">算网数智收入</div>
                        <Vchart style="height: calc(100% - 30px); width: 100%;" :option="option1" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from "echarts/renderers"
import { BarChart, LineChart, GaugeChart } from "echarts/charts"
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
} from "echarts/components"
import Vchart, { THEME_KEY } from "vue-echarts"
import { ref, provide, onMounted } from "vue"
import { getRevenueOfProvinceByMonth } from '@/api/products'

use([
    CanvasRenderer,
    BarChart,
    LineChart,
    GaugeChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
]);

// provide(THEME_KEY, "dark");

const option1 = ref({
    grid: {
            left: '3%',
            right: '3%',
            bottom: '10%',
            containLabel: true // 保证轴标签不被裁剪
        },
    xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: [
        {
            type: 'value',
            position: 'left',
            show: false
        },
        {
            type: 'value',
            position: 'right',
            show: false
        }
    ],
    legend: {
        show: true,
        data: ['2024(万)', '2025(万)', '当月完成率(%)', '当月同比(%)'],
        top: '5%'
    },
    series: [
        {
            name: '2024(万)',
            type: 'bar',
            data: [],
            yAxisIndex: 0,
            label: {
                show: true,
                position: 'top'
            }
        },
        {
            name: '2025(万)',
            type: 'bar',
            data: [26, 24, 18, 22, 23, 20, 27],
            yAxisIndex: 0,
            label: {
                show: true,
                position: 'top'
            }
        },
        {
            name: '当月完成率(%)',
            type: 'line',
            data: [32, 34, 12, 24, 27, 31, 16],
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top'
            }
        },
        {
            name: '当月同比(%)',
            type: 'line',
            data: [23, 43, 21, 42, 72, 13, 61],
            yAxisIndex: 1,
            label: {
                show: true,
                position: 'top'
            }
        }
    ]
});

const monthComplete = ref(0)
const monthRate = ref(0)

onMounted(() => {
    getRevenueOfProvinceByMonth(2024, 8710).then(res => {
        if(res.data && res.data.success && Array.isArray(res.data.data)) {
            const apiData = res.data.data.map(item => (item.value / 10000).toFixed(2));
            option1.value.xAxis.data = res.data.data.map(item => item.month.slice(4, 6) + '月');
            option1.value.series[0].data = apiData;
        }
    })

    getRevenueOfProvinceAnalysis(202507, 2025, 'root').then(res => {
        if(res.success && Array.isArray(res.data) && res.data.length > 0) {
            monthComplete.value = (res.data[0].value / 10000).toFixed(2)
            monthRate.value = (res.data[0].rate * 100).toFixed(2)
        }
    })
})
</script>

<style scoped>

</style>