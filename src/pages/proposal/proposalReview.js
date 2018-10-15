
import React, { Component } from 'react';
import { 
    StyleSheet, 
    FlatList, 
    Text, 
    View, 
    Platform, 
    TouchableOpacity,
    TextInput,
    Modal,
    WebView,
} from 'react-native';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import Spinner from 'react-native-loading-spinner-overlay';
// import { getProposalOrderDetail } from '../actions/proposalDetail';
import actions from '../../redux/proposal/action';
import { connect } from 'react-redux';
import Hyperlink from 'react-native-hyperlink';
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
import {convertTotal} from '../../helpers/utility'

class ProposalReview extends Component {
 constructor(props)
 {
   super(props);
    this.state = { 
        prop_id:'',
        GridViewItems: [],
        isloading:false,
        packageName:'',
        coupon:0,
        odr_id:0,
        amount:0,
        id:0,
        modalVisible: false,
        terms:'',
        isOpen: false,
        message:null  
    }

    this.renderItem = this.renderItem.bind(this);    
    this.payBtnHandle = this.payBtnHandle.bind(this);
    this.termBtnHandle = this.termBtnHandle.bind(this);
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
        return
    this.setState({isloading:true,prop_id:this.props.navigation.getParam('prop_id')});
    var data = {
        prop_id:this.props.navigation.getParam('prop_id'),
        odr_id:'',
        apply_coupon:''
    }
    this.props.getProposalOrderDetail_(data);
}
payBtnHandle(){
    var data = {
        id:this.state.id,
        amount:this.state.amount
    }
    this.props.navigation.navigate("webView",data);
}
applyBtnHandle = ()=>{
    this.setState({isloading:true});
    var data = {
        prop_id:this.state.prop_id,
        odr_id:this.state.odr_id,
        apply_coupon:this.state.coupon
    }
    this.props.getProposalOrderDetail_(data);
}
componentWillReceiveProps(nextProps){
    if(nextProps.state.proposalDetails.loading==false)
        this.setState({isloading:false})
    if(nextProps.state.proposalDetails.getsuccess){    
        this.setState({id:nextProps.state.proposalDetails.proposalDetails.order_details.reserve_paysch_id,amount:nextProps.state.proposalDetails.proposalDetails.order_details.reserve_amount})
        var coupon_discount = nextProps.state.proposalDetails.proposalDetails.order_details.odr_coup_discount == "" ? 0 : nextProps.state.proposalDetails.proposalDetails.order_details.odr_coup_discount;
        var odr_id = nextProps.state.proposalDetails.proposalDetails.order_details.new_order_id;
        var GridViewItems = [
            {key: "Photographer",id:1},
            {key: nextProps.state.proposalDetails.proposalDetails.payment_data.photog_full_name,id:2},
            {key: 'Package contents',id:1},
            {key: this.convertDesc(nextProps.state.proposalDetails.proposalDetails.order_details.odr_pkg_desc),id:2},
            {key: 'Package Price',id:1},
            {key: '$' + convertTotal(nextProps.state.proposalDetails.proposalDetails.order_details.odr_pkg_price),id : 2},
            {key: 'Coupon Discount',id:1},
            {key: '$' + convertTotal(coupon_discount),id:4},
            {key: 'Tax',id:1},
            {key: 'No taxable items found in your order',id:2},
            {key: 'Subtotal',id:1},
            {key: '$' + convertTotal(nextProps.state.proposalDetails.proposalDetails.order_details.odr_total_value),id:2},
            {key: 'Shipping Charges',id:1},
            {key: '$' + convertTotal(nextProps.state.proposalDetails.proposalDetails.order_details.odr_pkg_shipping),id:2},
            {key: 'Total',id:1},
            {key: '$' + convertTotal(nextProps.state.proposalDetails.proposalDetails.order_details.odr_total_outstanding),id:2}
        ];
        var terms = nextProps.state.proposalDetails.proposalDetails.order_details.odr_contract.replace(/(?:\\[rn]|[\r\n]+)+/g, "");
        this.setState({terms:terms});
        this.setState({isloading:false, GridViewItems:GridViewItems,packageName:nextProps.state.proposalDetails.proposalDetails.proposal_data.prop_pkg_name,odr_id:odr_id});
         
        
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
    if(item.id==4)
    {
        return (
            
            <View style={styles.item4}>
                <Text style={(item.id==1)?styles.GridViewInsideTextItemStyle_1:styles.GridViewInsideTextItemStyle_2} > {item.key} </Text>
                <TextInput style = {{paddingLeft:5,borderWidth:1,color:'#5c5c5c',borderColor:'#EEEEEE',fontSize : 10, marginBottom:10,marginTop:10,width:70,marginLeft:10}} onChangeText = {(text)=>this.setState({coupon:text})} />
                <TouchableOpacity style={{ padding:5}} onPress={this.applyBtnHandle}><Text style={styles.text4} >Apply Coupons</Text></TouchableOpacity>
            </View> 
            );
    }else{
        return (
            <View style={(item.id==1)?styles.GridViewBlockStyle_1:styles.GridViewBlockStyle_2}>
                <Text style={(item.id==1)?styles.GridViewInsideTextItemStyle_1:styles.GridViewInsideTextItemStyle_2} > {item.key} </Text>
            </View>
        );
    }

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
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
            }}>
                <View style={{marginTop: 22,padding:10}}>

                    <TouchableOpacity
                        style={{alignItems:'center',marginLeft:50,marginRight:50,backgroundColor:"#EC6C6B",paddingBottom:5,borderRadius:15,paddingLeft:10,paddingRight:10,paddingTop:5}}
                        onPress={() => {
                            this.termBtnHandle(!this.state.modalVisible);
                        }}>
                        <Text style = {{color:'white'}}>Back to the page</Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    style={styles.WebViewStyle}  
                    source = {{html:this.state.terms}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    />
            </Modal>
            <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            <LogoComponent ></LogoComponent>
            <NavBar  props = {this.props} title="REVIEW PROPOSAL & PAY" back_have={true} handleBactPress = {() => goBack()} handlePress={this.toggleSideMenu}></NavBar>
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
                <View style = {styles.term}>
                    <View style={{flex:7}}>
                        <Hyperlink 
                            onPress = {() => {
                                this.termBtnHandle(true);
                            }}
                            linkStyle={ {flex:7, color: '#627AF7', fontSize: 13 } }
                            linkText={ url => url === 'https://github.com/obipawan/hyperlink' ? 'Terms & Conditions' : url }>
                            <Text style={ { fontSize: 12 } }>
                                By clicking the "PAY NOW" button, you accept the  https://github.com/obipawan/hyperlink
                            </Text>
                        </Hyperlink>
                    </View>
                    <View style={{flex:4,alignItems:'center'}}>
                        <TouchableOpacity 
                            onPress={this.payBtnHandle} 
                            style = {{backgroundColor:"#EC6C6B",paddingBottom:5,borderRadius:15,paddingLeft:10,paddingRight:10,paddingTop:5}}>
                            <Text style = {{fontSize:10, color:'white'}}>
                                PAY NOW ${convertTotal(this.state.amount)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>        
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
        marginTop: (Platform.OS) === 'ios' ? 20 : 0,
        backgroundColor:'blue'
    }
        
});
function mapDispatchToProps(dispatch){
	return{
		getProposalOrderDetail_ : (data)=>{
			dispatch(actions.getProposalOrderDetail(data));
    }
  }	
}
function mapStateToProps(state){
	return{
        state:state,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProposalReview);