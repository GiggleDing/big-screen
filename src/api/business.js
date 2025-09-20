import request from "../utils/request"

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

export function getRevenue(monthId, areaId, options = {}) {
    const { profession } = options
    return request.get('/getRevenue', {
        params: {
            monthId,
            areaId,
            ...areaId(profession? { profession }: {})
        }
    })
}

export function getRevenueOfNetworking(monthId, areaId, options = {}) {
    const { profession } = options
    return request.get('/getRevenueOfNetworking', {
        params: {
            monthId,
            areaId,
            ...(profession? { profession } : {})
        }
    })
}

export function getRevenueOfDigitalIntelligence(monthId, areaId) {
    return request.get('/getRevenueOfDigitalIntelligence', {
        params: { monthId, areaId }
    })
}
