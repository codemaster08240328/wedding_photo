import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
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
        const { goBack } = this.props.navigation;
        return (
        <View style = {styles.container}>
            <View style = {{flex:1}}>
                {this.props.backbtn&&
                <TouchableOpacity 
                    onPress={() => goBack()}
                >
                    <Text 
                        style={{
                            color: 'blue',
                            paddingLeft: 5
                        }}
                    >
                        {"< Back "}
                    </Text>
                </TouchableOpacity>
                    
                }
            </View>
            <View style={{flex:3, alignItems: 'center'}}>
                <Image
                    style={{
                        height: 20
                    }}
                    resizeMode='contain'
                    source={logoImg}
                />    
            </View>
            <View style={{flex:1, alignItems: 'flex-end'}}>
                {this.props.nextbtn&&
                <TouchableOpacity 
                    onPress={this.props.nextBtnClicked}
                >
                    <Text 
                        style={this.props.nextbtnvisible ? {
                            color: 'blue',
                            paddingRight: 5
                        } : {
                            color: colors.fontGrayColor,
                            paddingRight: 5}}
                    >
                        {"Next > "}
                    </Text>
                </TouchableOpacity>
                }
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
        height:60,
        alignItems: 'center',
        paddingTop:15,
        backgroundColor: colors.headerColor,
        borderBottomWidth: 0.7,
        borderColor: colors.darkBorderColor,
        width: DEVICE_WIDTH, 
        flexDirection: 'row'
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