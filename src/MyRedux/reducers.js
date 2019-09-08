import { combineReducers } from 'redux';
import AuthReducer from '../views/Pages/Login/AuthReducer'
import AllDashboardReducer from '../views/Dashboard/ZDashboardReducer'
import MasterDataReducer from '../views/DataMasters/MasterDataReducer'
import TransactionReducer from '../views/ProductManagement/TransactionReducer'
import ZReportReducer from '../views/Report/ZReportReducer'

export default combineReducers({
   AuthReducer,
   AllDashboardReducer,
   MasterDataReducer,
   TransactionReducer,
   ZReportReducer,
})