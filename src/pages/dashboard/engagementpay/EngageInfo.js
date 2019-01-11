import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'

import LogoComponent from '../../../components/LogoComponent'

import actions from '../../../redux/payrequest/action'
import { colors } from '../../../settings/constant'

class EngageInfo extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: '',
      date: "",
      fee: this.props.engagementPayReq['travel_fees'] + ""
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    console.log("clicked");
    const action_param = {
      engagement_date: this.state.date,
      travel_fees: this.state.fee,
      stage: 1
    }
    this.props.dispatch(actions.nextStep(action_param))
    // const param = {
    //   customer: this.state.customer
    // }
    // this.props.navigation.navigate("imgUpload", param)

  }

  componentDidUpdate(prevProps){
    if(this.props.engagementPayReq.stage == 1){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("imgUpload", param)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
          nextbtn 
          nextBtnVisible={!!this.state.date ? true : false}
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
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Enter Engagement Info</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <View>
            <Text>Engagement Date</Text>
            <DatePicker
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="MM/DD/YYYY"
              minDate="12/31/2017"
              maxDate="01/01/2030"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              style={{
                width: '100%',
                marginTop: 5
              }}
              customStyles={{ ...customStyle }}
              onDateChange={(date) => this.setState({date})}
            />
            <Text style={{marginTop: 10}}>Travel Fees</Text>
            <TextInput
              style={styles.input}
              value={this.state.fee}
              keyboardType="numeric"
              onChangeText={(fee) => this.setState({fee})}
            />
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

const customStyle = StyleSheet.create({
  dateInput: {
    flex: 1,
    height: 30,
    paddingLeft: 5,
    borderColor: colors.darkBorderColor,
    alignItems: 'flex-start'
  },
  dateIcon: {
    display: "none"
  }
})

const mapStateToProps = (state) => ({
  engagementPaymentRequestReducer: state.engagementPaymentRequestReducer,
  engagementPayReq: state.engagementPaymentRequestReducer.engagementPayReq
})

export default connect(mapStateToProps)(EngageInfo)
