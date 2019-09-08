import ROOT_API from '../../../MyServices/api/URLApi'
import cookie from 'react-cookies'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'


export const SignInAction = (payload) => {
	return async dispatch => {
		let res = await ROOT_API.post('/auth/login', payload)
		let data = res.data.data
		cookie.save('JWT', data.token, { path: '/' })
		cookie.save('username', data.data.username, { path: '/' })
		cookie.save('role', data.data.role.role, { path: '/' })
		cookie.save('place_id', data.data.place.place_id, { path: '/' })
		cookie.save('id', data.data.key, { path: '/' })

		return dispatch({
			type: SIGN_IN,
			Auth: true
		})
	}
}


export const SignOuthAction = () => {
	return async dispatch => {
		return dispatch({
			type: SIGN_OUT,
		})
	}
}



// export const SignOutAction = () = async dispatch =>{
//     try {
//         const SignOut = await ROOT_API.get('/auth/logout')
//     } catch (error) {

//     }
// }