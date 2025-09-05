<template>
    <div class="container">
        <el-card class="header-card">
            <el-row justify="center"  align="middle">
                <el-col :span="7"></el-col>
                <el-col :span="7" style="text-align: center; font-size: 1.8em; font-weight: bold;">
                    1.2 联网通信主营出账收入
                </el-col>
                <el-col :span="7" style="text-align: right;">
                    <el-space>
                        <el-select v-model="value" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </el-space>
                </el-col>
            </el-row>
        </el-card>
        <el-row class="content-row" :gutter="20">
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
import { ref } from 'vue'
import BranchCompletion from './components/BranchCompletion.vue'
import CompletionRateRanking from './components/CompletionRateRanking.vue'
import YoyRanking from './components/YoyRanking.vue'

const value = ref('')

const options = [
    {
        value: 'networking',
        label: '联网通信'
    },
    {
        value: 'networkingOfPublic',
        label: '公众联网通信'
    },
    {
        value: 'networkingOfEnterprise',
        label: '政企联网通信'
    }
]

const branchData = [
    {
        areaName: '全省',
        monthRevenue: '13106',
        completionRate: '96.4',
        momRate: '1.1',
        yoyRate: '6.2',
        accumulatedRevenue: '91691',
        annualTarget: '163143',
        scheduleCompletion: '96.4',
        accumulatedYoyRate: '4.2',
        monthlyTrend: {
            '202501': '13106',
            '202502': '12106',
            '202503': '12196',
            '202504': '13806',
            '202505': '11186',
            '202506': '14106',
            '202507': '13986',
        },
        category: '-1'
    },
    {
        areaName: '临夏',
        monthRevenue: '2360',
        completionRate: '95.1',
        momRate: '1.3',
        yoyRate: '4.8',
        accumulatedRevenue: '15560',
        annualTarget: '19800',
        scheduleCompletion: '93.6',
        accumulatedYoyRate: '3.9',
        monthlyTrend: {
            '202501': '2200',
            '202502': '1980',
            '202503': '2100',
            '202504': '2400',
            '202505': '2300',
            '202506': '2500',
            '202507': '2360',
        },
        category: '1'
    },
    {
        areaName: '兰州',
        monthRevenue: '4150',
        completionRate: '97.3',
        momRate: '1.6',
        yoyRate: '6.9',
        accumulatedRevenue: '30560',
        annualTarget: '41500',
        scheduleCompletion: '98.2',
        accumulatedYoyRate: '5.2',
        monthlyTrend: {
            '202501': '4000',
            '202502': '3720',
            '202503': '3980',
            '202504': '4200',
            '202505': '4300',
            '202506': '4500',
            '202507': '4150',
        },
        category: '1'
    },
    {
        areaName: '酒泉',
        monthRevenue: '1680',
        completionRate: '94.6',
        momRate: '0.9',
        yoyRate: '3.2',
        accumulatedRevenue: '21820',
        annualTarget: '17200',
        scheduleCompletion: '92.3',
        accumulatedYoyRate: '2.7',
        monthlyTrend: {
            '202501': '1600',
            '202502': '1420',
            '202503': '1500',
            '202504': '1700',
            '202505': '1680',
            '202506': '1760',
            '202507': '1680',
        },
        category: '1'
    },
    {
        areaName: '庆阳',
        monthRevenue: '2890',
        completionRate: '96.0',
        momRate: '1.4',
        yoyRate: '5.0',
        accumulatedRevenue: '20230',
        annualTarget: '28900',
        scheduleCompletion: '95.6',
        accumulatedYoyRate: '3.6',
        monthlyTrend: {
            '202501': '2700',
            '202502': '2500',
            '202503': '2600',
            '202504': '2950',
            '202505': '2800',
            '202506': '3000',
            '202507': '2890',
        },
        category: '1'
    },
    {
        areaName: '天水',
        monthRevenue: '3100',
        completionRate: '97.1',
        momRate: '1.5',
        yoyRate: '5.8',
        accumulatedRevenue: '22150',
        annualTarget: '31000',
        scheduleCompletion: '96.7',
        accumulatedYoyRate: '4.1',
        monthlyTrend: {
            '202501': '2900',
            '202502': '2700',
            '202503': '2850',
            '202504': '3200',
            '202505': '3100',
            '202506': '3300',
            '202507': '3100',
        },
        category: '1'
    },
    {
        areaName: '张掖',
        monthRevenue: '1950',
        completionRate: '95.4',
        momRate: '1.2',
        yoyRate: '4.0',
        accumulatedRevenue: '13780',
        annualTarget: '19500',
        scheduleCompletion: '94.8',
        accumulatedYoyRate: '3.2',
        monthlyTrend: {
            '202501': '1800',
            '202502': '1650',
            '202503': '1750',
            '202504': '2000',
            '202505': '1950',
            '202506': '2050',
            '202507': '1950',
        },
        category: '2'
    },
    {
        areaName: '定西',
        monthRevenue: '2440',
        completionRate: '95.9',
        momRate: '1.3',
        yoyRate: '4.6',
        accumulatedRevenue: '17220',
        annualTarget: '24400',
        scheduleCompletion: '95.3',
        accumulatedYoyRate: '3.7',
        monthlyTrend: {
            '202501': '2300',
            '202502': '2100',
            '202503': '2200',
            '202504': '2500',
            '202505': '2440',
            '202506': '2600',
            '202507': '2440',
        },
        category: '2'
    },
    {
        areaName: '平凉',
        monthRevenue: '2620',
        completionRate: '96.5',
        momRate: '1.2',
        yoyRate: '5.2',
        accumulatedRevenue: '18340',
        annualTarget: '26200',
        scheduleCompletion: '96.0',
        accumulatedYoyRate: '4.0',
        monthlyTrend: {
            '202501': '2500',
            '202502': '2300',
            '202503': '2400',
            '202504': '2700',
            '202505': '2600',
            '202506': '2800',
            '202507': '2620',
        },
        category: '2'
    },
    {
        areaName: '武威',
        monthRevenue: '2120',
        completionRate: '95.7',
        momRate: '1.1',
        yoyRate: '4.3',
        accumulatedRevenue: '14840',
        annualTarget: '21200',
        scheduleCompletion: '95.1',
        accumulatedYoyRate: '3.5',
        monthlyTrend: {
            '202501': '2000',
            '202502': '1850',
            '202503': '1900',
            '202504': '2150',
            '202505': '2100',
            '202506': '2200',
            '202507': '2120',
        },
        category: '2'
    },
    {
        areaName: '陇南',
        monthRevenue: '1860',
        completionRate: '94.8',
        momRate: '1.0',
        yoyRate: '3.6',
        accumulatedRevenue: '12940',
        annualTarget: '18600',
        scheduleCompletion: '94.2',
        accumulatedYoyRate: '2.9',
        monthlyTrend: {
            '202501': '1750',
            '202502': '1600',
            '202503': '1680',
            '202504': '1900',
            '202505': '1860',
            '202506': '2000',
            '202507': '1860',
        },
        category: '2'
    },
    {
        areaName: '白银',
        monthRevenue: '2050',
        completionRate: '95.6',
        momRate: '1.1',
        yoyRate: '4.1',
        accumulatedRevenue: '14360',
        annualTarget: '20500',
        scheduleCompletion: '95.0',
        accumulatedYoyRate: '3.4',
        monthlyTrend: {
            '202501': '1900',
            '202502': '1750',
            '202503': '1850',
            '202504': '2100',
            '202505': '2050',
            '202506': '2200',
            '202507': '2050',
        },
        category: '2'
    },
    {
        areaName: '甘南',
        monthRevenue: '1720',
        completionRate: '94.3',
        momRate: '0.9',
        yoyRate: '3.0',
        accumulatedRevenue: '12040',
        annualTarget: '17200',
        scheduleCompletion: '93.8',
        accumulatedYoyRate: '2.5',
        monthlyTrend: {
            '202501': '1600',
            '202502': '1450',
            '202503': '1550',
            '202504': '1750',
            '202505': '1720',
            '202506': '1800',
            '202507': '1720',
        },
        category: '3'
    },
    {
        areaName: '金昌',
        monthRevenue: '1590',
        completionRate: '94.1',
        momRate: '0.8',
        yoyRate: '2.8',
        accumulatedRevenue: '11130',
        annualTarget: '15900',
        scheduleCompletion: '93.5',
        accumulatedYoyRate: '2.3',
        monthlyTrend: {
            '202501': '1500',
            '202502': '1350',
            '202503': '1450',
            '202504': '1600',
            '202505': '1590',
            '202506': '1700',
            '202507': '1590',
        },
        category: '3'
    },
    {
        areaName: '嘉峪关',
        monthRevenue: '1480',
        completionRate: '93.9',
        momRate: '0.7',
        yoyRate: '2.5',
        accumulatedRevenue: '10360',
        annualTarget: '14800',
        scheduleCompletion: '93.0',
        accumulatedYoyRate: '2.0',
        monthlyTrend: {
            '202501': '1400',
            '202502': '1280',
            '202503': '1350',
            '202504': '1500',
            '202505': '1480',
            '202506': '1600',
            '202507': '1480',
        },
        category: '3'
    }
]

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