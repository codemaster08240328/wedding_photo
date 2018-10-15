import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements'
import actions from '../../redux/worksheet/action';
import WorksheetHelper from '../../service/worksheet'
import okIcon from '../../../assets/ok-icon-animation.gif';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'



class EPWorkSheet extends Component {

    constructor(props){
        super(props);
        this.state = {
            isloading:false,
            step:1,
            f_name:'',
            l_name:'',
            s_f_name:'',
            s_l_name:'',
            phone:'',
            s_phone:'',
            timeframe:'',
            s_location:'',
            cust_id:'',
            odr_id:this.props.navigation.getParam("odr_id"),
            c_address3:'',
            city3:'',
            state3:'',
            zipcode3:'',
            submitType:'partialSubmit',
            photog_id:this.props.navigation.getParam('photog_id'),
            
        }

    }
    componentDidMount(){
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
            return
        this.getCustId();    
    }

    getCustId = async()=>{
        this.setState({isloading:true})
        const cust_id = await AsyncStorage.getItem('cust_id');
        this.setState({cust_id});
        this.props.getEPWorkSheet(cust_id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.epworksheet!=null){
            this.setState({
                isloading:false,
                f_name:nextProps.epworksheet.FirstName,
                l_name:nextProps.epworksheet.LastName,
                s_f_name:nextProps.epworksheet.SpouseName,
                phone:nextProps.epworksheet.Phone1,
                s_phone:nextProps.epworksheet.Phone4,
                timeframe:nextProps.epworksheet._TimeFrameforEngagementSession,
                s_location:nextProps.epworksheet._EngagementDayStartLocation,
                c_address3:nextProps.epworksheet.Address3Street1,
                city3:nextProps.epworksheet.City3,
                state3:nextProps.epworksheet.State3,
                zipcode3:nextProps.epworksheet.PostalCode3
            })
            
        }else{
            this.setState({isloading:true})
        }
    }

    handleCtnPress=()=>{
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
            return
        this.setState({isloading:true});
        const body = new FormData();
        body.append("cust_id",this.state.cust_id)
        body.append("odr_id",this.state.odr_id)
        body.append("FirstName",this.state.f_name);
        body.append("LastName", this.state.l_name);
        body.append("_SpouseFirstName", this.state.s_f_name);
        body.append("_SpouseLastName", this.state.s_l_name);
        body.append("Phone1", this.state.phone);
        body.append("Phone4", this.state.s_phone);
        body.append('_TimeFrameforEngagementSession', this.state.timeframe);
        body.append("_EngagementDayStartLocation",this.state.s_location);
        body.append("Address3Street1",this.state.c_address3);

        body.append("PostalCode3", this.state.zipcode3)
        body.append("State3", this.state.state3)
        body.append("City3", this.state.city3)
        body.append('submitType',this.state.submitType),
        body.append("photog_id", this.state.photog_id)

        
        WorksheetHelper.generateEngagementPhotographyWorksheet(body,(result)=>{
            if(result.success=="true"){
                    this.setState({
                        isloading:false,
                        step:this.state.step+1
                    })
            }
        });
    }
    
    render() {
        const {goBack} = this.props.navigation;
        return (
       <View
        style = {styles.container}>
        <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <LogoComponent ></LogoComponent>
        <NavBar  title="Engagement Day Worksheet" back_have={true} menu={true} handleBactPress = {() => goBack()}></NavBar>
        <KeyboardAwareScrollView 
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps={true}
            style = {styles.body}
        >
            {this.state.step!=3&&
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:15,paddingLeft:15}}>Step {this.state.step} of 2:</Text>
            </View>}
            {this.state.step==1&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Your First Name*:</Text>
                    <TextInput onChangeText={(f_name)=>this.setState({f_name})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.f_name}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Your Last Name*:</Text>
                    <TextInput onChangeText={(l_name)=>this.setState({l_name})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.l_name}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Spouse First Name*:</Text>
                    <TextInput onChangeText={(s_f_name)=>this.setState({s_f_name})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_f_name}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Spouse Last Name*:</Text>
                    <TextInput onChangeText={(s_l_name)=>this.setState({s_l_name})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_l_name}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Your Phone*:</Text>
                    <TextInput onChangeText={(phone)=>this.setState({phone})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.phone}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Spouse Phone*:</Text>
                    <TextInput onChangeText={(s_phone)=>this.setState({s_phone})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_phone}</TextInput>
                </View>
                <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center', backgroundColor:'#EB6F6F',width:150,height:30,borderRadius:30}} onPress={this.handleCtnPress}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:3,justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>CONTINUE</Text></View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Icon type='font-awesome' name="arrow-circle-right" color="white" size={15} /></View>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {this.state.step==2&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>          
                    <Text style={{fontSize:13}}>Time Frame for Engagement Session*:</Text>
                    <TextInput onChangeText={(timeframe)=>this.setState({timeframe})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.timeframe}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Location(House/hotel for preparation or church/venue)*:</Text>
                    <TextInput onChangeText={(s_location)=>this.setState({s_location})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_location}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Start Location Street Address*:</Text>
                    <TextInput onChangeText={(c_address3)=>this.setState({c_address3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.c_address3}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>City*:</Text>
                    <TextInput onChangeText={(city3)=>this.setState({city3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.city3}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13, }}>State*:</Text>
                    <TextInput onChangeText={(state3)=>this.setState({state3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.state3}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                <Text style={{fontSize:13}}>Zipcode*:</Text>
                        <TextInput onChangeText={(zipcode3)=>this.setState({zipcode3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.zipcode3}</TextInput>
                </View>
                <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', backgroundColor:'#EB6F6F',width:150,height:30,borderRadius:30}} onPress={this.handleCtnPress}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:3,justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>FINISH</Text></View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Icon type='font-awesome' name="check-circle" color="white" size={15} /></View>
                    </TouchableOpacity>
                </View>                

            </View>
            }
            {this.state.step==3&&
            <View style = {{alignItems:'center'}} >

                <Image
                    style = {{height:200,width:200}}
                    source = {okIcon}
                />

                <Text style = {{fontSize:20}}>Operation Successful!</Text>
                <TouchableOpacity onPress={() => goBack()}><Text style={{color:'#EB6F6F'}}>Go Back to Orders.</Text></TouchableOpacity>
                
                
            </View>
            
            }
        </KeyboardAwareScrollView>
        </View>
       
      );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 3,
      backgroundColor:'white',
    },
    
    body:{
      flex:7
    }
});
function mapDispatchToProps(dispatch){
	return{
		getEPWorkSheet : (cust_id)=>{
			dispatch(actions.getEpWorksheet(cust_id));
    }
  }	
}
function mapStateToProps(state){
  return {
      auth:state.authReducer,
      epworksheet:state.epworksheet.worksheet,
      netinfo:state.netInfo
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EPWorkSheet)