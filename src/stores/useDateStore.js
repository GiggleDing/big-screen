import { defineStore } from "pinia"
import { ref } from "vue"
import dayjs from 'dayjs'

export const useDateStore = defineStore('data', () => {
    const defaultMonth = dayjs().subtract(1, 'month').format('YYYYMM')
    
    const month = ref(defaultMonth)
    return { month }
})
