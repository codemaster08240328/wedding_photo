import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'
import LogoComponent from '../../components/LogoComponent';
import Menu from '../../components/SideMenu'
import NavBar from '../../components/NavBar';
import actions from '../../redux/dashboard/action';
import { colors } from '../../settings/constant'
import { Icon, ListItem, Button } from 'react-native-elements';
import Modal from 'react-native-modal'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;



// const data = [
//   {data: [{name: "Rona Dalessio", date: "2017-11-18", address: 'Boston MA, 02108'}], key: "Make New Booking Call", type: 'Call Immediately'},
//   {data: [{name: 'TestCustomer Samantha', date: '2018-04-25', address: 'Andover MA, 02108'}], key: "Request Wedding Pay", type: 'After files uploaded'},
//   {data: [{name: 'Danyelle Mcelroy', date: '2018-07-30', address: 'Andover MA, 02108'}], key: "Engagement Worksheet", type: 'View Updated info'}
// ]

class DashBoard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data:[],
       isModalVisible: false
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.renderHeaderSection = this.renderHeaderSection.bind(this)
    this.renderItemSection = this.renderItemSection.bind(this)
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
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  componentDidMount() {
    console.log('this.prop', this.props)
    const param = {
      photog_id: this.props.user.photog_id
    }
    this.props.dispatch(actions.getDashboard(param))
  }

  getData(param){
    let data = []
    if(param['check-in-call']){
      const item = {
        key: 'Make Check in call',
        type: param['check-in-call'][0].notification_type_data[0].n_type_disp_message,
        data: param['check-in-call'][0].customer_data
      }
      data.push(item);
    }
    if(param['new-booking']){
      const item = {
        key: 'Make New Booking',
        type: param['new-booking'][0].notification_type_data[0].n_type_disp_message,
        data: param['new-booking'][0].customer_data
      }
      data.push(item);
    }
    if(param['request-payment']){
      const item = {
        key: 'Make request payment',
        type: param['request-payment'][0].notification_type_data[0].n_type_disp_message,
        data: param['request-payment'][0].customer_data
      }
      data.push(item);
    }
    if(param['request-payment-eng']){
      const item = {
        key: 'Make English Request Payment',
        type: param['request-payment-eng'][0].notification_type_data[0].n_type_disp_message,
        data: param['request-payment-eng'][0].customer_data
      }
      data.push(item);
    } 
    if(param['review-contract']){
      const item = {
        key: 'Make review contract',
        type: param['review-contract'][0].notification_type_data[0].n_type_disp_message,
        data: param['review-contract'][0].customer_data
      }
      data.push(item);
    }
    if(param['worksheet-updated']){
      const item = {
        key: 'Make Worksheet Updated',
        type: param['worksheet-updated'][0].notification_type_data[0].n_type_disp_message,
        data: param['worksheet-updated'][0].customer_data
      }
      data.push(item);
    }
    if(param['worksheet-updated-eng']){
      const item = {
        key: 'Make English Worksheet Updated',
        type: param['worksheet-updated-eng'][0].notification_type_data[0].n_type_disp_message,
        data: param['worksheet-updated-eng'][0].customer_data
      }
      data.push(item);
    }
    return data
  }

  _toggleModal = () => this.setState({isModalVisible: !this.state.isModalVisible});

  renderItemSection(item){
    
    return(
      <View 
        style={{
          flexDirection: "row", 
          borderBottomWidth: 0.5, 
          borderColor: colors.lightBorderColor,
          paddingVertical: 10,
          paddingHorizontal: 15
        }}
      >
        <View style={{flex: 7}}>
          <Text style={{fontSize: 15}}>{item.cust_fname + " " + item.cust_lname}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{item.cust_addr1 + " " + item.cust_city + ", " + item.cust_state + " " + item.cust_zip}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{item.cust_wed_date}</Text>
        </View>
        <View style = {{flex: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.btnColor, 
              borderRadius: 15, 
              height: 28, 
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}
          >
            <Icon
              name="ios-call"
              type="ionicon"
              size={20}
              color={colors.white}
            />
            <Text style={{marginLeft:5, color: colors.white, fontSize:13}}>CALL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this._toggleModal} 
          >
            <Icon 
              name="dots-three-vertical"
              type="entypo"
              color={colors.fontGrayColor}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <Modal isVisible={this.state.isModalVisible}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.modal}>
                <View style={{height:30,justifyContent: "center", alignItems: "flex-end", paddingTop: 5, paddingRight: 5}}>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Icon
                      type="entypo"
                      name="circle-with-cross"
                      size={20}
                      color={colors.btnColor}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize:22}}>
                      {"TestCustomer Samantha"}
                    </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5}}>
                    <Icon
                      type="entypo"
                      name="location-pin"
                      color={colors.fontGrayColor}
                      size={18}
                    />
                    <Text style={{color: colors.fontGrayColor, marginRight: 13}}>
                      {"Andover MA, 02018"}
                    </Text>
                    <Icon
                      name="calendar-o"
                      type="font-awesome"
                      size={15}
                      color={colors.fontGrayColor}
                    />
                    <Text style={{color: colors.fontGrayColor, marginLeft: 5}}>
                      {"2018-04-09"}
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 3}}>
                      <View style={{flex:1, paddingHorizontal:3}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row', 
                            backgroundColor: "#42b1a8", 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            paddingVertical: 8,
                            borderRadius: 18
                          }}
                        >
                          <Icon
                            name="call"
                            size={20}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5}}>CALL</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:1, paddingHorizontal:3}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row', 
                            backgroundColor: '#84b042', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            paddingVertical: 8,
                            borderRadius: 18
                          }}
                        >
                          <Icon
                            name="sms"
                            size={20}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5}}>SMS</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flex:1, paddingHorizontal:3}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row', 
                            backgroundColor: '#b3a153', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            paddingVertical: 8,
                            borderRadius: 18
                          }}
                        >
                          <Icon
                            name="email"
                            size={20}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5}}>EMAIL</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>Mark New Booking Call Complete</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>Mark Photoshoot Call Complete</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>Schedule Engagement Date</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>View Wedding Worksheet</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>View Engagement Worksheet</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>Request Wedding Pay</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                    >
                      <Text style={{color: colors.white}}>Request Engagement Pay</Text>
                    </TouchableOpacity>
                  </View>
                </View> 
              </View>     
            </View>
        </Modal>
      </View>
    )
    
  }

  renderHeaderSection(section){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, alignItems: "center", borderBottomWidth: 0.5, borderColor: colors.lightBorderColor}}>
        <Text>{section.key}</Text>
        <Text style={{color: colors.yellow, fontSize: 10}}>{section.type}</Text>

      </View>
    )

  }
  

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
    let data = []
    if(this.props.dashReducer.dashboard)
    {
      data = this.getData(this.props.dashReducer.dashboard)
    } else {
      data = []
    }
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <LogoComponent />
          <NavBar handlePress={this.toggleSideMenu} />
          <View style={{height: 65, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: colors.lightBorderColor}}>
            <View style={{borderRightWidth: 0.5, borderColor: colors.lightBorderColor, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['check-in-call'] ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.btnColor,
                  marginLeft: 15
    
                }:{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.fontGrayColor,
                  marginLeft: 15
    
                }}
              >
                <Text style={{color: colors.white, fontSize: 10, textAlign: "center"}}>
                  {
                    this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['check-in-call'] ? this.props.dashReducer.dashboard['check-in-call'][0].customer_data.length : 0
                  }
                </Text>
              </View>
              <View style={{marginTop: -5}}>
                <Icon
                  
                  name="ios-call"
                  type="ionicon"
                  size={23}
                  color={colors.fontGrayColor}
                />
              </View>
              
              <Text style={{fontSize: 10, marginTop: -5}}>Check-in</Text>
              <Text style={{fontSize: 10, marginTop: -2}}>Call</Text>
            </View>
            <View style={{borderRightWidth: 0.5, borderColor: colors.lightBorderColor, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['new-booking'] ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.btnColor,
                  marginLeft: 15
    
                }:{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.fontGrayColor,
                  marginLeft: 15
    
                }}
              >
                <Text style={{color: colors.white, fontSize: 10, textAlign: "center"}}>
                {
                  this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['new-booking'] ? this.props.dashReducer.dashboard['new-booking'][0].customer_data.length : 0
                }
                </Text>
              </View>
              <View style={{marginTop: -5}}>
                <Icon
                  
                  name="ios-call"
                  type="ionicon"
                  size={23}
                  color={colors.fontGrayColor}
                />
              </View>
              
              <Text style={{fontSize: 10, marginTop: -5}}>New Booking</Text>
              <Text style={{fontSize: 10, marginTop: -2}}>Call</Text>
            </View>
            <View style={{borderRightWidth: 0.5, borderColor: colors.lightBorderColor, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['worksheet-updated'] ? {
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.btnColor,
                  marginLeft: 15
    
                }:{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.fontGrayColor,
                  marginLeft: 15
    
                }}
              >
                <Text style={{color: colors.white, fontSize: 10, textAlign: "center"}}>
                  {
                    this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['worksheet-updated'] ? this.props.dashReducer.dashboard['worksheet-updated'][0].customer_data.length : 0
                  }
                </Text>
              </View>
              <View style={{marginTop: -3}}>
                <Icon
                  name="file-text"
                  type="feather"
                  size={20}
                  color={colors.fontGrayColor}
                />
              </View>
              
              <Text style={{fontSize: 10, }}>Wedding</Text>
              <Text style={{fontSize: 10, marginTop: -2}}>Worksheets</Text>
            </View>
            
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['request-payment'] ?{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.btnColor,
                  marginLeft: 15
    
                }:{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height:12, 
                  width: 12, 
                  borderRadius: 6, 
                  backgroundColor: colors.fontGrayColor,
                  marginLeft: 15
    
                }}
              >
                <Text style={{color: colors.white, fontSize: 10, textAlign: "center"}}>
                {
                  this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['request-payment'] ? this.props.dashReducer.dashboard['request-payment'][0].customer_data.length : 0
                }
                </Text>
              </View>
              <View style={{marginTop: -2}}>
                <Icon
                  name="cloud-upload"
                  size={23}
                  color={colors.fontGrayColor}
                />
              </View>
              
              <Text style={{fontSize: 10, marginTop: -5}}>Request</Text>
              <Text style={{fontSize: 10, marginTop: -2}}>Wedding Pay</Text>
            </View>
          </View>
          <View>
            <SectionList 
              renderItem={({item})=>this.renderItemSection(item)}
              renderSectionHeader={({section})=>this.renderHeaderSection(section)}
              sections={data}
            />
          </View>
        </View>
        
      </ SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  modal:{
    width: 0.65*DEVICE_WIDTH, 
    backgroundColor: 'white', 
    height: DEVICE_HEIGHT*0.6,
    borderRadius:5
  }
})


const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  dashReducer: state.dashReducer
})


export default connect(mapStateToProps)(DashBoard)
