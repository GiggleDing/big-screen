<template>
    <BaseScreen>
        <template #header-center>
            <h1>{{ headerTitle }}</h1>
        </template>

        <template #header-right>
            <el-select size="large" v-model="value" placeholder="Select" style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-date-picker size="large" v-model="dateStore.month" type="month" value-format="YYYYMM" />
        </template>

        <template #main>
            <el-row style="height: 20%; width: 100%;">
                <el-col :span="24">
                    <IncomeOfNetworking :profession="value" />
                </el-col>
            </el-row>
            <el-row style="height: 80%; width: 100%;">
                <el-col :span="12">
                    <el-row style="height: 100%;">
                        <dv-border-box11 title="1.2.1 分公司完成情况" :title-width="400" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <BranchCompletion :profession="value" />
                            </div>
                        </dv-border-box11>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row style="height: 100%;">
                        <dv-border-box11 title="1.2.2 完成率排名" :title-width="220" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <CompletionRateRanking :profession="value" />
                            </div>
                        </dv-border-box11>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row style="height: 100%;">
                        <dv-border-box11 title="1.2.3 同比排名" :title-width="220" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <YoyRanking :profession="value" />
                            </div>
                        </dv-border-box11>
                    </el-row>
                </el-col>
            </el-row>
        </template>
    </BaseScreen>
</template>

<script setup>
import { useDateStore } from '../../../stores/useDateStore'
import { ref, computed } from 'vue'
import BaseScreen from '../../../components/BaseScreen.vue'
import MyCard from '../../../components/MyCard.vue'
import BranchCompletion from './components/BranchCompletion.vue'
import CompletionRateRanking from './components/CompletionRateRanking.vue'
import YoyRanking from './components/YoyRanking.vue'
import IncomeOfNetworking from './components/IncomeOfNetworking.vue'

const options = [
    { value: 'networking', label: '联网通信' },
    { value: 'networkingOfPublic', label: '公众联网通信' },
    { value: 'networkingOfEnterprise', label: '政企联网通信' }
]

const value = ref('networking')
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

const dateStore = useDateStore()
</script>
