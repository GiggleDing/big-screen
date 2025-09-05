<template>
    <div style="height: 40%; width: 100%;">
        <MyTable 
        :data="tableData" 
        :loading="loading"
        :min-row-height="50"
        @row-click="handleRowClick"
        >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="city" label="城市" />
        </MyTable>
    </div>
</template>

<script setup>
import MyTable from '@/components/MyTable.vue'

const tableData = [
    { city: 1, name: "张三", age: 20 },
    { city: 2, name: "李四", age: 21 },
    { city: 3, name: "王五", age: 22 },
    { city: 4, name: "赵六", age: 23 },
    { city: 5, name: "孙七", age: 24 },
];
</script>
