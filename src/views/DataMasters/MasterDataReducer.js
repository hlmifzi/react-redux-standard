const INITIAL_STATE = {
    Users: {
        Action: "",
        icon: 'fa fa-users',
        modul: 'Users',
        dataSource: [],
        count: 0
    },
    Tenants: {
        Action: "",
        icon: 'nav-icon icon-screen-desktop',
        modul: 'Tenants Management',
        dataSource: [],
        count: 0
    },

}

const MasterDataReducer = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case "LIST":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    dataSource: action.payload.dataSource,
                    count: action.payload.count
                }
            })
        case "ADD":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    Action: "ADD"
                }
            })
        case "SUBMITADD":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    dataSource: action.payload.dataSource,
                    count: state.Users.count + 1,
                    Action: "ADD"
                }
            })
        case "EDIT":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    Action: "EDIT"
                }
            })
        case "SUBMITEDIT":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    dataSource: action.payload.dataSource,
                    Action: "EDIT"
                }
            })
        case "SUBMITDELETE":
            return ({
                ...state,
                Users: {
                    ...state.Users,
                    dataSource: action.payload.dataSource,
                    count: state.Users.count - 1,
                }
            })


        case "LIST-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    dataSource: action.payload.dataSource,
                    count: action.payload.count
                }
            })
        case "ADD-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    Action: "ADD"
                }
            })
        case "SUBMITADD-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    dataSource: action.payload.dataSource,
                    count: state.Tenants.count + 1,
                    Action: "ADD"
                }
            })
        case "EDIT-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    Action: "EDIT"
                }
            })
        case "SUBMITEDIT-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    dataSource: action.payload.dataSource,
                    Action: "EDIT"
                }
            })
        case "SUBMITDELETE-TENANTS":
            return ({
                ...state,
                Tenants: {
                    ...state.Tenants,
                    dataSource: action.payload.dataSource,
                }
            })
        default:
            return state;
    }
}

export default MasterDataReducer