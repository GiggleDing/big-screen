<template>
    <el-row style="width: 100%; height: 100%">
        <el-col :span="9">
            <dv-border-box11 title="量" :title-width="220" backgroundColor="#100c2a">
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-col class="content" :span="4">移网</el-col>
                    <el-col :span="1">
                        <el-divider direction="vertical" style="height: 100%;" />
                    </el-col>
                    <el-col :span="19">
                        <el-row style="width: 100%; height: 100%">
                            <el-col class="content" :span="12">
                                <div style="display:flex;flex-direction:column;align-items:center;">
                                    <div>当月值：{{ data &&  data.devUserCnt !== undefined ?  data.devUserCnt : '-' }}</div>
                                </div>
                            </el-col>
                            <el-col class="content" :span="12">
                                <div style="display:flex;flex-direction:column;align-items:center;">
                                    <div>完成率：{{ data &&  data.completionRate !== undefined ?  data.completionRate : '-' }}%</div>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <v-chart v-if="loaded" style="width: 100%; height: 100%" :option="option" />
                </el-row>
            </dv-border-box11>
        </el-col>
        <el-col :span="5">
            <dv-border-box11 title="质" :title-width="80" backgroundColor="#100c2a">
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">上月发展本月出账且活跃率</div>
                            <div class="content">{{ data &&  data.activeRate !== undefined ?  data.activeRate : '-' }}%</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.activeRateMoM !== undefined ?  data.activeRateMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.activeRateYoY !== undefined ?  data.activeRateYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">异网率</div>
                            <div class="content">{{ data &&  data.diffNetRate !== undefined ?  data.diffNetRate : '-' }}%</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.diffNetRateMoM !== undefined ?  data.diffNetRateMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.diffNetRateYoY !== undefined ?  data.diffNetRateYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
            </dv-border-box11>
        </el-col>
        <el-col :span="5">
            <dv-border-box11 title="构" :title-width="80" backgroundColor="#100c2a">
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">移宽融合渗透率</div>
                            <div class="content">{{ data &&  data.fusionRate !== undefined ?  data.fusionRate : '-' }}%</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.fusionRateMoM !== undefined ?  data.fusionRateMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.fusionRateYoY !== undefined ?  data.fusionRateYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">出账39元(不含)以下用户占比</div>
                            <div class="content">{{ data &&  data.below39Rate !== undefined ?  data.below39Rate : '-' }}%</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.below39RateMoM !== undefined ?  data.below39RateMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.below39RateYoY !== undefined ?  data.below39RateYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
            </dv-border-box11>
        </el-col>
        <el-col :span="5">
            <dv-border-box11 title="效" :title-width="80" backgroundColor="#100c2a">
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">百元等效用户占比</div>
                            <div class="content">{{ data &&  data.hundredEqRate !== undefined ?  data.hundredEqRate : '-' }}%</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.hundredEqRateMoM !== undefined ?  data.hundredEqRateMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.hundredEqRateYoY !== undefined ?  data.hundredEqRateYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
                <el-row style="height: 50%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                    <el-row style="width: 100%; height: 50%">
                        <el-col :span="24">
                            <div class="content">移网新发展户均出账(元)</div>
                            <div class="content">{{ data &&  data.avgBill !== undefined ?  data.avgBill : '-' }}</div>
                        </el-col>
                    </el-row>
                    <el-row style="width: 100%; height: 50%">
                        <el-col class="content" :span="12">环比：{{ data &&  data.avgBillMoM !== undefined ?  data.avgBillMoM : '-' }}%</el-col>
                        <el-col class="content" :span="12">同比：{{ data &&  data.avgBillYoY !== undefined ?  data.avgBillYoY : '-' }}%</el-col>
                    </el-row>
                </el-row>
            </dv-border-box11>
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

const loaded = ref(false)
const option = ref({})

const data = ref({})

const buildOption = (monthlyData) => {
    if (!monthlyData?.months || monthlyData.months.length === 0) return {}

    const months = monthlyData.months.sort((a, b) => a.month - b.month)

    return {
        grid: { left: '3%', right: '3%', bottom: '10%', containLabel: true },
        xAxis: { data: months.map(m => `${m.month}月`) },
        yAxis: [
            { type: 'value', show: false },
            { type: 'value', show: false }
        ],
        legend: { 
            show: true, 
            data: ['移网发展(户)', '完成率(%)'],
            top: '2%', 
            textStyle: { color: 'rgba(255, 255, 255, 0.65)' } 
        },
        series: [
            { 
                name: '移网发展(户)',
                type: 'bar',
                data: months.map(m => m.devUserCnt),
                yAxisIndex: 0,
                label: { show: false, position: 'top' }
            },
            { 
                name: '完成率(%)',
                type: 'line', 
                data: months.map(m => m.completionRate), 
                yAxisIndex: 1,
                label: { show: true, position: 'top', formatter: '{c}%' } 
            }
        ]
    }
}

 const fetchData = async() => {
     try {
        loaded.value = false
         const dateParam = dateStore.month
         const currentMonth = Number(dateParam.slice(-2))

         const monthlyData = { months: [] }

         const promises = []
         for (let month = 1; month <= currentMonth; month++) {
            const monthStr = month.toString().padStart(2, '0');
            const year = dateParam.slice(0, 4); // 截取前四位作为年份
            const monthParam = `${year}${monthStr}`; // 拼接成 202501、202502……
            promises.push(getDevOfMobile(monthParam, "root"));
         }

         const results = await Promise.all(promises)
         
         results.forEach((res, index) => {
            const month = index + 1
            if (res.data && Array.isArray(res.data)) {
                const province = res.data.find(item => item.areaName === '甘肃省')
                if (province) {
                    monthlyData.months.push({
                        month,
                        devUserCnt: Number(province.devUserCnt ?? 0),
                        completionRate: Number(province.completionRate ?? 0)
                    })
                }
            }
         })

        option.value = buildOption(monthlyData)
        loaded.value = true

         let res = await getDevOfMobile(dateParam, "root")

         if (res.data && Array.isArray(res.data)) {
             const province = res.data.find(item => item.areaName === '甘肃省')
             if (province) {
                 data.value = {
                     areaName: province.areaName,
                     devUserCnt: Number(province.devUserCnt ?? 0),
                     activeRate: Number(province.activeRate ?? 0),
                     below39Rate: Number(province.below39Rate ?? 0),
                     hundredEqRate: Number(province.hundredEqRate ?? 0),
                     completionRate: Number(province.completionRate ?? 0),
                     completionRateMoM: Number(province.completionRateMoM ?? 0),
                     completionRateYoY: Number(province.completionRateYoY ?? 0),
                     activeRateMoM: Number(province.activeRateMoM ?? 0),
                     activeRateYoY: Number(province.activeRateYoY ?? 0),
                     diffNetRate: Number(province.diffNetRate ?? 0),
                     diffNetRateYoY: Number(province.diffNetRateYoY ?? 0),
                     diffNetRateMoM: Number(province.diffNetRateMoM ?? 0),
                     fusionRate: Number(province.fusionRate ?? 0),
                     fusionRateMoM: Number(province.fusionRateMoM ?? 0),
                     fusionRateYoY: Number(province.fusionRateYoY ?? 0),
                     below39RateMoM: Number(province.below39RateMoM ?? 0),
                     below39RateYoY: Number(province.below39RateYoY ?? 0),
                     hundredEqRateMoM: Number(province.hundredEqRateMoM ?? 0),
                     hundredEqRateYoY: Number(province.hundredEqRateYoY ?? 0),
                     avgBill: Number(province.avgBill ?? 0),
                     avgBillMoM: Number(province.avgBillMoM ?? 0),
                     avgBillYoY: Number(province.avgBillYoY ?? 0),
                 }
             } else {
                 data.value = null
             }
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

<style scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
