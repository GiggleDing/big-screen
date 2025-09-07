<script setup lang="ts">
import { computed } from 'vue'
import MyStatistic from '@/components/MyStatistic.vue'

const props = defineProps({
    data: {
      type: Array,
      required: true
    }
})

// 取出全省数据
const provinceData = computed(() => {
  	return props.data.find((item: any) => item.areaName === '甘肃省') || {}
})

// 计算 footer 项
const monthFooter = computed(() => {
	if (!provinceData.value.annualTarget) return []
	const annualTarget = Number(provinceData.value.annualTarget)
	const monthRevenue = Number(provinceData.value.monthRevenue)
	const yoyRate = provinceData.value.yoyRate + '%'
	const completionRate = (Number(provinceData.value.completionRate) - 100).toFixed(1) + '%'
	const gap = (annualTarget / 12 - monthRevenue).toFixed(0)

	return [
		{ label: '同比', value: yoyRate },
		{ label: '完成率', value: completionRate },
		{ label: '收入缺口', value: gap }
	]
})

const accumulatedFooter = computed(() => {
	if (!provinceData.value.annualTarget) return []
	const annualTarget = Number(provinceData.value.annualTarget)
	const accumulatedRevenue = Number(provinceData.value.accumulatedRevenue)
	const accumulatedYoyRate = provinceData.value.accumulatedYoyRate + '%'
	const scheduleCompletion = provinceData.value.scheduleCompletion + '%'
	const gap = (annualTarget / 12 * 7 - accumulatedRevenue).toFixed(0)

	return [
		{ label: '同比', value: accumulatedYoyRate },
		{ label: '序时完成率', value: scheduleCompletion },
		{ label: '累计收入缺口', value: gap }
	]
})
</script>

<template>
	<el-row :gutter="20">
		<el-col :span="12">
			<MyStatistic
				title="当月"
				:value="Number(provinceData.monthRevenue)"
				tooltip="当月出账收入"
				:footer-items="monthFooter"
				v-loading="provinceData.length === 0"
			/>
		</el-col>
		<el-col :span="12">
			<MyStatistic
				title="累计"
				:value="Number(provinceData.accumulatedRevenue)"
				tooltip="本年累计出账收入"
				:footer-items="accumulatedFooter"
				v-loading="provinceData.length === 0"
			/>
		</el-col>
	</el-row>
</template>
