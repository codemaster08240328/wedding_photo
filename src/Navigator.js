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
    weddingpayfour:{
      screen: WeddingPayFour,
      navigationOptions: {
        header: null
      }
    }

},{
    initialRouteName:'Login',
});
export default RootNavigator;
