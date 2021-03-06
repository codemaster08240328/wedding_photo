import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Icon, CheckBox } from 'react-native-elements'
import LogoComponent from '../../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../redux/payrequest/action'


import { colors } from '../../../settings/constant'

const radio_props_f = [
  { label: 'YES', value: 1 },
]
const radio_props_s = [
  { label: 'YES', value: 1 },
]
class WeddingPayFour extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      editable: false,
      text1: 0,
      text2: 0,
      checked: true
    
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    if (this.state.nextBtnVisible){
      console.log("clicked");
      const action_param = {
        first_shooter_images: this.state.text1,
        second_shooter_images: this.state.text2,
        total_images: parseInt(this.state.text1) + parseInt(this.state.text2),
        second_shooter_images_uploaded: this.state.checked ? "yes" : "no",
        stage: 7
      }
      this.props.dispatch(actions.secondShooterDetail(action_param))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.weddingpayreq.stage == 7){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("weddingpayformfinal", param);
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
        <View style={{height: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Confirm Image Uploads</Text>
        </View>
        <View style={{paddingHorizontal:10}}>
          <Text style={{marginTop: 10}}>No. of images Primary Photographer shot*</Text>
          <TextInput
            style={{
              marginTop: 5,
              borderColor: colors.darkBorderColor,
              borderWidth: 1,
              borderRadius: 3,
              padding:5,
              width: '60%',
              fontSize: 15
            }}
            onChangeText={(text1) => this.setState({text1})}
            value={this.state.text1 + ''}
          />
          <Text style={{marginTop: 10}}>No. of images Second Photographer shot*</Text>
          <TextInput
            style={{
              marginTop: 5,
              borderColor: colors.darkBorderColor,
              borderWidth: 1,
              borderRadius: 3,
              padding:5,
              width: '60%',
              fontSize: 15
            }}
            onChangeText={(text2) => this.setState({text2})}
            value={this.state.text2 + ''}
          />
          <Text style={{marginTop: 10}}>Total no. of images*</Text>
          <TextInput
            style={{
              marginTop: 5,
              borderColor: colors.darkBorderColor,
              borderWidth: 1,
              borderRadius: 3,
              padding:5,
              width: '60%',
              fontSize: 15
            }}
            value={parseInt(this.state.text1) + parseInt(this.state.text2) + ""}
          />
        </View>
        {/* <View style={{flexDirection: 'row', paddingHorizontal: 10, marginTop: 30}}>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <Text>I have submitted a "So Tell Us" video review and I'm submitting for my $25 Bonus!</Text>
          </View>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <RadioForm
              radio_props={radio_props_f}
              initial={1}
              buttonSize={10}
              onPress={(value)=>{this.setState({value: value})}}
              buttonColor={colors.btnGrayColor}
              selectedButtonColor={colors.btnColor}
              formHorizontal={true}
            />
          </View>
        </View> */}
        <View style={{flexDirection: 'row', paddingHorizontal: 10, marginTop: 30}}>
          <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <CheckBox
              iconRight
              checkedColor={colors.btnColor}
              title="I confirm that all first and second shooter images(if applicable) have been uploaded!"
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

export default connect(mapStateToProps)(WeddingPayFour)
