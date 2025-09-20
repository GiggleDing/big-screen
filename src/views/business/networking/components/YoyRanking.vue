<template>
    <el-col style="width: 100%; height: 100%;">
        <el-table height="680px" stripe fit size="small" :data="data" v-loading="data.length === 0" :row-style="{ height: '44.7px' }">
            <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label" :formatter="col.formatter" align="center" />
        </el-table>
    </el-col>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getRevenueOfNetworking } from '../../../../api/business'
import { useDateStore } from '../../../../stores/useDateStore'

const props = defineProps({
    profession: {
        type: String,
        required: true
    }
})

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
        label: '累计完成值',
        prop: 'accumulatedRevenue',
        formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue.toFixed(2)} 万元` : '-'
    },
    {
        label: '累计同比',
        prop: 'accumulatedYoyRate',
        formatter: (row, column, cellValue) => cellValue !== null && cellValue !== undefined ? `${cellValue}%` : '-'
    }
]

const data = ref([])

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

        if(res.data) {
            data.value = res.data
                .filter(item => item.areaName !== '甘肃省')
                .map((item) => ({
                    areaName: item.areaName,
                    accumulatedRevenue: Number(item.accumulatedRevenue),
                    accumulatedYoyRate: Number(item.accumulatedYoyRate)
                }))
                .sort((a, b) => b.accumulatedYoyRate - a.accumulatedYoyRate)
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
    () => [dateStore.month, props.profession],
    () => {
        fetchData()
    }
)
</script>
