<template>
    <dv-border-box12 backgroundColor="#100c2a">
        <el-row style="height: 100%; width: 100%; padding: 10px; box-sizing: border-box;">
            <el-col class="content" :span="4">本月</el-col>
            <el-col :span="1">
                <el-divider direction="vertical" style="height: 100%;" />
            </el-col>
            <el-col :span="19">
                <el-row style="height: 50%;">
                    <el-col class="content" :span="11">当月完成（万）：16070</el-col>
                    <el-col class="content" :span="2">
                        <el-divider direction="vertical" style="height: 60%;" />
                    </el-col>
                    <el-col class="content" :span="11">当月同比（%）：-3</el-col>
                </el-row>
                <el-row style="height: 50%;">
                    <el-col class="content" :span="11">当月完成率（%）：101</el-col>
                    <el-col class="content" :span="2">
                        <el-divider direction="vertical" style="height: 60%;" />
                    </el-col>
                    <el-col class="content" :span="11">当月收入缺口（万）：-202</el-col>
                </el-row>
            </el-col>
        </el-row>
    </dv-border-box12>
</template>

<style scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>