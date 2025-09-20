<template>
    <el-row style="width: 100%; height: 50%;">
        <el-col class="content" :span="4">联网通信</el-col>
        <el-col class="content" :span="20" style="height: 100%;">
            <dv-scroll-board v-if="loaded1" :config="config1" style="width: 100%; height: 50%;"></dv-scroll-board>
            <div v-else style="width: 100%; height: 50%; display: flex; align-items: center; justify-content: center;">
                <a-spin :size="32" />
            </div>
        </el-col>
    </el-row>
    <el-row style="width: 100%; height: 50%;">
        <el-col class="content" :span="4">算网数智</el-col>
        <el-col class="content" :span="20" style="height: 100%;">
            <dv-scroll-board v-if="loaded2" :config="config2" style="width: 100%; height: 50%;"></dv-scroll-board>
            <div v-else style="width: 100%; height: 50%; display: flex; align-items: center; justify-content: center;">
                <a-spin :size="32" />
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { getRevenueOfNetworking, getRevenueOfDigitalIntelligence } from '../../../../api/business'
import { useDateStore } from '../../../../stores/useDateStore'

const dateStore = useDateStore()

const loaded1 = ref(false)
const config1 = ref({
    header: ['累计完成(万)', '累计同比(%)', '序时完成率(%)', '收入缺口(万)'],
    data: [],
    columnWidth: [150, 150, 150, 150],
    align: ['center', 'center', 'center', 'center'],
    rowNum: 1
})

const loaded2 = ref(false)
const config2 = ref({
    header: ['累计完成(万)', '累计同比(%)', '序时完成率(%)', '收入缺口(万)'],
    data: [
        ['行1列1', '行1列2', '行1列3', '行1列4'],
        ['行2列1', '行2列2', '行2列3', '行2列4'],
    ],
    columnWidth: [150, 150, 150, 150],
    align: ['center', 'center', 'center', 'center'],
    rowNum: 1
})

const fetchData = async() => {
    try {
        loaded1.value = false
        loaded2.value = false

        const dateParam = dateStore.month

        const [res1, res2] = await Promise.all([
            getRevenueOfNetworking(dateParam, 'root'),
            // getRevenueOfDigitalIntelligence(dateParam, 'root')
        ])

        if(res1.data) {
            const gansu = res1.data.find(item => item.areaName === '甘肃省')
            if(gansu) {
                config1.value.data = [[
                    gansu.accumulatedRevenue,
                    gansu.accumulatedYoyRate,
                    gansu.scheduleCompletion,
                    gansu.annualTarget - gansu.accumulatedRevenue
                ]]
            }

            loaded1.value = true
        }

        // if(res2.data) {
        //     const gansu = res2.data.find(item => item.areaName === '甘肃省')
        //     if(gansu) {
        //         config2.value.data = [[
        //             gansu.accumulatedRevenue,
        //             gansu.accumulatedYoyRate,
        //             gansu.scheduleCompletion,
        //             gansu.annualTarget - gansu.accumulatedRevenue
        //         ]]
        //     }

        //     loaded2.value = true
        // }

    } catch(e) {
        console.error(e)
    }
}

onMounted(fetchData)

watch(() => dateStore.month, () => {
    fetchData()
})
</script>

<style scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
