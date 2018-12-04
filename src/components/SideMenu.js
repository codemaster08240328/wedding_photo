import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import actions from '../redux/auth/action';



const window = Dimensions.get('window');
const styles = StyleSheet.create({
  menu: {
    flex: 1,
    height: window.height,
    backgroundColor:'#FA606A',
  },
  avatar:{
    marginLeft:10,
    fontSize:20,
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#E7E7E7',
    height:50,
    paddingLeft:10
  },
  name: {
    paddingLeft:10,
    marginLeft:10,
    width:195,
    backgroundColor:"#BDBCBC",
    borderRadius:3,
    height:30,
    paddingTop:5,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {
  constructor(props){
    super(props);
    this.proposal = this.proposal.bind(this);
    this.order = this.order.bind(this);
    this.payment = this.payment.bind(this);
    this.auth = this.auth.bind(this);
    this.change = this.change.bind(this);
}

  proposal(){
    if(this.props.user != null){
      this.props.onItemSelected("dashboard");
    }else{
      alert("Please login");
    }
    
  }

  order(){
    if(this.props.user!=null){
      this.props.onItemSelected('calendar');
    }else{
      alert('Please login');
    }
    

  }

  change(){
    if(this.props.user!=null){
      this.props.onItemSelected('contract');
    }else{
      alert('Please login');
    }
    
  }
  profile = () => {
    if(this.props.user!=null){
      this.props.onItemSelected('profile');
    }else{
      alert('Please login');
    }
    
  }

  payment(){
      this.props.onItemSelected('payment');   
  }

  auth(){
    if(this.props.user!=null){
      console.log('clicked')
      this.logout();
    }else{
      this.props.onItemSelected('Login');
    }
    
  }

  logout = async()=>{
    console.log('clicked2')
    await AsyncStorage.clear();
    this.props.dispatch(actions.logout());
    this.props.navigation.navigate("Login");
  }
  render(){
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View style={{flex:2}}></View>
            <View style = {{flex:10,}}>
                <TouchableOpacity onPress={this.proposal} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,marginTop:25,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "dashboard" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.order} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "date-range"  color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Manage My Dates</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.payment} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "history" type="font-awesome" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Payments History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "ios-contacts" type="ionicon" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Contracts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "ios-information-circle" type="ionicon" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Best Practices</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "question-circle-o" type="font-awesome" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>FAQ Quesions</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "video" type="feather" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>FAQ Videos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "md-contacts" type="ionicon" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Contact CP Staff</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.change} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "ios-call" type="ionicon" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>Emergency</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.profile()} style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}}>
                    <Icon size={17} name = "details" color="#fff"/>
                    <Text style = {{paddingLeft:5, color:'white'}}>My Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{flexDirection:'row',alignItems:'center',height:40,paddingLeft:10,padding:10,borderBottomColor:'white',borderBottomWidth:1}} onPress={this.auth}>
                    {this.props.user!=null&&<Icon size={17} name = "log-out" type="entypo" color="#fff"/>}
                    {this.props.user==null&&<Icon size={17} name = "login" type="entypo" color="#fff"/>}
                    {this.props.user!=null&&
                    <Text style = {{paddingLeft:5, color:'white'}}>
                      Logout
                    </Text>}
                    {this.props.user==null&&
                    <Text style = {{paddingLeft:5, color:'white'}}>
                      Login
                    </Text>}

                </TouchableOpacity>
                
                
            </View>
        </ScrollView>
    );
  }
  
}

function mapStateToProps(state){
  return {
    user:state.authReducer.user
  }
}

export default connect(mapStateToProps)(Menu)
