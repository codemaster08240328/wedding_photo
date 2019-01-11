import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Icon, CheckBox } from 'react-native-elements'

import LogoComponent from '../../../components/LogoComponent'

import actions from '../../../redux/payrequest/action'
import { colors } from '../../../settings/constant'

class ConfImageUpload extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: '',
      date: "",
      number: "0",
      checked: false
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    console.log("clicked");
    const action_param = {
      total_images: this.state.number,
      stage: 2
    }
    this.props.dispatch(actions.nextStep(action_param))
    // const param = {
    //   customer: this.state.customer
    // }
    // this.props.navigation.navigate("engInfoConfirm", param)

  }

  componentDidUpdate(prevProps){
    if(this.props.engagementPayReq.stage == 2){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("engInfoConfirm", param)
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
          nextbtn 
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
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Confirm Image Upload</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text>Total no. of images*</Text>
          <TextInput
            style={styles.input}
            value={this.state.number}
            keyboardType="numeric"
            onChangeText={(number) => this.setState({number})}
          />
          <View style={{flex: 2, alignItems: 'center'}}>
            <CheckBox
              iconRight
              checkedColor={colors.btnColor}
              title="I confirm that all engagement images have been uploaded!"
              checked={this.state.checked}
              onPress={() => this.setState({checked: !this.state.checked})}
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

const mapStateToProps = (state) => ({
  // weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq
  engagementPaymentRequestReducer: state.engagementPaymentRequestReducer,
  engagementPayReq: state.engagementPaymentRequestReducer.engagementPayReq
})

export default connect(mapStateToProps)(ConfImageUpload)
