import { authReducer, changePwdReducer } from "./auth/reducer"
import { netInfo } from './netinfo/reducer'
import { orderReducer, invoiceReducer, invoiceStatus, orderDetailsReducer } from './order/reducer'
import { wpworksheet, epworksheet, wvworksheet  } from './worksheet/reducer'
import { proposalReducer, proposalDetails, invoicestatus, propChange } from './proposal/reducer'
import { blogReducer } from './blog/reducer'
import { dashReducer } from './dashboard/reducer'

export {
  authReducer,
  changePwdReducer, 
  netInfo, 
  orderReducer, 
  invoiceReducer, 
  invoiceStatus, 
  wpworksheet, 
  wvworksheet, 
  epworksheet, 
  proposalReducer, 
  proposalDetails, 
  invoicestatus, 
  propChange, 
  blogReducer, 
  orderDetailsReducer, 
  dashReducer
}
