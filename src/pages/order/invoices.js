'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  FlatList
} from 'react-native';
import InvoiceItem from './component/InvoiceItem';
import { connect } from 'react-redux';
import actions from '../../redux/order/action';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';

class Invoices extends Component {
  constructor(props) {
      super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        isloading:false,
        ord_id:this.props.navigation.getParam("order_id"),
        user_name:this.props.navigation.getParam("package"),
        dataSource: this.ds.cloneWithRows([]),
        isOpen: false,
        data:[],
        refresh:true     
      };
      this.toggleSideMenu = this.toggleSideMenu.bind(this)
      this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
      this.go_back = this.go_back.bind(this)
  }

  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  go_back(){
      this.setState({
        refresh:!this.state.refresh
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

  componentWillReceiveProps(nextProps){
    
    if(nextProps.invoice.loading==false)
        this.setState({isloading:false});
    if(nextProps.invoice.getsuccess==true);
        this.setState({dataSource:this.ds.cloneWithRows(nextProps.invoice.invoice), data:nextProps.invoice.invoice, refresh:!this.state.refresh})

  }

  componentDidMount() {
      if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
      {
        return
      }
      this.setState({isloading:true})
      this.props.dispatch(actions.getInvoice({order_id:this.state.ord_id}));
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
        <View style = {styles.container}>
          <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <LogoComponent ></LogoComponent>
          <NavBar  props = {this.props} title="PAYMENT HISTORY" back_have={true} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
          <View style = {styles.body}>
              <FlatList
                data = {this.props.invoice.invoice}
                extraData={this.state}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => <InvoiceItem key = {index} {...this.props} data = {item} go_back = {this.go_back}/>}
              />
          </View>
        </View>
      </SideMenu>
    );
  }
}
const styles = StyleSheet.create({
  body:{
    flex:9,
    paddingLeft:10,
    paddingRight:10,
  },
  container:{
    flex: 3,
    alignItems: 'center',
    backgroundColor:'white',
  },
});
function mapStateToProps(state){
	return{
    invoice:state.invoiceReducer,
    netinfo:state.netInfo
	}
}
export default connect(mapStateToProps)(Invoices);