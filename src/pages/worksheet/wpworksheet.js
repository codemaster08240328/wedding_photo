import React, {Component} from 'react';
import Dimensions from 'Dimensions';
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
import okIcon from '../../../assets/ok-icon-animation.gif'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'




class WPWorkSheet extends Component {

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
            cust_id:this.props.auth.user.cust_id,
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
            photog_id:this.props.navigation.getParam('photog_id'),
            r_s_time:'',
            r_f_name:'',
            r_email:'',
            r_address:'',
            r_location:'',
            djName:'',
            djEmail:'',
            floristEmail:'',
            floristName:'',
            fbURL:'',
            instaURL:'',
            hashTag:'',
            dressBought:''

        }

    }
    componentDidMount(){
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo)
            return
        this.getCustId();    
    }

    getCustId = async()=>{
        this.setState({isloading:true})
        this.props.getWPWorkSheet(this.state.cust_id);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.wpworksheet!=null){
            this.setState({
                isloading:false,
                f_name:nextProps.wpworksheet.FirstName,
                l_name:nextProps.wpworksheet.LastName,
                s_f_name:nextProps.wpworksheet.SpouseName,
                phone:nextProps.wpworksheet.Phone1,
                s_phone:nextProps.wpworksheet.Phone4,
                w_date:nextProps.wpworksheet._WeddingDate,
                s_time:nextProps.wpworksheet._PhotographerStartTime,
                s_location:nextProps.wpworksheet._WeddingDayStartLocation,
                s_address2:nextProps.wpworksheet.Address2Street1,
                city2:nextProps.wpworksheet.City2,
                zipcode2:nextProps.wpworksheet.PostalCode2,
                state2:nextProps.wpworksheet.State2,
                desc:nextProps.wpworksheet._GroomPreperation,
                c_s_time:nextProps.wpworksheet._CeremonyStartTime,
                c_address3:nextProps.wpworksheet.Address3Street1,
                city3:nextProps.wpworksheet.City3,
                state3:nextProps.wpworksheet.State3,
                zipcode3:nextProps.wpworksheet.PostalCode3,
                c_location:nextProps.wpworksheet._CeremonyLocation,
                sp_formals:nextProps.wpworksheet._SpecialRequestsforFamilyBridalPartFormals,
                sp_photography:nextProps.wpworksheet._SpecialRequestsforCeremonyPhotography,
                sp_r_pho:nextProps.wpworksheet._SpecialRequestsforReceptionPhotograhpy,
                sp_photos:nextProps.wpworksheet._SpecialRequestsforPreparationPhotos,
                any_special:nextProps.wpworksheet._Isthereanythingelseweshouldbeawareof,
                r_s_time:nextProps.wpworksheet._ReceptionStartTime,
                r_f_name:nextProps.wpworksheet._ReceptionVenueCoordinatorsFirstName,
                r_email:nextProps.wpworksheet._ReceptionVenueCoordinatorsEmailAddress,
                r_address:nextProps.wpworksheet._ReceptionLocationandAddress,
                r_location:nextProps.wpworksheet._ReceptionLocation,
                fbURL:nextProps.wpworksheet._FacebookURL,
                instaURL:nextProps.wpworksheet._InstagramURL,
                hashTag:nextProps.wpworksheet._WeddingHashtag,
                dressBought:nextProps.wpworksheet._DressBought,
                djName:nextProps.wpworksheet._DJName,
                djEmail:nextProps.wpworksheet._DJEmail,
                floristName:nextProps.wpworksheet._FloristName,
                floristEmail:nextProps.wpworksheet._FloristEmail
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
        body.append("_GroomPreperation", this.state.desc);
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
        body.append('_FacebookURL', this.state.fbURL)
        body.append('_InstagramURL', this.state.instaURL)
        body.append('_WeddingHashtag', this.state.hashTag)
        body.append('_DressBought', this.state.dressBought)
        body.append('_DJName', this.state.djName)
        body.append('_DJEmail', this.state.djEmail)
        body.append('_FloristName', this.state.floristName)
        body.append('_FloristEmail', this.state.floristEmail)

        body.append('submitType',this.state.submitType)
        body.append("photog_id", this.state.photog_id)

        
        WorksheetHelper.generateWeddingPhotographyWorksheet(body,(result)=>{
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
        <NavBar  title="Wedding Day Worksheet" back_have={true} menu={true} handleBactPress = {() => goBack()}></NavBar>
        <KeyboardAwareScrollView 
            
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps={true}
            style = {styles.body}
        >
            {this.state.step!=7&&
            <View style={{flex:1, justifyContent:'center'}}>
                <Text style={{fontSize:15,paddingLeft:15}}>Step {this.state.step} of 6:</Text>
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
                        <Text style={{fontSize:13}}>Photographer Start Time*:</Text>
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
                        <TextInput onChangeText={(zipcode)=>this.setState({zipcode})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.zipcode2}</TextInput>
                    </View>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Would you like groom preparation photography? If so please tell us where:</Text>
                    <TextInput onChangeText={(desc)=>this.setState({desc})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.desc}</TextInput>
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
                    <TextInput onChangeText={(sp_photography)=>this.setState({sp_photography})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:50, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.sp_photography}</TextInput>
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
                        <View style={{flex:3,justifyContent:'center', alignItems:'center'}}><Text style={{color:'white'}}>CONTINUE</Text></View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Icon type='font-awesome' name="arrow-circle-right" color="white" size={15} /></View>
                    </TouchableOpacity>
                </View>
            </View>

            }
            {this.state.step==6&&
            <View style = {{flex:10}}>
                <View style = {{flex:1, width:'100%',padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Facebook URL:</Text>
                    <TextInput 
                        onChangeText={(fbURL)=>this.setState({fbURL})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.fbURL}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Instagram URL:</Text>
                    <TextInput onChangeText={(instaURL)=>this.setState({instaURL})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.instaURL}</TextInput>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>WeddingHashtag:</Text>
                    <TextInput onChangeText={(hashTag)=>this.setState({hashTag})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.hashTag}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontSize:13}}>Where did you buy your dress:</Text>
                    <TextInput onChangeText={(dressBought)=>this.setState({dressBought})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.dressBought}</TextInput>
                </View>
                <View style = {{flex:1,  width:'100%', padding:5,paddingLeft:10, paddingRight:10, flexDirection:"row"}}>
                    <View style={{flex:1, paddingRight:5}}>
                        <Text style={{fontSize:13}}>DJName:</Text>
                        <TextInput onChangeText={(djName)=>this.setState({djName})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.djName}</TextInput>
                    </View>
                    <View style = {{flex:1, paddingLeft:5}}>
                        <Text style={{fontSize:13}}>DJEmail:</Text>
                        <TextInput onChangeText={(djEmail)=>this.setState({djEmail})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.djEmail}</TextInput>
                    </View>
                </View>
                <View style = {{flex:1, width:'100%', padding:5,paddingLeft:10, paddingRight:10, flexDirection:"row"}}>
                    <View style={{flex:1, paddingRight:5}}>
                        <Text style={{fontSize:13}}>FloristName:</Text>
                        <TextInput onChangeText={(floristName)=>this.setState({floristName})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.floristName}</TextInput>
                    </View>
                    <View style = {{flex:1, paddingLeft:5}}>
                        <Text style={{fontSize:13}}>FloristEmail:</Text>
                        <TextInput onChangeText={(floristEmail)=>this.setState({floristEmail})} style = {{marginTop:5,paddingLeft:5, width:"100%", height:40, borderWidth:1, borderColor:'#767676',fontSize:18}}>{this.state.floristEmail}</TextInput>
                    </View>
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
            {this.state.step==7&&
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
		getWPWorkSheet : (cust_id)=>{
			dispatch(actions.getWpWorksheet(cust_id));
    }
  }	
}
function mapStateToProps(state){
  return {
      auth:state.authReducer,
      wpworksheet:state.wpworksheet.worksheet,
      netinfo:state.netInfo
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WPWorkSheet)