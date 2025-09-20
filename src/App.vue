<template>
    <div class="screen-wrapper">
        <VScaleScreen width="1920" height="1080" :box-style="boxStyle" :wrapper-style="wrapperStyle" fullscreen>
            <div class="dashboard">
                <RouterView />
            </div>
        </VScaleScreen>
    </div>

</template>

<script setup>
import VScaleScreen from 'v-scale-screen'
import { reactive } from 'vue'

const boxStyle = reactive({
    background: "dimgrey"
})

const wrapperStyle = reactive({
    background: "black"
})
</script>

<style scoped>
.screen-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dashboard {
    width: 100%;
    height: 100%;
}
</style>
