<template>
    <BaseScreen>
        <template #header-center>
            <h1>2.1 移网发展分析</h1>
        </template>

        <template #header-right>
            <el-date-picker size="large" v-model="dateStore.month" type="month" value-format="YYYYMM" />
        </template>

        <template #main>
            <el-row style="height: 100%; width: 100%;">
                <el-col :span="16">
                    <el-row style="height: 45%; width: 100%">
                        <div style="height: 100%; width: 100%"><DevOfMobile /></div>
                    </el-row>
                    <el-row style="height: 55%; width: 100%">
                        <dv-border-box11 title="量-移网发展" :title-width="220" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <DevRankingByGroup />
                            </div>
                        </dv-border-box11>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row style="height: 100%; width: 100%;">
                        <dv-border-box11 title="量-移网发展" :title-width="220" backgroundColor="#100c2a">
                            <div style="height: 100%; width: 100%; padding: 60px 20px 15px 20px; box-sizing: border-box;">
                                <DevRanking />
                            </div>
                        </dv-border-box11>
                    </el-row>
                </el-col>
            </el-row>
        </template>
    </BaseScreen>
</template>

<script setup lang="ts">
import BaseScreen from '../../../components/BaseScreen.vue'
import { useDateStore } from '../../../stores/useDateStore'
import DevRanking from './components/DevRanking.vue';
import DevRankingByGroup from './components/DevRankingByGroup.vue'
import DevOfMobile from './components/DevOfMobile.vue'

const dateStore = useDateStore()
</script>
