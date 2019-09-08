import ROOT_API from '../../MyServices/api/URLApi'

export const DASHBOARDDATAMASTERTYPE = 'DASHBOARDDATAMASTERTYPE'
export const DASHBOARDPRODUCTTYPE = 'DASHBOARDPRODUCTTYPE'
export const DASHBOARDSELLINGTYPE = 'DASHBOARDSELLINGTYPE'


export const GetDashboardDataMaster = () => {
    return async dispatch => {
        const getData = await ROOT_API.get('dashboard/data_master')
        return dispatch({
            type: DASHBOARDDATAMASTERTYPE,
            payload: getData.data.data
        })
    }

}

export const GetDashboardProduct = () => {
    return async dispatch => {
        const getData = await ROOT_API.get('dashboard/barang')
        return dispatch({
            type: DASHBOARDPRODUCTTYPE,
            payload: getData.data.data
        })
    }
}


export const GetDashboardSelling = () => {
    return async dispatch => {
        const getData = await ROOT_API.get('dashboard/penjualan')
        return dispatch({
            type: DASHBOARDSELLINGTYPE,
            payload: getData.data.data
        })
    }
}
