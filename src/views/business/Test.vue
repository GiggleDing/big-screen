<template>
    <div style="width: 100%; height: 50%;">
        <!-- 使用自动滚动表格 -->
        <MyTable :data="tableData" :height="'100%'"  :auto-start="true" :auto-length="4" :scroll-interval="30">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="age" label="年龄" width="120" />
        </MyTable>
    </div>
</template>

<script setup>
import MyTable from '@/components/MyTable.vue'

const tableData = [
    { id: 1, name: "张三", age: 20 },
    { id: 2, name: "李四", age: 21 },
    { id: 3, name: "王五", age: 22 },
    { id: 4, name: "赵六", age: 23 },
    { id: 5, name: "孙七", age: 24 },
    { id: 6, name: "周八", age: 25 },
    { id: 7, name: "吴九", age: 26 }
];
</script>
