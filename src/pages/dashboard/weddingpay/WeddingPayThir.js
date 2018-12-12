import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import LogoComponent from '../../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import actions from '../../../redux/payrequest/action'

import { colors } from '../../../settings/constant'

const items = [

  {
    label: '5',
    value: 5
  },
  {
    label: '6',
    value: 6
  },
  {
    label: '7',
    value: 7
  },
  {
    label: '8',
    value: 8
  },
  {
    label: '9',
    value: 9
  },
  {
    label: '10',
    value: 10
  },
  {
    label: '11',
    value: 11
  },
  {
    label: '12',
    value: 12
  }

]
const items2 = [

  {
    label: '1',
    value: 1
  },
  {
    label: '2',
    value: 2
  },
  {
    label: '3',
    value: 3
  },
  {
    label: '4',
    value: 4
  },
  {
    label: '5',
    value: 5
  }
]

class WeddingPayThir extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nextbtnvisible: true,
      customer: this.props.navigation.getParam('customer'),
      editable: false,
      text1: this.props.weddingpayreq.hours_as_per_contract,
      text2: this.props.weddingpayreq.additional_hours
    
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    if (this.state.nextbtnvisible){
      const action_param = {
        additional_hours: this.state.text2,
        hours_as_per_contract: this.state.text1,
        stage: 6
      }
      this.props.dispatch(actions.secondShooterDetail(action_param))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.weddingpayreq.stage == 6){
      const param = {
        customer: this.state.customer
      }
      this.props.navigation.navigate("weddingpayfour", param);
    }
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
        <View style={{height: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Please confirm total hours for this event</Text>
        </View>
        <View style={{paddingLeft: 10, paddingRight: 20, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.darkBorderColor, borderTopWidth: 1}}>
          <Text style={{fontSize: 17}}>Hours As Per Contract</Text>
          <Text style={{fontSize: 17}}>{this.state.text1}</Text>
        </View>
        <View style={{paddingLeft: 10, paddingRight: 20, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.darkBorderColor, borderTopWidth: 1}}>
          <Text style={{fontSize: 17}}>Additional Hours / Extra Hours</Text>
          <Text style={{fontSize: 17}}>{this.state.text2}</Text>
        </View>
        <View style={{paddingLeft: 10, paddingRight: 20, height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.darkBorderColor, borderTopWidth: 1, borderBottomWidth: 1}}>
          <Text style={{fontSize: 17}}>Total Hours</Text>
          <Text style={{fontSize: 17}}>{parseInt(this.state.text1) + parseInt(this.state.text2)}</Text>
        </View>
        <View style={{marginTop: 20, height: 40, alignItems: 'center'}}>
          <TouchableOpacity 
            onPress={()=>this.setState({editable: !this.state.editable})}
            style={{
              height:30, 
              paddingHorizontal: 10, 
              borderRadius: 15, 
              justifyContent: 'center', 
              backgroundColor: colors.btnGrayColor
            }}
          >
            <Text style={{color: colors.white}}>NO, I NEED TO CHANGE.</Text>
          </TouchableOpacity>
        </View>
        {
          this.state.editable&&
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Text>Hours As Per Contract</Text>
            <RNPickerSelect
              placeholder={{
                label: '4',
                value: 4
              }}
              items={items}
              style={{...pickerSelectStyles}}
              onValueChange={(value)=>this.setState({text1: value})}
            />
            <Text style={{marginTop: 10}}>Additional Hours / Extra Hours</Text>
            <RNPickerSelect
              placeholder={{
                label: '0',
                value: 0
              }}
              items={items2}
              style={{...pickerSelectStyles}}
              onValueChange={(value)=>this.setState({text2: value})}
            />
          </View>
        }
        
        
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});

const mapStateToProps = (state) => ({
  weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq

})

export default connect(mapStateToProps)(WeddingPayThir)
