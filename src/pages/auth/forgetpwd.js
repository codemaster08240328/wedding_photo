import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements'
import actions from '../../redux/auth/action';

import {connect} from 'react-redux';
import Error from '../../components/Error';
import Success from '../../components/Success';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;

class PasswordReset extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            isloading:false,
            result:null,
        }
        this.buttonClicked = this.buttonClicked.bind(this);
    }
    buttonClicked(){
        console.log(this.state.email);
        this.props.forgotPassword(this.state.email);
    }
    componentWillReceiveProps(nextProps){
        this.setState({result:nextProps.auth.message});
    }
    
    render(){
        return(
            <View style = {styles.container}>
                
                <View style = {styles.image}>
                    <View style = {{flex:1, justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress = {() => {this.props.navigation.goBack()}} style = {{width:'10%'}}>
                            <Icon size={30} name = "chevron-left" type = 'feather' color = '#555'/>
                        </TouchableOpacity>
                  
                    </View>
                    <View style = {{flex:3, justifyContent:'center', alignItems:'center'}}>
                        <Icon size={150} name = "lock" type="evilicon" color="#EC6E6F"/>                
                    </View>
                    
                </View>
                <View style = {styles.main}>
                        <View style = {{flex:1, justifyContent:'center', paddingLeft:20,paddingRight:20}}>
                            <Text style = {{textAlign:'center', fontSize:14}}>Please enter your email and we will send you a password reset link to change your password</Text>
                        </View>
                        <View style = {{flex:1, paddingLeft:20, justifyContent:'center'}}>
                            <Text style = {{fontSize:20}}>E-mail</Text>
                        </View>
                        <View style = {{flex:1, paddingLeft:20, paddingRight:20, }}>
                            <TextInput
                                style = {styles.input}
                                onChangeText = {(email) => this.setState({email})}
                                keyboardType='email-address'
                                placeholder = 'Please enter your e-mail'/>
                        </View>
                        <View style = {{flex:1, paddingLeft:20, paddingRight:20, paddingTop:15,paddingBottom:15}}>
                            <TouchableOpacity 
                                onPress = {this.buttonClicked}
                                style = {{flex:1, backgroundColor:'#EC6E6F', justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'#fff', fontSize:15, fontWeight:'bold'}}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                
                </View>
                
                <View style = {styles.empty}>
                    {(this.state.result=='true')&&<View style = {{height:65, paddingLeft:10,marginRight:10}}><Success msg = 'An email has been sent to your email address.'/></View>}
                    {(this.state.result=='false')&&<View style = {{height:65, }}><Error msg = 'Email address you inserted is not registered.'/></View>}
                </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#fff'
    },
    input:{
        paddingTop:13,
        paddingBottom:13,
        width:"100%",
        backgroundColor:'white',
        borderWidth:1,
        borderColor:"#555",
        paddingLeft:10,
        fontSize:14,
    },
    image:{
      flex:4,
    },
    main:{
        flex:3,
    },
    body:{
        flex:7,
        backgroundColor:'red'
    },
    empty:{
        flex:3
    }

});
const styles_ipad = StyleSheet.create({
    container:{
      flex: 1,
    },
    
    body:{
      flex:8,

    },
    logo:{
        flex:2,
        width:'100%',
        alignItems:'center',
        paddingTop:50,

    },
    logoImg:{
        width:"75%",
        resizeMode:'contain',
        height:130
    },
    logoTxt:{
        marginTop:15,
        width:'90%', 
        textAlign:'center', 
        fontSize:20
    },
    notify:{
        height:75, 
        position:'absolute', 
        top:0,
        width:DEVICE_WIDTH-100
    },
    footer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    footerTxt:{
        fontSize:18
    },
    form:{
        height:200,
        backgroundColor:'#f4f4f4', 
        marginTop: '65%', 
        opacity:0.91,
        width:DEVICE_WIDTH-100
    },
    success:{height:200,width:200}
});

function mapStateToProps(state){
    return {
      auth:state.authReducer,
      netinfo:state.netInfo
    }
}
function mapDispatchToProps(dispatch){
	return{
		forgotPassword : (email_address)=>{
            console.log('------------>called');
			dispatch(actions.forgotPass(email_address));
    }
  }	
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
