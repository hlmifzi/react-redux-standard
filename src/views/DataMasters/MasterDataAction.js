import ROOT_API from '../../MyServices/api/URLApi'

export const LIST = 'LIST'
export const ADD = 'ADD'
export const EDIT = 'EDIT'
export const SUBMITADD = 'SUBMITADD'
export const SUBMITEDIT = 'SUBMITEDIT'
export const SUBMITDELETE = 'SUBMITDELETE'


export const LISTTENANTS = 'LIST-TENANTS'
export const ADDTENANTS = 'ADD-TENANTS'
export const EDITTENANTS = 'EDIT-TENANTS'
export const SUBMITADDTENANTS = 'SUBMITADD-TENANTS'
export const SUBMITEDITTENANTS = 'SUBMITEDIT-TENANTS'
export const SUBMITDELETETENANTS = 'SUBMITDELETE-TENANTS'


export const GetListAll = (param) => {
    return async dispatch => {

        const getData = await ROOT_API.get(param)

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        console.log(datas.data);
        
        
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.key,
                No: no,
                Role: v.role.role,
                Tenant: v.place.name,
                username: v.username,
            })
            no += 1
            return res
        })

        if (getData.data.meta.status === 200) {
            return dispatch({
                type: LIST,
                payload: res
            })
        }
    }
}


export const AddAll = payload => {
    return async dispatch => {
        return dispatch({
            type: ADD
        })
    }
}


export const SubmitAdd = payload => {
    return async dispatch => {
        const insert = await ROOT_API.post('user', payload)

        const getData = await ROOT_API.get('user')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.key,
                No: no,
                Role: v.role.role,
                Tenant: v.place.name,
                username: v.username,
            })
            no += 1
            return res
        })

        return dispatch({
            type: SUBMITADD,
            payload: insert.data.data,
            status: insert.data.meta.status
        })
    }
}


export const EditAll = payload => {
    return async dispatch => {
        return dispatch({
            type: EDIT,
            data: payload
        })
    }
}

export const SubmitEdit = payload => {
    return async dispatch => {
        const insert = await ROOT_API.put('user', payload)

        const getData = await ROOT_API.get('user')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.key,
                No: no,
                Role: v.place.name,
                Tenant: v.role.role,
                username: v.username,
            })
            no += 1

            return res
        })

        return dispatch({
            type: SUBMITEDIT,
            payload: insert.data.data,
            status: insert.data.meta.status
        })
    }
}


export const SubmitDelete = payload => {
    return async dispatch => {
        const insert = await ROOT_API.delete('user',{ data:payload })
        const getData = await ROOT_API.get('user')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.key,
                No: no,
                Role: v.place.name,
                Tenant: v.role.role,
                username: v.username,
            })
            no += 1

            return res
        })
        
        return dispatch({
            type: SUBMITDELETE,
            payload: res,
            status: insert.data.meta.status
        })
    }
}



export const GetListAllTenants = () => {
    return async dispatch => {

        const getData = await ROOT_API.get('place')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.place_id,
                No: no,
                TenantCode: v.code,
                TenantName: v.name
            })
            no += 1
            return res
        })

        if (getData.data.meta.status === 200) {
            return dispatch({
                type: LISTTENANTS,
                payload: res
            })
        }
    }
}


export const AddAllTenants = payload => {
    return async dispatch => {
        return dispatch({
            type: ADDTENANTS
        })
    }
}


export const SubmitAddTenants = payload => {
    return async dispatch => {
        const insert = await ROOT_API.post('place', payload)

        const getData = await ROOT_API.get('place')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.place_id,
                No: no,
                TenantCode: v.code,
                TenantName: v.name
            })
            no += 1
            return res
        })

        return dispatch({
            type: SUBMITADDTENANTS,
            payload: insert.data.data,
            status: insert.data.meta.status
        })
    }
}


export const EditAllTenants = payload => {
    return async dispatch => {
        return dispatch({
            type: EDITTENANTS,
            data: payload
        })
    }
}

export const SubmitEditTenants = payload => {
    return async dispatch => {
        const insert = await ROOT_API.put('place', payload)

        const getData = await ROOT_API.get('place')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.place_id,
                No: no,
                TenantCode: v.code,
                TenantName: v.name
            })
            no += 1

            return res
        })

        return dispatch({
            type: SUBMITEDITTENANTS,
            payload: res,
            status: insert.data.meta.status
        })
    }
}


export const SubmitDeleteTenants = payload => {
    return async dispatch => {

        const insert = await ROOT_API.delete('place',{ data:payload })
        const getData = await ROOT_API.get('place')

        let datas = getData.data

        let res = {}
        res['count'] = datas.count
        res['dataSource'] = []
        let no = 1
        datas.data.map((v) => {
            res['dataSource'].push({
                key: v.place_id,
                No: no,
                TenantCode: v.code,
                TenantName: v.name
            })
            no += 1

            return res
        })

        return dispatch({
            type: SUBMITDELETETENANTS,
            payload: res,
            status: insert.data.meta.status
        })
    }
}
