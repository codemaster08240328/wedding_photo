
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Platform, 
    TextInput,
} from 'react-native';
import LogoComponent from '../../components/LogoComponent';
import NavBar from '../../components/NavBar';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import actions from '../../redux/proposal/action';


class ProposalChange extends Component {
 constructor(props)
 {
   super(props);
   this.state = {
       note_desc:'',
       prop_id:'',
       cust_id:'',
   }
   this.submit = this.submit.bind(this);
}
componentDidMount(){
    this.setState({prop_id:this.props.navigation.getParam('prop_id'), cust_id:this.props.user.cust_id});
}
submit(){
    this.props.dispatch(actions.changeProposalRequest(this.state));
}
componentWillReceiveProps(nextProps){
    // alert(nextProps.propChange);
}
 
 render() {
    const { goBack } = this.props.navigation;
    return (
        <View style = {styles.container}>  
            <LogoComponent ></LogoComponent>
            <NavBar  props = {this.props} title="Proposal Change Request" back_have={true} handleBactPress = {() => goBack()} menu={true}></NavBar>
            <View style={styles.MainContainer}>
                <View style = {{flex:4, paddingLeft:20, paddingRight:20}}>
                    <Text style={{color:'#EC6E6F', fontSize:20, paddingTop:10, paddingBottom:10}}>What changes are you requesting?</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(note_desc)=>this.setState({note_desc})}
                        style = {{borderColor:'#555', borderWidth:1, width:"100%", height:100, paddingLeft:10, paddingRight:10, paddingTop:5, paddingBottom:5}}
                        />
                    <Button title = 'SUBMIT' onPress = {this.submit} buttonStyle = {{backgroundColor:'#EC6E6F', marginTop:10, borderRadius:0}}/>
                    <View style={{flex:1, alignItems:'center'}}>
                        <Text style={{fontSize:20, marginTop:30, marginBottom:20}}>How can we help you?</Text>

                        <Text style={{fontSize:14, textAlign:'center'}}>Please call <Text style={{color:'#EC6E6F'}}>(877)521-2686</Text> if you have anything we can help you</Text>
                    </View>
                </View>
                <View style = {{flex:3}}></View>    
            </View>
        </View>
          
   );
 }
}
 
const styles = StyleSheet.create({
    container:{
        flex: 3,
        backgroundColor:'white',
      },
      
    MainContainer :{
    
        justifyContent: 'center',
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        backgroundColor : 'white',
    
    },

        
});

function mapStateToProps(state){
    return {
      propChange:state.propChange.propChange,
      netinfo:state.netInfo,
      user:state.authReducer.user
    }
}
export default connect(mapStateToProps)(ProposalChange);