import request from "@/utils/request"

export function getRevenueOfProvinceByMonth(yearId, areaCode) {
    return request.get('/getRevenueOfProvinceByMonth', {
        params: { yearId, areaCode }
    })
}

export function getRevenueOfProvinceAnalysis(monthId, yearId, areaCode) {
    return request.get('/getRevenueOfProvinceAnalysis', {
        params: { monthId, yearId, areaCode }
    })
}