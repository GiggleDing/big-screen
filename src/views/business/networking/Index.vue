<template>
    <div class="container">
        <el-card class="header-card">
            <el-row justify="center" align="middle">
                <el-col :span="7"></el-col>
                <el-col :span="7" style="text-align: center; font-size: 1.8em; font-weight: bold;">
                    {{ headerTitle }}
                </el-col>
                <el-col :span="7" style="text-align: right;">
                    <el-space>
                        <el-select v-model="value" placeholder="Select" style="width: 240px" @change="handleSelectChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-space>
                </el-col>
            </el-row>
        </el-card>
        <div style="height: 15%; margin: 15px;">
            <IncomeOfNetworking :data="branchData" />
        </div>
        <el-row style="margin-top: 20px;" class="content-row" :gutter="30">
            <el-col :span="12" class="full-height">
                <BranchCompletion :tableData="branchData" />
            </el-col>
            <el-col :span="6" class="full-height">
                <CompletionRateRanking :branchData="branchData" />
            </el-col>
            <el-col :span="6" class="full-height">
                <YoyRanking :tableData="branchData" />
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import BranchCompletion from './components/BranchCompletion.vue'
import CompletionRateRanking from './components/CompletionRateRanking.vue'
import YoyRanking from './components/YoyRanking.vue'
import IncomeOfNetworking from './components/IncomeOfNetworking.vue'
import { getRevenueOfNetworking } from '@/api/products'

const value = ref('networking')

const options = [
    { value: 'networking', label: '联网通信' },
    { value: 'networkingOfPublic', label: '公众联网通信' },
    { value: 'networkingOfEnterprise', label: '政企联网通信' }
]

const branchData = ref([])

// 根据选项值请求不同接口
const fetchData = async (selectedValue) => {
    try {
        let res
        if (selectedValue === 'networking') {
            res = await getRevenueOfNetworking(202507, 'root')
        } else if (selectedValue === 'networkingOfPublic') {
            res = await getRevenueOfNetworking(202507, 'root', { profession: 'public' })
        } else if (selectedValue === 'networkingOfEnterprise') {
            res = await getRevenueOfNetworking(202507, 'root', { profession: 'enterprise' })
        }
        branchData.value = res.data
    } catch (e) {
        console.error(e)
    }
}

// 监听 value 变化，自动调用接口
watch(value, (newVal) => {
    fetchData(newVal)
})

// 页面加载时默认请求“联网通信”
onMounted(() => {
    fetchData(value.value)
})

// 动态标题
const headerTitle = computed(() => {
    switch (value.value) {
        case 'networking':
            return '1.2 联网通信主营出账收入'
        case 'networkingOfPublic':
            return '1.2 公众联网通信主营出账收入'
        case 'networkingOfEnterprise':
            return '1.2 政企联网通信主营出账收入'
        default:
            return ''
    }
})
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.header-card {
    flex-shrink: 0;
}

.content-row {
    flex: 1;
    margin: 20px 20px 0 20px;
}

.full-height {
    height: 100%;
}
</style>
