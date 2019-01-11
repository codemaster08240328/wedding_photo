import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'

import LogoComponent from '../../../components/LogoComponent'

import actions from '../../../redux/payrequest/action'
import { colors } from '../../../settings/constant'

class ConfirmInfo extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: '',
      date: "",
      number: "0",
      checked: false,
      listData: []
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  componentDidMount() {
    const { engagementPayReq } = this.props
    let listData = []
    for(let key in this.props.engagementPayReq){
      let obj = {}
      switch(key){
        case 'engagement_date':
          obj = Object.assign({}, 
            {
              key: "Engagement Session Date",
              value: engagementPayReq['engagement_date']
            }
          );
          listData.push(obj)
          break;
        case 'hours_as_per_contract':
          obj = Object.assign({}, 
            {
              key: "Hours As Per Contract",
              value: engagementPayReq['hours_as_per_contract']
            }
          );
          listData.push(obj)
          break;
        case 'total_images':
          obj = Object.assign({},
            { 
              key: "Total Images Uploaded", 
              value: engagementPayReq['total_images']
            }
          );
          listData.push(obj)        
          break;
        case 'travel_fees':
          obj = Object.assign({},
            {
              key: "Travel Fees", 
              value: '$ ' + engagementPayReq['travel_fees']
            }
          );
          listData.push(obj)
          break;
        default:
          break;
      }
      
      
    }
    this.setState({listData})
  }

  submit = () => {
    const param = Object.assign({}, this.props.weddingpayreq, {
      photog_id: this.props.user.photog_id,
      odr_id: this.state.customer.order_data[0].odr_id,
      cust_id: this.state.customer.customer_data[0].cust_id,
      pay_for: "Engagement"
    })
    console.log('param', param)
    this.props.dispatch(actions.requestWeddingPay(param))
  }

  nextBtnClicked = () => {
    // console.log("clicked");
    // const action_param = {
    //   if_second_shooter: this.state.value == 0 ? 'yes' : 'no',
    //   stage: 1
    // }
    // this.props.dispatch(actions.ifSecondShooter(action_param))
    const param = {
      customer: this.state.customer
    }
    this.props.navigation.navigate("weddingpaysec", param)

  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.weddingpayreq.if_second_shooter != this.props.weddingpayreq.if_second_shooter){
  //     if(!!this.props.weddingpayreq.if_second_shooter ){
  //       const param = {
  //         customer: this.state.customer
  //       }
  //       this.state.value == 0 ? 
  //         this.props.navigation.navigate("weddingpayconfirm", param)
  //         : this.props.navigation.navigate("weddingpaysec", param)
  //     }
  //   }
  // }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
          nextBtnVisible={this.state.checked ? true : false}
          nextBtnClicked={ () => this.nextBtnClicked()}
        />
        <View style={{height:60, padding: 5}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize:22}}>
              {
                this.state.customer.customer_data ?
                  this.state.customer.customer_data[0].cust_fname + " " + this.state.customer.customer_data[0].cust_lname : ""
              }
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5}}>
            <Icon
              type="entypo"
              name="location-pin"
              color={colors.fontGrayColor}
              size={18}
            />
            <Text style={{color: colors.fontGrayColor, marginRight: 13}}>
              {
                this.state.customer.customer_data ?
                  this.state.customer.customer_data[0].cust_city + " " + this.state.customer.customer_data[0].cust_state + ", " + this.state.customer.customer_data[0].cust_zip : ""
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
                this.state.customer.customer_data ?
                  this.state.customer.customer_data[0].cust_wed_date : ''
              }
            </Text>
          </View>
        </View>
        <View 
          style={{
            height:30, 
            backgroundColor: colors.lightBorderColor,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{color: colors.fontGrayColor}}>Request Engagement Photoshoot Payment</Text>
        </View>
        <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Review & Submit for Payment</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View style={{flex: 1}}>
            <FlatList
              data={this.state.listData}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={({item, index}) => (
                <View style={[{paddingHorizontal: 10, flexDirection: 'row', height: 25}, index % 2 == 0 ? {backgroundColor: colors.lightBorderColor} : {backgroundColor: 'white'}]}>
                  <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{fontSize: 12}}>{item.key}</Text>
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 12}}>{item.value}</Text>
                  </View>
                </View>
              )}
            />
          </View>
          <View style={{flex: 3}}>
            <Text style={{color: colors.btnColor}}>
              Please review all data on payment form. Please don't submit this form unless
              All information provided is 100% correct and accurate!!!
              So often people get paid the incorrect amount ant then get frustrated with us when the error was on their part.
              The data from this form gets sent directly to Payable and the editing staff. Incorrect data can also result in a delay 
              in the bridge getting her images, and none of us want that :). Thank you for your careful attention to this matter. 
              The goal is to have everything run as smooth as possible. 
            </Text>
            <View style={{alignItems: "center"}}>
              <TouchableOpacity style={{marginTop: 10, height: 30, paddingHorizontal: 20, justifyContent: 'center', backgroundColor: colors.btnColor, borderRadius: 18}}>
                <Text style={{color: colors.white, fontSize: 16}}>REQUEST PAYMENT</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  input: {
    borderColor: colors.darkBorderColor,
    borderWidth: 1,
    paddingLeft: 5,
    height: 30,
    marginTop: 5
  }
})

const mapStateToProps = (state) => ({
  // weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq
  user: state.authReducer.user,
  engagementPayReq: state.engagementPaymentRequestReducer.engagementPayReq
})

export default connect(mapStateToProps)(ConfirmInfo)
