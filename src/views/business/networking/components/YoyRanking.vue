<template>
    <MyCard style="width: 100%; height: 100%;" :level="1" title="1.2.3 同比排名">
        <el-table :data="sortedData" stripe fit size="small" style="width: 100%; height: 100%;" v-loading="tableData.length === 0">
            <el-table-column v-for="col in tableColumns" :key="col.prop" :prop="col.prop" :label="col.label" :formatter="col.formatter" align="center"  min-width="50" show-overflow-tooltip />
        </el-table>
    </MyCard>
</template>

<script setup>
import MyCard from '@/components/MyCard.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
    tableData: {
        type: Array,
        required: true
    }
})

const sortedData = computed(() => {
    return [...props.tableData]
        .sort((a, b) => Number(b.accumulatedYoyRate) - Number(a.accumulatedYoyRate))
        .map((item, index) => ({
            ...item,
            ranking: `No.${index + 1}`
        }))
})

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
        formatter: (row, column, cellValue) => cellValue ? `${cellValue} 万元` : '-'
    },
    {
        label: '累计同比',
        prop: 'accumulatedYoyRate',
        formatter: (row, column, cellValue) => cellValue ? `${cellValue}%` : '-'
    }
]
</script>
