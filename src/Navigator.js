import { createStackNavigator } from 'react-navigation';
import Proposals from './pages/proposal';
import Orders from './pages/order';
import OrderDetail from './pages/order/orderDetails';
import Pay from './pages/order/pay';
import Invoices from './pages/order/invoices'; 
import ProposalReview from './pages/proposal/proposalReview';
import ProposalWebView from './pages/proposal/proposalWebView';
import Login from './pages/auth/login';
import PasswordReset from './pages/auth/forgetpwd';
import WPWorkSheet from './pages/worksheet/wpworksheet'
import EPWorkSheet from './pages/worksheet/epworksheet'
import WVWorkSheet from './pages/worksheet/wvworksheet'
import ProposalChange from './pages/proposal/proposalChange';
import BlogPage from './pages/blog';
import ChangePassword from './pages/auth/changepwd';
import BlogDetailPage from './pages/blog/detail';
import DashBoard from './pages/dashboard';
import Engagement from './pages/dashboard/Engagement';
import WeddingWorksheet from './pages/dashboard/WeddingWorksheet';
import EngagementWorksheet from './pages/dashboard/EngagementWorksheet';
import WeddingPay  from './pages/dashboard/weddingpay';
import WeddingPaySec from './pages/dashboard/weddingpay/WeddingPaySec';
import WeddingPayThir from './pages/dashboard/weddingpay/WeddingPayThir';
import WeddingPayFour from './pages/dashboard/weddingpay/WeddingPayFour';
import WeddingPayConfirm from './pages/dashboard/weddingpay/WeddingPayConfirm';
import Notification from './pages/dashboard/Notification';
import Search from './pages/dashboard/Search';
import CalendarView from './pages/dashboard/CalendarView';
import Payment from './pages/history/Payment';
import Contract from './pages/contract'
import ContractDetail from './pages/contract/detail'
import profile from './pages/profile';
import WeddingPayConfirmOne from './pages/dashboard/weddingpay/WeddingPayConfirmOne';
import WeddingPayConfirmSec from './pages/dashboard/weddingpay/WeddingPayConfirmSec';
import WeddingPayFormFinal from './pages/dashboard/weddingpay/WeddingPayFormFinal';
import WeddingPayConfirmFinal from './pages/dashboard/weddingpay/WeddingPayConfirmFinal';
import EngageInfo from './pages/dashboard/engagementpay/EngageInfo';
import ConfImageUpload from './pages/dashboard/engagementpay/ConfImageUpload';
import ConfirmInfo from './pages/dashboard/engagementpay/ConfirmInfo';

const RootNavigator = createStackNavigator({
	ProposalList: {
        screen: Proposals,
        navigationOptions: {
            header: null,
        }
    },
    review:{
      screen:ProposalReview,
      navigationOptions:{
        header:null
      }
    },
    webView:{
      screen:ProposalWebView,
      navigationOptions:{
        header:null
      }
    },
    Login:{
      screen:Login,
      navigationOptions:{
        header:null
      }
    },
    PasswordReset:{
      screen:PasswordReset,
      navigationOptions:{
        header:null
      }
    },
    ChangePassword:{
      screen:ChangePassword,
      navigationOptions:{
        header:null
      }
    },
    OrderList: {
      screen: Orders,
      navigationOptions: {
        header: null,
      }
    },
    OrderDetail:{
      screen:OrderDetail,
      navigationOptions:{
        header:null
      }
    },
    invoice:{
      screen:Invoices,
      navigationOptions:{
        header:null
      }
    },
    pay:{
      screen:Pay,
      navigationOptions:{
        header:null
      }
    },
    proposalchange:{
      screen:ProposalChange,
      navigationOptions: {
        header: null,
      }
    },
    WPWorkSheet:{
      screen:WPWorkSheet,
      navigationOptions: {
        header: null,
      }
    },
    EPWorkSheet:{
      screen:EPWorkSheet,
      navigationOptions: {
        header: null,
      }
    },
    WVWorkSheet:{
      screen:WVWorkSheet,
      navigationOptions: {
        header: null,
      }
    },
    blog:{
      screen:BlogPage,
      navigationOptions: {
        header: null,
      }
    },
    blogdetail:{
      screen:BlogDetailPage,
      navigationOptions:{
        header:null
      }
    },
    dashboard: {
      screen: DashBoard,
      navigationOptions: {
        header: null
      }
    }, 
    engagement: {
      screen: Engagement,
      navigationOptions: {
        header: null
      }
    },
    weddingworksheet: {
      screen: WeddingWorksheet,
      navigationOptions: {
        header: null
      }
    },
    engagementworksheet: {
      screen: EngagementWorksheet,
      navigationOptions: {
        header: null
      }
    },
    weddingpay: {
      screen: WeddingPay,
      navigationOptions: {
        header: null
      }
    },
    weddingpaysec: {
      screen: WeddingPaySec,
      navigationOptions: {
        header: null
      }
    },
    weddingpaythir: {
      screen: WeddingPayThir,
      navigationOptions: {
        header: null
      }
    },
    weddingpayfour: {
      screen: WeddingPayFour,
      navigationOptions: {
        header: null
      }
    },
    weddingpayconfirm: {
      screen: WeddingPayConfirm,
      navigationOptions: {
        header: null
      }
    },
    weddingpayconfirmfinal: {
      screen: WeddingPayConfirmFinal,
      navigationOptions: {
        header: null
      }
    },
    weddingpayconfirmone: {
      screen: WeddingPayConfirmOne,
      navigationOptions: {
        header: null
      }
    },
    weddingpayconfirmsec: {
      screen: WeddingPayConfirmSec,
      navigationOptions: {
        header: null
      }
    },
    weddingpayformfinal: {
      screen: WeddingPayFormFinal,
      navigationOptions: {
        header: null
      }
    },
    notification: {
      screen: Notification,
      navigationOptions: {
        header: null
      }
    },
    search: {
      screen: Search,
      navigationOptions: {
        header: null
      }
    },
    calendar: {
      screen: CalendarView,
      navigationOptions: {
        header: null
      }
    },
    payment: {
      screen: Payment,
      navigationOptions: {
        header: null
      }
    },
    contract: {
      screen: Contract, 
      navigationOptions: {
        header: null
      }
    },
    detail: {
      screen: ContractDetail,
      navigationOptions: {
        header: null
      }
    },
    profile: {
      screen: profile,
      navigationOptions: {
        header: null
      }
    },
    engagementPay: {
      screen: EngageInfo,
      navigationOptions: {
        header: null
      }
    },
    imgUpload: {
      screen: ConfImageUpload,
      navigationOptions: {
        header: null
      }
    },
    engInfoConfirm: {
      screen: ConfirmInfo,
      navigationOptions: {
        header: null
      }
    }

},{
    initialRouteName:'Login',
});
export default RootNavigator;
