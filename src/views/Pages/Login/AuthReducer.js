const INITIAL_STATE = {
    Auth: false,
    username: '',
    role: '',
    place_id:''
}

const AuthReducer = (state = { ...INITIAL_STATE }, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return ({
                ...state,
                Auth: true
            })
        case "SIGN_OUT":
            return ({
                ...state,
                Auth: false
            })

        default:
            return state;
    }
}

export default AuthReducer