import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
export default class Success extends Component {
    constructor(props){
        super(props);

    }
    render() {
      return (
       <View style = {Platform.isPad?styles_ipad.container:styles.container}>
        
        <Text style = {Platform.isPad?styles_ipad.text:styles.text}>
            {this.props.msg}
        </Text>
       </View>
      );
    }
}

const styles_ipad = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH,
        alignItems:'center',
        paddingTop:20,
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:10,
        justifyContent:'center'
  
    },
    text:{
        flex:1,
        width:DEVICE_WIDTH-100,
        textAlign:'center',
        backgroundColor:'#F2FFF5',
        borderWidth:1,
        borderColor:"#4BD963",
        paddingLeft:15,
        paddingTop:8,
        color:"#4BD963",
        fontSize:20
    },
});

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH,
        alignItems:'center',
        paddingTop:20,
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:10,
  
    },
    text:{
        flex:1,
        width:DEVICE_WIDTH-20,
        textAlign:'center',
        backgroundColor:'#F2FFF5',
        borderWidth:1,
        borderColor:"#4BD963",
        paddingLeft:15,
        paddingTop:6,
        color:"#4BD963"
    },
});