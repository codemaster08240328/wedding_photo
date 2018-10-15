import React from 'react';
import { ScrollView, StyleSheet, Text, View, WebView, Image, TouchableOpacity, PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import { connect } from 'react-redux';
import actions from '../../redux/order/action';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import okIcon from '../../../assets/ok-icon-animation.gif';


const DEVICE_WIDTH = Dimensions.get('window').width;

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.navigation.getParam("id"),
      user_name:this.props.user.user.cust_fname,
      amt:this.props.navigation.getParam('amt'),
      status:false,
      isOpen: false  
    };
    this.doneBtnHandle = this.doneBtnHandle.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.timer = null
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onMenuItemSelected(item){
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
      this.props.navigation.navigate(item);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  componentDidMount(){
    if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
    {
      return
    }
    this.getInvoiceStatus()
  }

  getInvoiceStatus(){
    this.timer = setTimeout(()=>{
        console.log('called========>');
      this.props.dispatch(actions.getInvoiceStatus(this.state.id));
    },5000);
  }
  
  doneBtnHandle(){
    this.props.dispatch(actions.getInvoice({order_id:this.props.invoice_status.invoice_status.odr_id}))
    this.props.navigation.navigate("OrderList");
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.invoice_status.invoice_status==null)
      return;
    if (nextProps.invoice_status.invoice_status.paysch_paid_status=='1')
    {
      this.setState({status:true});
      return;
    }else{
      this.getInvoiceStatus();
    }
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

  render() {
    const {goBack} = this.props.navigation;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props}/>;

    return (
      <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          menuPosition="right"
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
        <View style={styles.container}>
          <LogoComponent  ></LogoComponent>
          <NavBar  props = {this.props} title="PAYMENT HERE" back_have={!this.state.status?true:false} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
          {!this.state.status&&
            <ScrollView 
              style={styles.webViewContainer}
              contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
              >
              <WebView
                ref={webview => {
                  this.myWebView = webview;
                }}
                scrollEnabled={false}
                style = {{height:2000,width:DEVICE_WIDTH}}
                source={{uri: 'https://payments.weddingphotomenu.com?inv_id=' + this.state.id + '&amount='+this.state.amt+'&return_url=invoicePaidInMobile&description=Payment_For_Invoice_' + this.state.id + '&customer_name=' + this.state.user_name}}
              />
            </ScrollView>
          }
          {this.state.status&&
            <View style = {styles.webViewContainer} >
              <Image
                  style = {{height:200,width:200}}
                  source = {okIcon}
              />
              <Text style = {{fontSize:20}}>Confirm Successful!</Text>
              <TouchableOpacity 
                  onPress={this.doneBtnHandle} 
                  style = {{marginTop:30, backgroundColor:"#EC6C6B",paddingBottom:5,borderRadius:15,paddingLeft:10,paddingRight:10,paddingTop:5}}>
                  <Text style = {{fontSize:10, color:'white'}}>
                      DONE
                  </Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'white',
  },
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"

  },
  webViewContainer: {
    flex: 15
  }
});

function mapStateToProps(state){
	return{
        user:state.authReducer,
        invoice_status:state.invoiceStatus,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps)(Pay);
