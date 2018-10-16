import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'
import call from 'react-native-phone-call'
import SendSMS from 'react-native-sms'
import email from 'react-native-email'
import LogoComponent from '../../components/LogoComponent';
import Menu from '../../components/SideMenu'
import NavBar from '../../components/NavBar';
import actions from '../../redux/dashboard/action';
import DashHelper from "../../service/dashboard";

import { colors } from '../../settings/constant'
import { Icon, ListItem, Button } from 'react-native-elements';
import Modal from 'react-native-modal'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class DashBoard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data:[],
       isModalVisible: false,
       selectedItem: {}
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.renderHeaderSection = this.renderHeaderSection.bind(this)
    this.renderItemSection = this.renderItemSection.bind(this)
    this.ScheduleEngagement = this.ScheduleEngagement.bind(this)
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
        data: param['check-in-call']
      }
      data.push(item);
    }
    if(param['new-booking']){
      const item = {
        key: 'Make New Booking',
        type: param['new-booking'][0].notification_type_data[0].n_type_disp_message,
        data: param['new-booking']
      }
      data.push(item);
    }
    if(param['request-payment']){
      const item = {
        key: 'Make request payment',
        type: param['request-payment'][0].notification_type_data[0].n_type_disp_message,
        data: param['request-payment']
      }
      data.push(item);
    }
    if(param['request-payment-eng']){
      const item = {
        key: 'Make English Request Payment',
        type: param['request-payment-eng'][0].notification_type_data[0].n_type_disp_message,
        data: param['request-payment-eng']
      }
      data.push(item);
    } 
    if(param['review-contract']){
      const item = {
        key: 'Make review contract',
        type: param['review-contract'][0].notification_type_data[0].n_type_disp_message,
        data: param['review-contract']
      }
      data.push(item);
    }
    if(param['worksheet-updated']){
      const item = {
        key: 'Make Worksheet Updated',
        type: param['worksheet-updated'][0].notification_type_data[0].n_type_disp_message,
        data: param['worksheet-updated']
      }
      data.push(item);
    }
    if(param['worksheet-updated-eng']){
      const item = {
        key: 'Make English Worksheet Updated',
        type: param['worksheet-updated-eng'][0].notification_type_data[0].n_type_disp_message,
        data: param['worksheet-updated-eng']
      }
      data.push(item);
    }
    return data
  }

  _toggleModal = (item) => {
    this.setState({selectedItem: item});
    this.setState({isModalVisible: !this.state.isModalVisible});
  } 
  
  MarkNewBookingCallingComplete = (item) => {
    console.log(item);
    const param = {
      photog_id: this.props.user.photog_id,
      cust_id: item.customer_data[0].cust_id,
      n_id: item.customer_data[0].n_id,
      odr_id: item.order_data[0].odr_id
    }
    const param_get= {
      photog_id: this.props.user.photog_id
    }
    
    DashHelper.markNewBookingCallComplete(param, () => {
      this._toggleModal(this.state.selectedItem);
      this.props.dispatch(actions.getDashboard(param_get))
    });
  }

  MarkPhotoShootCallComplete = (item) => {
    const param = {
      photog_id: this.props.user.photog_id,
      cust_id: item.customer_data[0].cust_id,
      n_id: item.customer_data[0].n_id,
      odr_id: item.order_data[0].odr_id
    }

    const param_get= {
      photog_id: this.props.user.photog_id
    }
    
    DashHelper.markPhotoshootCallComplete(param, () => {
      this._toggleModal(this.state.selectedItem);
      this.props.dispatch(actions.getDashboard(param_get))
    });
  }

  ScheduleEngagement = (item) => {
    this._toggleModal(item);  
    const param = {
      customer: item
    }
    this.props.navigation.navigate('engagement', param);  
  }

  pressEmailBtn = () => {
    const to = ['tiaan@email.com', 'foo@bar.com']
    email(to, {
      cc: ['bazzy@moo.com', 'dooo@daaa.com'],
      bcc: 'mee@mee.com',
      subject: 'Show how to use',
      body: 'Some body right here'
    }).catch(console.error)
  }

  pressCallBtn = () => {
    const args = {
      number: '+79858361090',
      prompt: false
    }
    call(args).catch(console.error);
  }

  pressSMSBtn = () => {
    console.log('sms button clicked')
    SendSMS.send({
      body: 'The default body of the SMS!',
      recipients: ['123123123', '234234234'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + 'cancelled: '+ cancelled);
    })
  }

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
          <Text style={{fontSize: 15}}>{item.customer_data[0].cust_fname + " " + item.customer_data[0].cust_lname}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{item.customer_data[0].cust_addr1 + " " + item.customer_data[0].cust_city + ", " + item.customer_data[0].cust_state + " " + item.customer_data[0].cust_zip}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{item.customer_data[0].cust_wed_date}</Text>
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
            onPress={() => this._toggleModal(item)} 
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
                  <TouchableOpacity onPress={()=>this._toggleModal(this.state.selectedItem)}>
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
                      {
                        this.state.selectedItem.customer_data ?
                          this.state.selectedItem.customer_data[0].cust_fname + " " + this.state.selectedItem.customer_data[0].cust_lname : ""
                      }
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
                      {
                        this.state.selectedItem.customer_data ?
                          this.state.selectedItem.customer_data[0].cust_city + " " + this.state.selectedItem.customer_data[0].cust_state + ", " + this.state.selectedItem.customer_data[0].cust_zip : ""
                      }
                    </Text>
                    <Icon
                      name="calendar-o"
                      type="font-awesome"
                      size={15}
                      color={colors.fontGrayColor}
                    />
                    <Text style={{color: colors.fontGrayColor, marginLeft: 5}}>
                      {
                        this.state.selectedItem.customer_data ?
                          this.state.selectedItem.customer_data[0].cust_wed_date : ''
                      }
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
                          onPress={()=>this.pressCallBtn()}
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
                          onPress={() => this.pressSMSBtn()}
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
                          onPress={()=>this.pressEmailBtn()}
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
                      onPress={() => this.MarkNewBookingCallingComplete(this.state.selectedItem)}
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
                      onPress={() => this.MarkPhotoShootCallComplete(this.state.selectedItem)}
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
                      onPress={() => this.ScheduleEngagement(this.state.selectedItem)}
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
      <View 
        style={{
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          paddingHorizontal: 15, 
          paddingVertical: 10, 
          alignItems: "center", 
          borderBottomWidth: 0.5, 
          borderColor: colors.lightBorderColor
        }}
      >
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
          <LogoComponent {...this.props} />
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
                    this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['check-in-call'] ? 
                      this.props.dashReducer.dashboard['check-in-call'].length : 0
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
                  this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['new-booking'] ? 
                    this.props.dashReducer.dashboard['new-booking'].length : 0
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
                    this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['worksheet-updated'] ? 
                      this.props.dashReducer.dashboard['worksheet-updated'].length : 0
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
                style={this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['request-payment'] ? {
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
                  this.props.dashReducer.dashboard && this.props.dashReducer.dashboard['request-payment'] ? 
                    this.props.dashReducer.dashboard['request-payment'].length : 0
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
