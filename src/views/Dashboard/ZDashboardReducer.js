const INITIAL_STATE = {
    DashboardDatamaster: {
        user: null,
        place: "",
    },
    DashboardProduct: {
        barang: null,
        stok_br: "",
        stok_br_normal: "",
        stok_br_ob: "",
    },
    DashboardSelling: {
        penj_yday: null,
        penj_cday: "",
        penj_cmonth: "",
        penj_emonth:[]
    },
}

const ZDashboardReducer = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case "DASHBOARDDATAMASTERTYPE":
            return ({
                ...state,
                DashboardDatamaster: action.payload
            })
        case "DASHBOARDPRODUCTTYPE":
            return ({
                ...state,
                DashboardProduct: action.payload
            })
        case "DASHBOARDSELLINGTYPE":
            return ({
                ...state,
                DashboardSelling: action.payload
            })
        default:
            return state;
    }
}

export default ZDashboardReducer