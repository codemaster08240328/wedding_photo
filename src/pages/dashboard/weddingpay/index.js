import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import LogoComponent from '../../../components/LogoComponent'

import { colors } from '../../../settings/constant'

const radio_props = [
  { label: 'YES       ', value: 0 },
  { label: 'NO', value: 1}
]
class WeddingPay extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      nextbtnvisible: true,
      customer: this.props.navigation.getParam('customer')
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    console.log("clicked");
    const param = {
      customer: this.state.customer
    }
    this.props.navigation.navigate("weddingpaysec", param);

  }
  

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
          nextbtn 
          nextbtnvisible={this.state.nextbtnvisible}
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
        <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>Was there a Second Shooter?</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value)=>{this.setState({value: value})}}
            buttonColor={colors.btnColor}
            selectedButtonColor={colors.btnColor}
            formHorizontal={true}
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
  
})

export default connect(mapStateToProps)(WeddingPay)
