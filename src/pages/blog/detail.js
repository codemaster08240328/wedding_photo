import React, {Component} from 'react';
import { WebView, View, TouchableOpacity, Text } from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class BlogDetailPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            uri:this.props.navigation.getParam("custom_link")
        }
        console.log(this.props.navigation.getParam('custom_link'));
    }

    render(){
        const {goBack} = this.props.navigation;
        return(
            <View style = {{flex:1}}>
                <View style = {{flex:14, backgroundColor:'green', height:DEVICE_HEIGHT}}>
                    <WebView
                        ref={webview => {
                            this.myWebView = webview;
                        }}
                        scrollEnabled={true}
                        style = {{height:2000,width:DEVICE_WIDTH, zIndex:50}}
                        source={{uri: this.state.uri}}
                        />
                    </View>
                <View style = {{alignItems:'center'}}>
                    <TouchableOpacity 
                        onPress = {()=>goBack()}
                        style = {{
                            zIndex:100, 
                            marginTop:-100, 
                            paddingHorizontal:15,
                            height:28,
                            justifyContent:"center",  
                            borderColor:'#EC6E6F', 
                            borderRadius:5,
                            backgroundColor:'#EC6E6F'
                        }}
                        >
                        <Text style = {{color:'#fff', fontSize:15}}>{"< Back"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        )
    }
}