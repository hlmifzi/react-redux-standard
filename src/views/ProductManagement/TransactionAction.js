import ROOT_API from '../../MyServices/api/URLApi'

export const PRODUCTSLIST = 'PRODUCTSLIST'
export const PRODUCTSSELECTLIST = 'PRODUCTSSELECTLIST'
export const PRODUCTSADD = 'PRODUCTSADD'
export const PRODUCTSEDIT = 'PRODUCTSEDIT'
export const PRODUCTSSUBMITADD = 'PRODUCTSSUBMITADD'
export const PRODUCTSSUBMITEDIT = 'PRODUCTSSUBMITEDIT'
export const PRODUCTSSUBMITDELETE = 'PRODUCTSSUBMITDELETE'

export const ENTRYADD = 'ENTRYADD'
export const DEPRECIATIONADD = 'DEPRECIATIONADD'
export const RETURADD = 'RETURADD'
export const SELLINGADD = 'SELLINGADD'

export const ProductGetList = () => {
    return async dispatch => {
        const getData = await ROOT_API.get('barang')

        let datas = getData.data
        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.key, 
                No: no,
                Article: v.artikel,
                product_name: v.product_name,
                size: v.size,
                color: v.warna,
                Tenant: v.tenant,
                normal_stock: v.normal_stok,
                ob_stock: v.ob_stok,
                normal_price: v.normal_price,
                ob_price: v.ob_price,
            })
            no += 1
            return res
        })
        
        return dispatch({
            type: PRODUCTSLIST,
            payload: res
        })
    }
}

export const ProductSelectGetList = () => {
    return async dispatch => {
        const getData = await ROOT_API.get('barang/lselect')

        let datas = getData.data
        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.barang_type_id, 
                No: no,
                type: v.type,
                Article: v.artikel,
                product_name: v.nama_barang,
                size: v.size,
                color: v.warna,
            })
            no += 1
            return res
        })
        
        return dispatch({
            type: PRODUCTSSELECTLIST,
            payload: res
        })
    }
}

export const ProductAdd = payload => {
    return async dispatch => {
        return dispatch({
            type: PRODUCTSADD
        })
    }
}

export const ProductSubmitAdd = payload => {
    return async dispatch => {
        const insert = await ROOT_API.post('barang', payload)

        const getData = await ROOT_API.get('barang')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.barang_id,
                No: no,
                Article: v.artikel,
                product_name: v.product_name,
                size: v.size,
                color: v.warna,
                Tenant: v.tenant,
                normal_stock: v.normal_stok,
                ob_stock: v.ob_stok,
                normal_price: v.normal_price,
                ob_price: v.ob_price,
            })
            no += 1
            return res
        })

        return dispatch({
            type: PRODUCTSSUBMITADD,
            payload: insert.data.data,
            status: insert.data.meta.status
        })
    }
}

export const ProductEdit = payload => {
    return async dispatch => {
        return dispatch({
            type: PRODUCTSEDIT,
            data: payload
        })
    }
}

export const ProductSubmitEdit = payload => {
    return async dispatch => {
        const insert = await ROOT_API.put('barang', payload)

        const getData = await ROOT_API.get('barang')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.barang_id,
                No: no,
                Article: v.artikel,
                product_name: v.product_name,
                size: v.size,
                color: v.warna,
                Tenant: v.tenant,
                normal_stock: v.normal_stok,
                ob_stock: v.ob_stok,
                normal_price: v.normal_price,
                ob_price: v.ob_price,
            })
            no += 1

            return res
        })

        return dispatch({
            type: PRODUCTSSUBMITEDIT,
            payload: insert.data.data,
            status: insert.data.meta.status
        })
    }
}

export const ProductSubmitDelete = payload => {
    return async dispatch => {
        const insert = await ROOT_API.delete('barang', { data: payload })
        const getData = await ROOT_API.get('barang')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.barang_id,
                No: no,
                Article: v.artikel,
                product_name: v.product_name,
                size: v.size,
                color: v.warna,
                Tenant: v.tenant,
                normal_stock: v.normal_stok,
                ob_stock: v.ob_stok,
                normal_price: v.normal_price,
                ob_price: v.ob_price,
            })
            no += 1

            return res
        })

        return dispatch({
            type: PRODUCTSSUBMITDELETE,
            payload: res,
            status: insert.data.meta.status
        })
    }
}


export const EntryAddAction = payload => {
    return async dispatch => {
        const PostEntry = await ROOT_API.post('transaction/pemasukan', payload)
        return dispatch({
            type: ENTRYADD,
            payload:PostEntry.data.meta
        })
    }
}

export const DepreciationAddAction = payload => {
    return async dispatch => {
        const PostEntry = await ROOT_API.post('transaction/penyusutan', payload)
        return dispatch({
            type: DEPRECIATIONADD,
            payload:PostEntry.data.meta
        })
    }
}

export const ReturAddAction = payload => {
    return async dispatch => {
        const PostEntry = await ROOT_API.post('transaction/retur', payload)
        return dispatch({
            type: RETURADD,
            payload:PostEntry.data.meta
        })
    }
}

//task cholis buat belajar
export const SellingAddAction = payload => {
    return async dispatch => {
        const PostEntry = await ROOT_API.post('transaction/penjualan', payload)
        return dispatch({
            type: SELLINGADD,
            payload:PostEntry.data.meta
        })
    }
}


