import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Icon } from 'react-native-elements'

import { connect } from 'react-redux'

import Avatar from '../components/Avatar'
import { colors } from '../settings/constant'



const DEVICE_WIDTH = Dimensions.get('window').width;

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logIn : false
        }
    }

    render() {
      return (
        <View style = {styles.container}>
            <View style={{flex: 1, paddingLeft: 15, flexDirection: 'row'}}>
                <Avatar
                    size="medium"
                    rounded
                    source={{uri: this.props.user.photog_profile_pic}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                />
                <View style={{justifyContent: "center", marginLeft: 5}}>
                    <Text> {this.props.user.photog_fname + " " + this.props.user.photog_lname} </Text>
                    <Text style={{color: colors.fontGrayColor, fontSize: 10}}> Photographer </Text>
                </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                <TouchableOpacity  
                    style = {{marginRight: 10}} 
                    // onPress = {this.props.handlePress}
                >
                    <Icon 
                        name="calendar"
                        type="font-awesome" 
                        color="#b4b4b4" 
                        size={21} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style = {{marginRight: 9, marginTop: 4}} 
                //   onPress = {this.props.handlePress}
                >
                    <Icon name="earth" type="material-community" color="#b4b4b4" size={26} />
                </TouchableOpacity>
                <TouchableOpacity  
                    style={{marginRight: 8}}
                    // onPress = {this.props.handlePress}
                >
                    <Icon name="search" type="feather" color="#b4b4b4" size={25} />
                </TouchableOpacity>
                <TouchableOpacity  
                    style = {{marginRight: 15, marginTop: 2}} 
                    onPress = {this.props.handlePress}
                >
                    <Icon name="menu" type="entypo" color="#b4b4b4" size={30} />
                </TouchableOpacity>
            </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
      justifyContent:'center',
      flexDirection:"row",
      backgroundColor: colors.white,
      height:60,
      width:DEVICE_WIDTH,
      alignItems:'center',
      borderBottomWidth:0.5,
      borderColor: colors.lightBorderColor
    },
    header:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#3a4a51',
        alignItems: 'flex-end',
        paddingBottom:12,
        paddingLeft:52,
    },
    headerTitle:{
        fontSize:15,  
    },
    back:{
        position:'absolute',
        left:15,
        flex:1,
        flexDirection:'row',
        alignItems:'center'

    },
    menu:{
        // position:'absolute',
        // right:15,
        marginRight: 15,
    },

    

    
});

function mapStateToProps(state){
    return {
      user:state.authReducer.user
    }
  }

export default connect(mapStateToProps)(NavBar)