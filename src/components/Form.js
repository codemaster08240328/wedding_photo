import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import actions from '../redux/auth/action';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;



class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"cptp1@mail.com",//"",//"testd@testd.com",//"soumikdasgupta115566@malinator.com",//
            passwd:"BackBenchers2018",//"",//
        }
        this.handlePress = this.handlePress.bind(this);
        this.forgetPress = this.forgetPress.bind(this);
    }

    handlePress(){
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo){
            return
        }
        this.props.spinner();
        var userInfo = {
            email:this.state.email,
            pass:this.state.passwd
        }
        
        this.props.dispatch(actions.login(userInfo));
    }
    forgetPress(){
        this.props.navigation.navigate("PasswordReset");

    }

    render() {
      
      return (
          
       <View style = {Platform.isPad?styles_ipad.container:styles.container}>
        
            <TextInput 
                style = {Platform.isPad?styles_ipad.input:styles.input} 
                placeholder="Enter your email" 
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText={(email) => this.setState({email})}
                value = {this.state.email}
                keyboardType='email-address'
                />
            <TextInput 
                style = {Platform.isPad?styles_ipad.input:styles.input} 
                placeholder="Enter your password" 
                underlineColorAndroid='rgba(0,0,0,0)'
                secureTextEntry = {true}
                onChangeText={(passwd) => this.setState({passwd})}
                value = {this.state.passwd}
                />
            <View style = {Platform.isPad?styles_ipad.action:styles.action}>
                <TouchableOpacity onPress = {this.forgetPress} ><Text style={Platform.isPad?styles_ipad.forgot:styles.forgot}>Forgot password?</Text></TouchableOpacity>
                <TouchableOpacity onPress = {this.handlePress} style = {Platform.isPad?styles_ipad.lg_btn_:styles.lg_btn_} ><Text style = {Platform.isPad?styles_ipad.lg_btn:styles.lg_btn}>LOGIN</Text></TouchableOpacity>
            </View>
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      height:120,
      width:DEVICE_WIDTH,
      alignItems:'center',
      paddingTop:10,
      paddingRight:22,
      paddingLeft:22,

    },
    input:{
        flex:1,
        marginTop:5,
        width:DEVICE_WIDTH-44,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:"#ECECEC",
        paddingLeft:10,
        fontSize:13,
    },
    action:{
        flex:1,
        marginTop:5,
        width:DEVICE_WIDTH-44,
        flexDirection:'row',
        justifyContent:"space-between",

    },
    lg_btn:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:20,
        paddingRight:20,
        
        color:"white",
        fontSize:12,
    },
    lg_btn_:{
        borderRadius:20,
        backgroundColor:'#EC6E6F',
        justifyContent:'center',

    },
    forgot:{paddingTop:5, fontSize:12}
});
const styles_ipad = StyleSheet.create({
    container:{
      height:180,
      width:DEVICE_WIDTH-100,
      alignItems:'center',
      paddingTop:10,
      paddingRight:22,
      paddingLeft:22,

    },
    input:{
        flex:1,
        marginTop:15,
        width:DEVICE_WIDTH-144,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:"#ECECEC",
        paddingLeft:10,
        fontSize:18,
    },
    action:{
        flex:1,
        marginTop:15,
        width:DEVICE_WIDTH-144,
        flexDirection:'row',
        justifyContent:"space-between",

    },
    lg_btn:{
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:20,
        paddingRight:20,
        
        color:"white",
        fontSize:18,
    },
    lg_btn_:{
        borderRadius:10,
        backgroundColor:'#EC6E6F',
        justifyContent:'center',

    },
    forgot:{paddingTop:5, fontSize:20}
});

function mapStateToProps(state){
	return{
        auth:state.authReducer,
        netinfo:state.netInfo
	}
}
export default connect(mapStateToProps)(Form);