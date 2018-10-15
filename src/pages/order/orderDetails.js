
import React, { Component } from 'react';
import { 
    StyleSheet, 
    FlatList, 
    Text, 
    View, 
    Platform, 
} from 'react-native';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';

import actions from '../../redux/order/action';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import {convertTotal} from '../../helpers/utility'

class OrderDetail extends Component {
 constructor(props)
 {
   super(props);
    this.state = { 
        GridViewItems: [],
        isloading:false,
        packageName:'',
        odr_id:0,
        id:0,
        isOpen: false,
        message:null  
    }

    this.renderItem = this.renderItem.bind(this);    
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
    this.setState({isloading:true});
    if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
        return
    var data = {
        odr_id:this.props.navigation.getParam('order_id')
    }
    this.props.getOrderDetails(data);
}
componentWillReceiveProps(nextProps){
    if(nextProps.orderDetailReducer.loading == false)
        this.setState({isloading:false})
    if(nextProps.orderDetailReducer.getsuccess){    
        this.setState({id:nextProps.orderDetailReducer.orderDetail.odr_id})
        var odr_id = nextProps.orderDetailReducer.orderDetail.odr_id;
        var GridViewItems = [
            {key: "Photographer",id:1},
            {key: nextProps.orderDetailReducer.orderDetail.photog_full_name,id:2},
            {key: 'Package contents',id:1},
            {key: nextProps.orderDetailReducer.orderDetail.odr_pkg_desc,id:2},
            {key: 'Package Price',id:1},
            {key: '$' + convertTotal(nextProps.orderDetailReducer.orderDetail.odr_pkg_price),id : 2},
            {key: 'Shipping Charges',id:1},
            {key: '$' + convertTotal(nextProps.orderDetailReducer.orderDetail.odr_pkg_shipping),id:2},
            {key: 'Subtotal',id:1},
            {key: '$' + convertTotal(nextProps.orderDetailReducer.orderDetail.odr_total_outstanding),id:2}
        ];
        this.setState({GridViewItems:GridViewItems,packageName:nextProps.orderDetailReducer.orderDetail.odr_pkg_name,odr_id:odr_id});
         
        
    }
    if(this.props.state.proposalDetails.getsuccess&&this.props.state.proposalDetails.proposalDetails.coupon_data!=null && this.props.state.proposalDetails.proposalDetails.coupon_data.validity=='false')
    {
        this.setState({message:'Invalid Coupon'});
    }   
        
}

convertDesc(descr){
    var desc = descr.split('&bull;');
    var res='';
    console.log(desc);
    for (var i=1;i<desc.length;i++){
        console.log(desc[i].replace('<br>',""))
        res = res +"• " + desc[i].replace('<br>',"\n");
    }
    console.log(res);
    return res
}

convertTotal(total){
    var float = parseFloat(total);
    return float.toFixed(2);
}

renderItem=({item,index})=>{

        return (
            <View style={(item.id==1)?styles.GridViewBlockStyle_1:styles.GridViewBlockStyle_2}>
                <Text style={(item.id==1)?styles.GridViewInsideTextItemStyle_1:styles.GridViewInsideTextItemStyle_2} > {item.key} </Text>
            </View>
        );
}
termBtnHandle(visible){
    this.setState({modalVisible: visible});
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
            <NavBar  props = {this.props} title="Orders Detail" back_have={true} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
            <View style={styles.MainContainer}>
                {
                    this.state.message!=null&&<View>{this.state.message}</View> 
                }
                <Text style = {styles.heading}>
                    {this.state.packageName}
                </Text>
                <FlatList          
                    data={ this.state.GridViewItems }
                    renderItem={this.renderItem}
                    numColumns={2}
                />
            </View>
        </View>
    </SideMenu>

           
   );
 }
}
 
const styles = StyleSheet.create({
    container:{
        flex: 3,
        backgroundColor:'white',
      },
      
    MainContainer :{
    
        justifyContent: 'center',
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        backgroundColor : 'white',
    
    },
    
    GridViewBlockStyle_1: {
   
        justifyContent: 'center',
        flex:3,
        paddingLeft:10,
        backgroundColor: 'white',
        borderColor:"#ECECEC",
        borderWidth:0.5,

    

    
    }
    ,
    GridViewBlockStyle_2: {
    
        justifyContent: 'center',
        flex:5,
        paddingLeft:10,
        backgroundColor: 'white',
        borderColor:"#ECECEC",
        borderWidth:0.5

    }
    ,
    item4:{
        alignItems: 'center',
        flex:5,
        paddingLeft:10,
        backgroundColor: 'white',
        borderColor:"#ECECEC",
        borderWidth:0.5,
        flexDirection:'row'
    },
    text4:{
        fontSize: 12,
        justifyContent: 'center',
        fontSize:10,
        color:'#EC6E6E',
        marginLeft:10,
        fontWeight:'bold',
    },
    
    GridViewInsideTextItemStyle_1: {
        fontSize: 10,
        justifyContent: 'center',
        fontSize:10,
        fontWeight:'bold',
        color:'#5c5c5c',
        paddingTop:5,
        paddingBottom:5,
    },
    GridViewInsideTextItemStyle_2: {
        paddingTop:5,
        paddingBottom:5,
        fontSize: 10,
        justifyContent: 'center',
        fontSize:10,
        color:'#5c5c5c'
    },
    heading:{
        color:'#5c5c5c',
        fontWeight:'bold',
        height:38,
        textAlign:'center',
        justifyContent:'center',
        paddingTop:8
    },
    term:{
        flexDirection:'row',
        height:70,
        alignItems:'center',
        padding:10
    },
    TextStyle: {
        fontSize:13,
        color: '#516CF6',
        textDecorationLine: 'underline'
     
      },
    WebViewStyle:
    {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        marginTop: (Platform.OS) === 'ios' ? 20 : 0
    }
        
});
function mapDispatchToProps(dispatch){
	return{
		getOrderDetails : (data)=>{
			dispatch(actions.getOrderDetails(data));
    }
  }	
}
function mapStateToProps(state){
	return{
        state:state,
        orderDetailReducer:state.orderDetailsReducer,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);