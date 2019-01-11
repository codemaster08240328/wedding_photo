import React, { Component } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native'
import Expo from 'expo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'
import call from 'react-native-phone-call'
import SendSMS from 'react-native-sms'
import email from 'react-native-email'
import Toast, {DURATION} from 'react-native-easy-toast'
import * as Helper from '../../helpers/utility'
import LogoComponent from '../../components/LogoComponent'
import Menu from '../../components/SideMenu'
import NavBar from '../../components/NavBar'
import actions from '../../redux/dashboard/action'
import payreqActions from '../../redux/payrequest/action'
import DashHelper from "../../service/dashboard"
import { Notifications} from 'expo'
import { colors } from '../../settings/constant'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'
import Dimensions from 'Dimensions'
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
class DashBoard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data:[],
       isModalVisible: false,
       selectedItem: {},
       cust_id: '',
       odr_id: ''
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.renderHeaderSection = this.renderHeaderSection.bind(this)
    this.renderItemSection = this.renderItemSection.bind(this)
    this.ScheduleEngagement = this.ScheduleEngagement.bind(this)
    this.WeddingWorksheet = this.WeddingWorksheet.bind(this)
    this.EngagementWorksheet = this.EngagementWorksheet.bind(this)
    this.WeddingPayRequest = this.WeddingPayRequest.bind(this)
  }

  componentWillMount = () => {
    Helper.notificationRegister(this.props.user.photog_id);
    this.listener = Notifications.addListener(this.listen)
  }
  componentWillUnmount = () => {
    this.listener && Notifications.removeListener(this.listen)
  }

  listen = ({ origin, data }) => {
    console.log("cool data", origin, data);
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

  WeddingWorksheet = (item) => {
    this._toggleModal(item);  
    const param = {
      customer: item
    }
    this.props.navigation.navigate('weddingworksheet', param);  
  }

  EngagementWorksheet = (item) => {
    this._toggleModal(item);  
    const param = {
      customer: item
    }
    this.props.navigation.navigate('engagementworksheet', param);  
  }

  WeddingPayRequest = (item) => {
    this._toggleModal(item);
    
    console.log('~~~~~~~~`', this.state.selectedItem)
    const api_param = {
      cust_id: this.state.selectedItem.customer_data[0].cust_id,
      odr_id: this.state.selectedItem.order_data[0].odr_id,
      photog_id: this.props.user.photog_id,
      pay_for: 'Wedding'
    }
    this.props.dispatch(payreqActions.requestWeddingPayment(api_param));
    // this.props.navigation.navigate('weddingpay', param);
  }

  EngagementPayRequest = (item) => {
    this._toggleModal(item);
    
    console.log('~~~~~~~~` engagement', this.state.selectedItem)
    const api_param = {
      cust_id: this.state.selectedItem.customer_data[0].cust_id,
      odr_id: this.state.selectedItem.order_data[0].odr_id,
      photog_id: this.props.user.photog_id,
      pay_for: 'Engagement'
    }
    this.props.dispatch(payreqActions.requestEngagementPayment(api_param));
    // const param = {
    //   customer: this.state.selectedItem
    // }
    // this.props.navigation.navigate('engagementPay', param);
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

  pressSMSBtn = async () => {
    const isAvailable = await Expo.SMS.isAvailableAsync()
    console.log(isAvailable)
    if(isAvailable){
      const { result } = await Expo.SMS.sendSMSAsync(['0123456789', '9876543210'], 'My sample HelloWorld message');
    }else{
      alert('This requires your SMS permission');
    }
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
                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <Icon
                        type="entypo"
                        name="location-pin"
                        color={colors.fontGrayColor}
                        size={16}
                      />
                      <Text style={{color: colors.fontGrayColor, marginRight: 13, fontSize: 10}}>
                        {
                          this.state.selectedItem.customer_data ?
                            this.state.selectedItem.customer_data[0].cust_city + " " + this.state.selectedItem.customer_data[0].cust_state + ", " + this.state.selectedItem.customer_data[0].cust_zip : ""
                        }
                      </Text>
                    </View>
                    <View style={{flex: 4, flexDirection: 'row'}}>
                      <Icon
                        name="calendar-o"
                        type="font-awesome"
                        size={12}
                        color={colors.fontGrayColor}
                      />
                      <Text style={{color: colors.fontGrayColor, marginLeft: 5, fontSize: 10}}>
                        {
                          this.state.selectedItem.customer_data ?
                            this.state.selectedItem.customer_data[0].cust_wed_date : ''
                        }
                      </Text>
                    </View>
                  </View>
                  <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 3, paddingVertical: 2}}>
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
                            size={15}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5, fontSize: 12}}>CALL</Text>
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
                            size={15}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5, fontSize: 12}}>SMS</Text>
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
                            size={15}
                            color={colors.white}
                          />
                          <Text style={{color: colors.white, marginLeft: 5, fontSize: 12}}>EMAIL</Text>
                        </TouchableOpacity>
                      </View>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
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
                      <Text style={{color: colors.white, fontSize: 12}}>Mark New Booking Call Complete</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
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
                      <Text style={{color: colors.white, fontSize: 12}}>Mark Photoshoot Call Complete</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
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
                      <Text style={{color: colors.white, fontSize: 12}}>Schedule Engagement Date</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                      onPress={() => this.WeddingWorksheet(this.state.selectedItem)}
                    >
                      <Text style={{color: colors.white, fontSize: 12}}>View Wedding Worksheet</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                      onPress={()=>this.EngagementWorksheet(this.state.selectedItem)}
                    >
                      <Text style={{color: colors.white, fontSize: 12}}>View Engagement Worksheet</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                      onPress={()=>this.WeddingPayRequest(this.state.selectedItem)}
                    >
                      <Text style={{color: colors.white, fontSize: 12}}>Request Wedding Pay</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, paddingHorizontal: 6, paddingVertical: 1}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row', 
                        backgroundColor: colors.btnColor, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        paddingVertical: 8,
                        borderRadius: 18
                      }}
                      onPress={() => this.EngagementPayRequest(this.state.selectedItem)}
                    >
                      <Text style={{color: colors.white, fontSize: 12}}>Request Engagement Pay</Text>
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
          borderColor: colors.lightBorderColor,
          backgroundColor: "white"
        }}
      >
        <Text>{section.key}</Text>
        <Text style={{color: colors.yellow, fontSize: 10}}>{section.type}</Text>

      </View>
    )

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.weddingPaymentRequestReducer.success && (Object.keys(nextProps.weddingpayreq).length == 2)){
      const param = {
        customer: this.state.selectedItem
      }
      this.props.navigation.navigate('weddingpay', param)
    }else if(!!nextProps.weddingPaymentRequestReducer.message){
        this.refs.toast.show(nextProps.weddingPaymentRequestReducer.message, 2000)
    }

    if(nextProps.engagementPaymentRequestReducer.success && (Object.keys(nextProps.engagementPayReq).length == 2)){
      const param = {
        customer: this.state.selectedItem
      }
      this.props.navigation.navigate('engagementPay', param);
    }else if(!!nextProps.engagementPaymentRequestReducer.message){
      this.refs.toast.show(nextProps.engagementPaymentRequestReducer.message, 2000)
    }
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
          <Toast ref = 'toast' />
          <LogoComponent {...this.props} />
          <NavBar handlePress={this.toggleSideMenu} {...this.props} />
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
              contentContainerStyle={{paddingBottom: 80}}
              ListFooterComponent={<View style={{height: 0, marginBottom: 100}}></View>}
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
  dashReducer: state.dashReducer,
  weddingPaymentRequestReducer: state.weddingPaymentRequestReducer,
  weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq,
  engagementPaymentRequestReducer: state.engagementPaymentRequestReducer,
  engagementPayReq: state.engagementPaymentRequestReducer.engagementPayReq
})


export default connect(mapStateToProps)(DashBoard)
