import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../settings/constant'

import logoImg from '../../assets/logo.png';
const DEVICE_WIDTH = Dimensions.get('window').width;
class LogoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            logIn : false,
            name : '',
            address:'',
            state:'',
            zip:'',
            date:'',
        }
    }
    render() {
      console.log('fname',this.props);
      return (
       <View style = {styles.container}>
            <Image
                style={{
                    height: 20
                }}
                resizeMode='contain'
                source={logoImg}
            />        
        
        {/* { this.props.auth.loginsuccess && <View style = {styles.LogoDAc}>
            <Text style = {styles.LogoDesc}>{this.state.name}</Text>
            <Text style = {styles.LogoDescCon}>Hi! {this.props.auth.user.cust_fname}, Your wedding at {this.props.auth.user.cust_wed_loc_city},{this.props.auth.user.cust_wed_loc_state}, {this.props.auth.user.cust_wed_loc_zip} on {convertDateFormat(this.props.auth.user.cust_wed_date)}</Text>
        </View> } */}
        
       </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
        height:60,
        alignItems: 'center',
        justifyContent:'center',
        paddingTop:15,
        backgroundColor: colors.headerColor,
        borderBottomWidth: 0.7,
        borderColor: colors.darkBorderColor,
        width: DEVICE_WIDTH
    },
    LogoImage:{
        justifyContent:'center',
        alignItems:'center',
    },   
});

function mapStateToProps(state){
	return{
		auth:state.authReducer
	}
}

export default connect(mapStateToProps)(LogoComponent);