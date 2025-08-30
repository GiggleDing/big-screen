import request from "@/utils/request"

export function getRevenueOfProvinceByMonth(yearId, areaCode, options = {}) {
    const { profession, business } = options
    return request.get('/getRevenueOfProvinceByMonth', {
        params: {
            yearId,
            areaCode,
            ...(profession ? { profession } : {}),
            ...(business ? { business } : {})
        }
    })
}

export function getRevenueOfProvinceAnalysis(monthId, yearId, areaCode) {
    return request.get('/getRevenueOfProvinceAnalysis', {
        params: { monthId, yearId, areaCode }
    })
}

export function getPeriodData(period) {
    return request.get('/period-data', {
        params: { period }
    })
}

export function getAccumulatedRevenue(monthId, areaId, options = {}) {
    const { profession, business } = options
    return request.get('/getAccumulatedRevenue', {
        params: {
            monthId,
            areaId,
            ...(profession? { profession } : {}),
            ...(business ? { business } : {})
        }
    })
}
