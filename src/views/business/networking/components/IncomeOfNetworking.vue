<template>
	<el-row v-if="loaded" style="height: 100%;">
		<el-col :span="12" style="height: 100%;">
			<dv-border-box12 backgroundColor="#100c2a">
				<el-row style="height: 100%; width: 100%; padding: 10px; box-sizing: border-box;">
					<el-col class="content" :span="4">本月</el-col>
					<el-col :span="1">
						<el-divider direction="vertical" style="height: 100%;" />
					</el-col>
					<el-col :span="19">
						<el-row style="height: 50%;">
							<el-col class="content" :span="11">当月完成（万）：{{ data.monthRevenue }}</el-col>
							<el-col class="content" :span="2">
								<el-divider direction="vertical" style="height: 60%;" />
							</el-col>
							<el-col class="content" :span="11">当月同比（%）：{{ data.yoyRate }}</el-col>
						</el-row>
						<el-row style="height: 50%;">
							<el-col class="content" :span="11">当月完成率（%）：{{ data.completionRate }}</el-col>
							<el-col class="content" :span="2">
								<el-divider direction="vertical" style="height: 60%;" />
							</el-col>
							<el-col class="content" :span="11">当月收入缺口（万）：{{ (data.annualTarget / 12 - data.monthRevenue).toFixed(2) }}</el-col>
						</el-row>
					</el-col>
				</el-row>
			</dv-border-box12>
		</el-col>
		<el-col :span="12" style="height: 100%;">
			<dv-border-box12 backgroundColor="#100c2a">
				<el-row style="height: 100%; width: 100%; padding: 10px; box-sizing: border-box;">
					<el-col class="content" :span="4">累计</el-col>
					<el-col :span="1">
						<el-divider direction="vertical" style="height: 100%;" />
					</el-col>
					<el-col :span="19">
						<el-row style="height: 50%;">
							<el-col class="content" :span="11">累计完成（万）：{{ data.accumulatedRevenue }}</el-col>
							<el-col class="content" :span="2">
								<el-divider direction="vertical" style="height: 60%;" />
							</el-col>
							<el-col class="content" :span="11">累计同比（%）：{{ data.accumulatedYoyRate }}</el-col>
						</el-row>
						<el-row style="height: 50%;">
							<el-col class="content" :span="11">累计完成率（%）：{{ data.scheduleCompletion }}</el-col>
							<el-col class="content" :span="2">
								<el-divider direction="vertical" style="height: 60%;" />
							</el-col>
							<el-col class="content" :span="11">年度目标（万）：{{ data.annualTarget }}</el-col>
						</el-row>
					</el-col>
				</el-row>
			</dv-border-box12>
		</el-col>
	</el-row>
	<el-row v-else style="height: 100%;">
		<el-col :span="12" style="height: 100%;">
			<dv-border-box12 backgroundColor="#100c2a">
				<div style="height: 100%; display: flex; align-items: center; justify-content: center;"><a-spin :size="32"></a-spin></div>
			</dv-border-box12>
		</el-col>
		<el-col :span="12" style="height: 100%;">
			<dv-border-box12 backgroundColor="#100c2a">
				<div style="height: 100%; display: flex; align-items: center; justify-content: center;"><a-spin :size="32"></a-spin></div>
			</dv-border-box12>
		</el-col>
	</el-row>
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

const loaded = ref(false)

const data = ref({})

const fetchData = async () => {
	try {
		const dateParam = dateStore.month

		let res
		if (props.profession === 'networking') {
			res = await getRevenueOfNetworking(dateParam, 'root')
		} else if (props.profession === 'networkingOfPublic') {
			res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'public' })
		} else if (props.profession === 'networkingOfEnterprise') {
			res = await getRevenueOfNetworking(dateParam, 'root', { profession: 'enterprise' })
		}

		if (res.data) {
			data.value = res.data.find(item => item.areaName === '甘肃省') || {}
			loaded.value = true
		}
	} catch (e) {
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

<style scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
