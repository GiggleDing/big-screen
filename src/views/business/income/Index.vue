<template>
    <BaseScreen>
        <template #header-center>
            <h1>1.1 收入分析</h1>
        </template>

        <template #header-right>
            <el-date-picker size="large" v-model="dateStore.month" type="month" value-format="YYYYMM" />
        </template>

        <template #main>
            <el-row style="height: 20%; width: 100%;">
                <el-col :span="12"><MyCard style="width: 100%; height: 100%;" /></el-col>
                <el-col :span="12"><MyCard style="width: 100%; height: 100%;" /></el-col>
            </el-row>
            <el-row style="height: 80%; width: 100%;">
                <el-col :span="17">
                    <el-row style="height: 50%;">
                        <dv-border-box11 title="1.1.1 整体收入情况" :title-width="400" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <OverallIncome />
                            </div>
                        </dv-border-box11>
                    </el-row>
                    <el-row style="height: 50%;">
                        <el-col :span="12">
                            <dv-border-box11 title="1.1.2 专业线收入情况" :title-width="220" backgroundColor="#100c2a">
                                <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                    <ProfessionalLine />
                                </div>
                            </dv-border-box11>
                        </el-col>
                        <el-col :span="12">
                            <dv-border-box11 title="1.1.3 分业务收入情况" :title-width="220" backgroundColor="#100c2a">
                                <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                    <IncomeByBusiness />
                                </div>
                            </dv-border-box11>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="7">
                    <dv-border-box11 title="1.1.4 收入分析" :title-width="220" backgroundColor="#100c2a">
                        <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                            <IncomeAnalysis />
                        </div>
                    </dv-border-box11>
                </el-col>
            </el-row>
        </template>
    </BaseScreen>
</template>

<script setup>
import { useDateStore } from '../../../stores/useDateStore'
import BaseScreen from '../../../components/BaseScreen.vue'
import MyCard from '../../../components/MyCard.vue'
import IncomeAnalysis from './components/IncomeAnalysis.vue'
import IncomeByBusiness from './components/IncomeByBusiness.vue'
import OverallIncome from './components/OverallIncome.vue'
import ProfessionalLine from './components/ProfessionalLine.vue'

const dateStore = useDateStore()
</script>
