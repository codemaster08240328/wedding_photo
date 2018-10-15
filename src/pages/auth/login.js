import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  AsyncStorage,
  ImageBackground,
  Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Error from '../../components/Error';
import Success from '../../components/Success';
import Form from '../../components/Form';
import actions from '../../redux/auth/action';
import okIcon from '../../../assets/ok-icon-animation.gif';
import logoImg from '../../../assets/logo-large.png';
import backgroundImg_ipad from '../../../assets/login-background-ipad.jpg';
import backgroundImg from '../../../assets/login-background.jpg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            isloading:false
        }
        this.spinStart = this.spinStart.bind(this);
    }
    componentDidMount(){
        this.getSession();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.loading==false)
            this.setState({isloading:false})
        if(nextProps.auth.loginsuccess)
            setTimeout(()=>{ this.props.navigation.navigate('dashboard') }, 4000);
    }
    getSession = async()=>{
        const cust_email = await AsyncStorage.getItem('email');
        const cust_pass = await AsyncStorage.getItem('pass');
        var userInfo = {
            email:cust_email,
            pass:cust_pass
        }
        if(this.props.netinfo!=null&&!this.props.netinfo.netinfo){
            return
        }
        if(userInfo.email!=null){
            this.spinStart()
            this.props.dispatch(actions.login(userInfo))
        }
    }    
  
    spinStart(){
        this.setState({isloading:true});
    }
    
    render() {
      return (
       <ImageBackground 
        style = {Platform.isPad?styles_ipad.container:styles.container}
        source = {Platform.isPad?backgroundImg_ipad:backgroundImg}
        >
        <View style = {Platform.isPad?styles_ipad.logo:styles.logo}>
            <Image
                style={Platform.isPad?styles_ipad.logoImg:styles.logoImg}
                source = {logoImg}
                color="#fff"
            />
            <Text style = {Platform.isPad?styles_ipad.logoTxt:styles.logoTxt}>Official iOS mobile app for the photograpers of ClassicPhotographers.com</Text>
        </View>
        
        <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
            <View style = {Platform.isPad?styles_ipad.body:styles.body} >
            {(this.props.auth.loginsuccess==false)&&<View style = {Platform.isPad?styles_ipad.notify:styles.notify}><Error msg = {this.props.auth.message}></Error></View>}
            {(this.props.auth.loginsuccess)&&<View style={Platform.isPad?styles_ipad.notify:styles.notify}><Success msg="Login success! Please wait for a while"/></View>}
            <KeyboardAwareScrollView
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
                contentContainerStyle = {{alignItems:'center'}}
                style={{flex: 1}}
            >
            <View style = {Platform.isPad?styles_ipad.form:styles.form}>
            
            {(!this.props.auth.loginsuccess)&&<Form spinner = {this.spinStart} {...this.props}></Form>}
            
            {(this.props.auth.loginsuccess)&&
                <View style = {{alignItems:'center'}} >

                    <Image
                        style = {Platform.isPad?styles_ipad.success:styles.success}
                        source = {okIcon}
                    />
                
                </View>} 
                </View>
            </KeyboardAwareScrollView>
            </View>

        {!Platform.isPad&&<View style = {Platform.isPad?styles_ipad.footer:styles.footer}>
        
            <Text style={Platform.isPad?styles_ipad.footerTxt:styles.footerTxt}>
                Copyright © 2018 - Classic Photographers.
            </Text>
            <Text style={Platform.isPad?styles_ipad.footerTxt:styles.footerTxt}>
                All Rights Reserved.
            </Text>

        </View>}
        {Platform.isPad&&<View style = {Platform.isPad?styles_ipad.footer:styles.footer}>
        
        <Text style={Platform.isPad?styles_ipad.footerTxt:styles.footerTxt}>
            Copyright © 2018 - Classic Photographers.  All Rights Reserved.
        </Text>

    </View>}
       </ImageBackground>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    
    body:{
      flex:4,
    },
    logo:{
        flex:1,
        width:'100%',
        alignItems:'center',
        paddingTop:30
    },
    logoImg:{
        width:"75%",
        resizeMode:'contain',
        height:90,
        
    },
    logoTxt:{
        width:'90%', 
        textAlign:'center', 
        fontSize:10,
        color: '#fff'
    },
    notify:{
        height:65, 
        position:'absolute', 
        top:0
    },
    footer:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    footerTxt:{
        fontSize:11,
        color: '#fff'
    },
    form:{
        height:140,
        backgroundColor:'#f4f4f4', 
        marginTop: '65%', 
        opacity:0.91
    },
    success:{height:130,width:130}
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
        fontSize:20,
        color: '#fff'
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
        fontSize:18,
        color: '#fff'

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

export default connect(mapStateToProps)(Login)