<template>
    <el-col style="width: 100%; height: 100%;">
        <el-table height="870px" stripe fit size="small" :data="data" v-loading="data.length === 0" :row-style="{ height: '46px' }">
            <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label" :formatter="col.formatter" align="center" />
        </el-table>
    </el-col>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useDateStore } from '../../../../stores/useDateStore'
import { getDevOfMobile } from '../../../../api/business'

const dateStore = useDateStore()

const tableColumns = [
    {
        label: '排名',
        prop: 'ranking'
    },
    {
        label: '地市',
        prop: 'areaName'
    },
    {
        label: '移网发展',
        prop: 'devUserCnt'
    },
    {
        label: '上月发展本月出账且活跃率',
        prop: 'activeRate',
        formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-'
    },
    {
        label: '出账 39 元（不含）以下用户占比',
        prop: 'below39Rate',
        formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-'
    },
    {
        label: '百元等效用户占比',
        prop: 'hundredEqRate',
        formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-'
    }
]

const data = ref([])

const fetchData = async() => {
    try {
        const dateParam = dateStore.month
        
        let res = await getDevOfMobile(dateParam, "root")

        if(res.data) {
            data.value = res.data
                .filter(item => item.areaName !== '甘肃省')
                .map((item) => ({
                    areaName: item.areaName,
                    devUserCnt: Number(item.devUserCnt),
                    activeRate: Number(item.activeRate),
                    below39Rate: Number(item.below39Rate),
                    hundredEqRate: Number(item.hundredEqRate)
                }))
                .sort((a, b) => b.devUserCnt - a.devUserCnt)
                .map((item, index) => ({
                    ...item,
                    ranking: index + 1
                }))
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
