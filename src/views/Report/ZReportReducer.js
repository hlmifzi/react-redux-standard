const INITIAL_STATE = {
    reportGeneral: {
        count:0,
        dataSource:[]
    }
}

const ZReportReducer = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case "GENERALREPORTTYPE":
            return ({
                reportGeneral: action.payload
            })
        case "EMPTY_DATA_SOURCE":
            return ({
                reportGeneral: {
                    count:0,
                    dataSource:[]
                }
            })
        default:
            return state;
    }
}

export default ZReportReducer