import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import Spinner from 'react-native-loading-spinner-overlay';
import actions from '../../redux/order/action';
import Error from '../../components/Error';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import OrderItem from './component/OrderItem';
import { MenuProvider } from 'react-native-popup-menu';


class Orders extends Component {
    
    constructor(props){
      super(props);
      this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state={
        isloading:false,
        list: this.ds.cloneWithRows([]),
        isOpen: false
      }  
      this.toggleSideMenu = this.toggleSideMenu.bind(this)
      this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
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
      this.setState({isloading:true})
      this.props.getOrder({cust_id:this.props.user.cust_id});
    }

    componentWillReceiveProps(nextProps) {
      
      if(nextProps.order.loading==false)
        this.setState({isloading:false});
      
    }
    render() {
      const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
      return (
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          menuPosition="right"
          onChange={isOpen => this.updateMenuState(isOpen)}
          
        >
            <MenuProvider>
                <View style = {styles.container}>
                    <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    <LogoComponent ></LogoComponent>
                    <NavBar  props = {this.props} title="ORDERS" back_have={false} handlePress={this.toggleSideMenu}></NavBar>
                    <View style = {styles.body}>
                    {(this.props.order.getsuccess==false)&&<View style = {{height:65}}><Error msg = {this.props.order.message}></Error></View>}
                        <ListView
                            dataSource={this.ds.cloneWithRows(this.props.order.order)}
                            renderRow={(rowData) => <OrderItem {...this.props} data={rowData}/>}
                        />
                    </View>
                </View>
            </MenuProvider>
        </SideMenu>
      );
    }
}
const styles = StyleSheet.create({
  container:{
    flex: 3,
    alignItems: 'center',
    backgroundColor:'white',
  },
  
  body:{
    flex:7
  }
});
function mapDispatchToProps(dispatch){
	return{
		getOrder : param=>{
			dispatch(actions.getOrder(param));
    }
  }	
}
function mapStateToProps(state){
	return{
        user:state.authReducer.user,
        order:state.orderReducer,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);