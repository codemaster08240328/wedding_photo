import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
  Platform
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
export default class Error extends Component {
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

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:10,
    },
    text:{
        flex:1,
        width:DEVICE_WIDTH-20,
        backgroundColor:'#FFF3F3',
        borderWidth:1,
        borderColor:"#FE0000",
        paddingLeft:15,
        paddingTop:6,
        color:"#FE0000",
        textAlign:'center'
    },
});

const styles_ipad = StyleSheet.create({
    container:{
        flex:1,
        width:DEVICE_WIDTH,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:10,
    },
    text:{
        flex:1,
        width:DEVICE_WIDTH-100,
        backgroundColor:'#FFF3F3',
        borderWidth:1,
        borderColor:"#FE0000",
        paddingLeft:15,
        paddingTop:8,
        color:"#FE0000",
        textAlign:'center',
        fontSize:20
    },
});