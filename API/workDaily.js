import Http from '../common/http'
/**
 * 工作日报列表查询
 * @param {*} data
 * @returns
 */
export const getSysWeekdayReportPage=(data)=>{
   return Http({
        method:'get',
        url:'/oareport/weekdayreport/getSysWeekdayReportPage',
        data
    })
}
/**
 * 物料名称查询
 * @param {*} data
 * @returns
 */
export const getSysProductionTypeTree = (data) =>{
    return Http({
        url:"/oabasic/production/getSysProductionTypeTree",
        data,
        method:"get"
    })
}
/**
 * 产品名称查询
 * @param {*} data
 * @returns
 */
export const getSysProductionName = (data) =>{
    return Http({
        url:"/oabasic/production/getSysProductionName",
        data,
        method:"get"
    })
}

/**
 * 添加
 * @param {*} data
 * @returns
 */
export const saveSysWeekdayReport = (data) =>{
    return Http({
        url:"/oareport/weekdayreport/saveSysWeekdayReport",
        data,
        method:"post"
    })
}