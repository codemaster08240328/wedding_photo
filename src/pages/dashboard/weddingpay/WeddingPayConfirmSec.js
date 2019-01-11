import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { Icon } from 'react-native-elements'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import actions from '../../../redux/payrequest/action'
import LogoComponent from '../../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { colors } from '../../../settings/constant'

const radio_props = [
  { label: '$10 / hour      ', value: 10 },
  { label: '$15 / hour      ', value: 15},
  { label: '$20 / hour      ', value: 20},
  { label: '$25 / hour      ', value: 25},
]
class WeddingPayConfirmSec extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: 10
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    if (this.state.nextBtnVisible){
      const action_param = {
        second_shooter_pay_rate: this.state.value,
        stage: 4
      }
      this.props.dispatch(actions.secondShooterDetail(action_param))
      // console.log("clicked");
      
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.weddingpayreq.stage == 4){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("weddingpaysec", param);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
          nextbtn 
          nextBtnVisible={this.state.nextBtnVisible}
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
          <Text style={{color: colors.fontGrayColor}}>Request Wedding Photoshoot Payment</Text>
        </View>
        <View style={{marginTop: 10, height: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Second Shooter Pay / Hour</Text>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{color: colors.btnColor,fontSize: 12, textAlign: 'center'}}>If you elected Classic Photographers to supply your second shooter, you must select the $25/hour option for their pay. The second shooter was hired under the impression that they will be paid $25/hour. Please be kind to your second shooter!</Text>
        </View>
        <View style = {{paddingHorizontal: 10, marginTop: 15, alignItems: 'center'}}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonSize={10}
            onPress={(value)=>this.setState({value})}
            buttonColor={colors.btnGrayColor}
            selectedButtonColor={colors.btnColor}
            animation={true}
         />
          
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
    flex: 1,
    borderColor: colors.darkBorderColor,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10
  }
})

const mapStateToProps = (state) => ({
  weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq
})

export default connect(mapStateToProps)(WeddingPayConfirmSec)
