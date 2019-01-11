import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import _ from 'lodash' 
import actions from '../../../redux/payrequest/action'
import LogoComponent from '../../../components/LogoComponent'

import { colors } from '../../../settings/constant'

class WeddingPayConfirmOne extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      name: '',
      email: ''
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    if (this.state.nextBtnVisible){
      console.log("clicked");
      const action_param = {
        second_shooter_name: this.state.name,
        second_shooter_email: this.state.email,
        stage: 3
      }
      this.props.dispatch(actions.secondShooterDetail(action_param))
      
    }
  }

  componentDidUpdate(prevState, prevProps){
    if(this.props.weddingpayreq.stage==3){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("weddingpayconfirmsec", param);
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
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Enter Second Shooter Details</Text>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{color: colors.btnColor,fontSize: 12, textAlign: 'center'}}>
            Please be sure you are inputting the valid, accurate, and correct spelling of your second shooter's name and e-mail address. This is crucial to ensure your second (and you) get paid on time! If you don't know this information, ASK!
          </Text>
        </View>
        <View style = {{paddingHorizontal: 10, marginTop: 15}}>
          <Text style={{marginTop: 10}}>Second Shooter Name</Text>
          <TextInput
            onChangeText={(name) => this.setState({name})}
            style={{
              marginTop: 5,
              borderColor: colors.darkBorderColor,
              borderWidth: 1,
              borderRadius: 3,
              padding:5,
              width: '100%',
              fontSize: 15
            }}
          />
          <Text style={{marginTop: 20}}>Second Shooter Email</Text>
          <TextInput
            onChangeText={(email) => this.setState({email})}
            style={{
              marginTop: 5,
              borderColor: colors.darkBorderColor,
              borderWidth: 1,
              borderRadius: 3,
              padding:5,
              width: '100%',
              fontSize: 15
            }}
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

export default connect(mapStateToProps)(WeddingPayConfirmOne)
