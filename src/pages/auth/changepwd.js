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
import SideMenu from 'react-native-side-menu';
import Menu from '../../components/SideMenu';
const DEVICE_WIDTH = Dimensions.get('window').width;

class PasswordChange extends Component {
    constructor(props){
        super(props)
        this.state = {
            old_pwd:'',
            new_pwd:'',
            confirm_pwd:'',   
            isloading:false,
            result:null,
            isOpen:false,
            message:'',
        }
        this.buttonClicked = this.buttonClicked.bind(this);
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

    buttonClicked(){

        info = {
            cust_id:this.props.user.cust_id,
            old_password:this.state.old_pwd,
            new_password:this.state.new_pwd,
            confirm_new_password:this.state.confirm_pwd
        }
        this.props.changePassword(info);
        
    }
    
    render(){
        const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
        return(
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
                onChange={isOpen => this.updateMenuState(isOpen)}
                
                >
                <View style = {styles.container}>
                    <View style={styles.header}>
                        <View style = {{flex:1, alignItems:'flex-start', justifyContent:'flex-end'}}>
                            <TouchableOpacity onPress = {() => {this.props.navigation.goBack()}} >
                                <Icon size={30} name = "chevron-left" type = 'feather' color = '#555'/>
                            </TouchableOpacity>
                    
                        </View>
                        <View style = {{flex:5, justifyContent:'flex-end', alignItems:'center'}}>
                            <Text style={{fontWeight:'bold', fontSize:18}}>CHANGE PASSWORD</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
                            <TouchableOpacity onPress = {this.toggleSideMenu} style={{marginRight:15}}>
                                <Icon name="menu" type="feather" color="#555" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = {styles.image}>
                        
                        <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Icon size={160} name = "unlock" type="evilicon" color="#EC6E6F"/>                
                        </View>
                        
                    </View>
                    <View style = {styles.main}>
                        <View style = {{flex:1}}>
                            <View style = {{flex:1, paddingLeft:20, justifyContent:'center'}}>
                                <Text style = {{fontSize:15}}>Old Password</Text>
                            </View>
                            <View style = {{flex:1, paddingLeft:20, paddingRight:20, }}>
                                <TextInput
                                    style = {styles.input}
                                    secureTextEntry = {true}

                                    onChangeText = {(old_pwd) => this.setState({old_pwd})}
                                    placeholder = 'Please enter your old password'/>
                            </View>
                        </View>
                        <View style={{flex:1, marginTop:15}}>
                            <View style = {{flex:1, paddingLeft:20, justifyContent:'center'}}>
                                <Text style = {{fontSize:15}}>New Password</Text>
                            </View>
                            <View style = {{flex:1, paddingLeft:20, paddingRight:20, }}>
                                <TextInput
                                    style = {styles.input}
                                    secureTextEntry = {true}

                                    onChangeText = {(new_pwd) => this.setState({new_pwd})}
                                    placeholder = 'Please enter your new password'/>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <View style = {{flex:1, paddingLeft:20, justifyContent:'center'}}>
                                <Text style = {{fontSize:15}}>Confirm New Password</Text>
                            </View>
                            <View style = {{flex:1, paddingLeft:20, paddingRight:20, }}>
                                <TextInput
                                    style = {styles.input}
                                    secureTextEntry = {true}

                                    onChangeText = {(confirm_pwd) => this.setState({confirm_pwd})}
                                    placeholder = 'Please enter your new password again'/>
                            </View>
                        </View>
                        <View style={{flex:1, marginTop:3}}>
                            <View style = {{flex:1, paddingLeft:20, paddingRight:20, paddingTop:15,paddingBottom:15}}>
                                <TouchableOpacity 
                                    onPress = {this.buttonClicked}
                                    style = {{flex:1, backgroundColor:'#EC6E6F', justifyContent:'center',alignItems:'center'}}>
                                    <Text style = {{color:'#fff', fontSize:15, fontWeight:'bold'}}>Reset Password</Text>
                                </TouchableOpacity>
                            </View>
                        
                        </View>
                    </View>
                    <View style = {styles.empty}>
                        {(this.props.changePwdReducer.success=='true')&&<View style = {{height:65, paddingLeft:10,marginRight:10}}><Success msg = {this.props.changePwdReducer.message}/></View>}
                        {(this.props.changePwdReducer.success=='false')&&<View style = {{height:65, }}><Error msg = {this.props.changePwdReducer.message}/></View>}
                    </View>
            </View>
           </SideMenu>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#fff'
    },
    input:{
        paddingTop:9,
        paddingBottom:9,
        width:"100%",
        backgroundColor:'white',
        borderWidth:1,
        borderColor:"#555",
        paddingLeft:10,
        fontSize:14,
    },
    image:{
      flex:3,
    },
    main:{
        flex:4,
    },
    header:{
        flex:1,
        flexDirection:'row'
    },
    body:{
        flex:7,
        backgroundColor:'red'
    },
    empty:{
        flex:2
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
      user:state.authReducer.user,
      changePwdReducer:state.changePwdReducer,
      netinfo:state.netInfo
    }
}
function mapDispatchToProps(dispatch){
	return{
		changePassword : (info)=>{
            console.log('------------>called');
			dispatch(actions.changePassword(info));
    }
  }	
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)
