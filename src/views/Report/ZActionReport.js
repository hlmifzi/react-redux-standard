import ROOT_API from '../../MyServices/api/URLApi'

export const GENERALREPORTTYPE = 'GENERALREPORTTYPE'
export const EMPTY_DATA_SOURCE = 'EMPTY_DATA_SOURCE'


export const EmptyDataSourceAction = () => {
    return async dispatch => {
        return dispatch({
            type: EMPTY_DATA_SOURCE
        })
    }
}


export const GetReportr = (payload,url) => {
    return async dispatch => {
       
        const getData = await ROOT_API.get(url,payload)

        let datas = getData.data
        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {

            res['dataSource'].push({
                key: v.key,
                No: no,
                artikel: v.artikel,
                nama_barang: v.nama_barang,
                type: v.type,
                place_from: v.place_from,
                place_to: v.place_to,
                jumlah: v.jumlah,
            })
            no += 1
            return res
        })
        
        return dispatch({
            type: GENERALREPORTTYPE,
            payload: res
        })
    }
}


export const GetReporPenyusutan = (payload,url) => {
    return async dispatch => {
       
        const getData = await ROOT_API.get(url,payload)

        let datas = getData.data
        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {

            res['dataSource'].push({
                key: v.key,
                No: no,
                artikel: v.artikel,
                nama_barang: v.nama_barang,
                type: v.type,
                place_from: v.place_from,
                jumlah: v.jumlah,
            })
            no += 1
            return res
        })
        
        return dispatch({
            type: GENERALREPORTTYPE,
            payload: res
        })
    }
}


export const GetReporRetur= (payload,url) => {
    return async dispatch => {
       
        const getData = await ROOT_API.get(url,payload)

        let datas = getData.data
        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {

            res['dataSource'].push({
                key: v.key,
                No: no,
                artikel: v.artikel,
                nama_barang: v.nama_barang,
                type: v.type,
                place_from: v.place_from,
                jumlah: v.jumlah,
            })
            no += 1
            return res
        })
        
        return dispatch({
            type: GENERALREPORTTYPE,
            payload: res
        })
    }
}

