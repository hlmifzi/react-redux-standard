const INITIAL_STATE = {
    ManageAllProduct: {
        Action: '',
        icon:'nav-icon icon-layers',
        modul:'Manage All Product',
        dataSource: [],
        count: 0,
    },
    Entry: {
        Action: '',
        icon:'nav-icon icon-action-redo',
        modul:'Entry',
    },
    Depreciation: {
        Action: '',
        icon:'nav-icon icon-arrow-down',
        modul:'Depreciation',
    },
    Retur: {
        Action: '',
        icon:'nav-icon icon-action-undo',
        modul:'Retur',
    },
    Selling: {
        Action: '',
        icon:'nav-icon icon-basket',
        modul:'Selling'
    }
}

const TransactionReducer = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case "PRODUCTSLIST":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    dataSource: action.payload.dataSource,
                    count: action.payload.count
                }
            })
        case "PRODUCTSSELECTLIST":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    dataSource: action.payload.dataSource,
                    count: action.payload.count
                }
            })
        case "PRODUCTSADD":
            return ({
                ...state,
                ManageAllProduct:{
                    ...state.ManageAllProduct,
                    Action: "ADD"
                }
            })
        case "PRODUCTSSUBMITADD":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    dataSource: action.payload.dataSource,
                    count: state.ManageAllProduct.count + 1,
                    Action: "ADD"
                }
            })
        case "PRODUCTSEDIT":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    Action: "EDIT"
                }
            })
        case "PRODUCTSSUBMITEDIT":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    dataSource: action.payload.dataSource,
                    Action: "EDIT"
                }
            })
        case "PRODUCTSSUBMITDELETE":
            return ({
                ...state,
                ManageAllProduct: {
                    ...state.ManageAllProduct,
                    dataSource: action.payload.dataSource,
                }
            })
        default:
            return state;
    }
}

export default TransactionReducer