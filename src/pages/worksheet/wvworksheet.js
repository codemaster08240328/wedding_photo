import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Image
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



class WVWorkSheet extends Component {

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
            w_date:'',
            s_time:'',
            s_location:'',
            s_address2:'',
            city2:'',
            zipcode2:'',
            state2:'',
            desc:'',
            cust_id:'',
            odr_id:this.props.navigation.getParam("odr_id"),
            c_s_time:'',
            c_address3:'',
            city3:'',
            state3:'',
            zipcode3:'',
            c_location:'',
            sp_formals:'',
            sp_photography:'',
            sp_r_pho:'',
            sp_photos:'',
            any_special:'',
            submitType:'partialSubmit',
            videog_id:this.props.navigation.getParam('videog_id'),
            r_s_time:'',
            r_f_name:'',
            r_email:'',
            r_address:'',
            r_location:''

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
        this.props.getWVWorkSheet(cust_id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.wvworksheet!=null){
            this.setState({
                isloading:false,
                f_name:nextProps.wvworksheet.FirstName,
                l_name:nextProps.wvworksheet.LastName,
                s_f_name:nextProps.wvworksheet.SpouseName,
                phone:nextProps.wvworksheet.Phone1,
                s_phone:nextProps.wvworksheet.Phone4
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
        body.append("_WeddingDate", this.state.w_date);
        body.append("_PhotographerStartTime", this.state.s_time);
        body.append("_WeddingDayStartLocation",this.state.s_location);
        body.append("Address2Street1",this.state.s_address2);
        body.append("City2", this.state.city2);
        body.append("State2", this.state.state2);
        body.append("PostalCode2",this.state.zipcode2);
        body.append("_CeremonyLocation", this.state.c_location)
        body.append("_CeremonyStartTime", this.state.c_s_time)
        body.append("Address3Street1", this.state.c_address3)
        body.append("PostalCode3", this.state.zipcode3)
        body.append("State3", this.state.state3)
        body.append("City3", this.state.city3)
        body.append('_ReceptionStartTime', this.state.r_s_time)
        body.append('_ReceptionLocation', this.state.r_location)
        body.append('_ReceptionLocationandAddress', this.state.r_address)
        body.append('_ReceptionVenueCoordinatorsFirstName', this.state.r_f_name)
        body.append('_ReceptionVenueCoordinatorsEmailAddress', this.state.r_email)
        body.append('_SpecialRequestsforPreparationPhotos', this.state.sp_photos)
        body.append('_SpecialRequestsforCeremonyPhotography',this.state.sp_photography)
        body.append('_SpecialRequestsforFamilyBridalPartyFormals',this.state.sp_formals)
        body.append('_SpecialRequestsforReceptionPhotography',this.state.sp_r_pho)
        body.append('_Isthereanythingelseweshouldbeawareof', this.state.any_special)
        body.append('submitType',this.state.submitType),
        body.append("videog_id", this.state.videog_id)

        
        WorksheetHelper.generateWeddingVideographyWorksheet(body,(result)=>{
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
          
       <View style = {styles.container}>
        <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <LogoComponent ></LogoComponent>
        <NavBar  title="Videography Worksheet" back_have={true} menu={true} handleBactPress = {() => goBack()}></NavBar>
        <KeyboardAwareScrollView 
            
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps={true}
            style = {styles.body}
        >
            {this.state.step!=6&&
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:15,paddingLeft:15}}>Step {this.state.step} of 5:</Text>
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
                <View style = {{flex:1,flexDirection:'row', width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <View style={{flex:1, paddingRight:5}}>
                        <Text style={{fontSize:13}}>Wedding Date*:</Text>
                        <TextInput onChangeText={(w_date)=>this.setState({w_date})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.w_date}</TextInput>
                    </View>
                    <View style = {{flex:1, paddingLeft:5}}>
                        <Text style={{fontSize:13}}>Videographer Start Time*:</Text>
                        <TextInput onChangeText={(s_time)=>this.setState({s_time})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_time}</TextInput>
                    </View>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Location(House/hotel for preparation or church/venue)*:</Text>
                    <TextInput onChangeText={(s_location)=>this.setState({s_location})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_location}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Start Location Street Address*:</Text>
                    <TextInput onChangeText={(s_address2)=>this.setState({s_address2})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.s_address2}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>City*:</Text>
                    <TextInput onChangeText={(city2)=>this.setState({city2})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.city2}</TextInput>
                </View>
                <View style = {{flex:1,flexDirection:'row',  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <View style={{flex:1, paddingRight:5}}>
                        <Text style={{fontSize:13, }}>State*:</Text>
                        <TextInput onChangeText={(state2)=>this.setState({state2})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.state2}</TextInput>
                    </View>
                    <View style = {{flex:1, paddingLeft:5}}>
                        <Text style={{fontSize:13}}>Zipcode*:</Text>
                        <TextInput onChangeText={(zipcode2)=>this.setState({zipcode2})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.zipcode2}</TextInput>
                    </View>
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
            {this.state.step==3&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Ceremony Start Time*:</Text>
                    <TextInput onChangeText={(c_s_time)=>this.setState({c_s_time})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.c_s_time}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Ceremony Location*:</Text>
                    <TextInput onChangeText={(c_location)=>this.setState({c_location})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.c_location}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Ceremony Address*:</Text>
                    <TextInput onChangeText={(c_address3)=>this.setState({c_address3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.c_address3}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>City*:</Text>
                    <TextInput onChangeText={(city3)=>this.setState({city3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.city3}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>State*:</Text>
                    <TextInput onChangeText={(state3)=>this.setState({state3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.state3}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Zipcode*:</Text>
                    <TextInput onChangeText={(zipcode3)=>this.setState({zipcode3})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.zipcode3}</TextInput>
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
            {this.state.step==4&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Reception Start Time*:</Text>
                    <Text style={{fontSize:12}}>(If there is a cocktail hour, use that as start time) </Text>
                    <TextInput onChangeText={(r_s_time)=>this.setState({r_s_time})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.r_s_time}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10, marginTop:15}}>
                    <Text style={{fontSize:13}}>Receptions Location*:</Text>
                    <TextInput onChangeText={(r_location)=>this.setState({r_location})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.r_location}</TextInput>
                </View>
                <View style = {{flex:2, width:'100%', padding:5,paddingLeft:10, paddingRight:10, marginTop:5}}>
                    <Text style={{fontSize:13}}>Reception Address*:</Text>
                    <Text style={{fontSize:12}}>(Please include full address, contact person, phone number)</Text>
                    <TextInput multiline={true} numberOfLines={3} onChangeText={(r_address)=>this.setState({r_address})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:80, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.r_address}</TextInput>
                </View>
                
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Reception Venue Coordinators FirstName:</Text>
                    <TextInput onChangeText={(r_f_name)=>this.setState({r_f_name})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.r_f_name}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Reception Venue Coordinators Email Address:</Text>
                    <TextInput onChangeText={(r_email)=>this.setState({r_email})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.r_email}</TextInput>
                </View>
                <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', backgroundColor:'#EB6F6F',width:150,height:30,borderRadius:30}} onPress={this.handleCtnPress}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:3,justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>CONTINUE</Text></View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Icon type='font-awesome' name="arrow-circle-right" color="white" size={15} /></View>
                        
                    </TouchableOpacity>
                </View>
            </View>
            }
            {this.state.step==5&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Social Requests for Preparation Photos:</Text>
                    
                    <TextInput onChangeText={(sp_photos)=>this.setState({sp_photos})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.sp_photos}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Special Requests for Ceremony Photography:</Text>
                    <TextInput onChangeText={(sp_photography)=>this.setState({r_location})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.sp_photography}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Special Requests for Family/Bridal Party Formals:</Text>
                    <TextInput multiline={true} numberOfLines={3} onChangeText={(sp_formals)=>this.setState({sp_formals})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.sp_formals}</TextInput>
                </View>
                
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Special Requests for Receiption Photography:</Text>
                    <TextInput onChangeText={(sp_r_pho)=>this.setState({sp_r_pho})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.sp_r_pho}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Is there anything else we should be aware of:</Text>
                    <TextInput onChangeText={(any_special)=>this.setState({any_special})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.any_special}</TextInput>
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
            {this.state.step==6&&
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
		getWVWorkSheet : (cust_id)=>{
			dispatch(actions.getWvWorksheet(cust_id));
    }
  }	
}
function mapStateToProps(state){
  return {
      auth:state.authReducer,
      wvworksheet:state.wvworksheet.worksheet,
      netinfo:state.netInfo
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WVWorkSheet)