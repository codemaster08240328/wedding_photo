import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import actions from '../../../redux/payrequest/action'

import LogoComponent from '../../../components/LogoComponent'
import { colors } from '../../../settings/constant'
const weddingpayreq = {
  pay_date: "12-12-2018",
  hours_as_per_contract: 8,
  additional_hours: 2,
  first_shooter_total_pay: 440,
  first_shooter_additional_pay_amt: 110,
  first_shooter_travel_pay_amt: 10.25,
  if_second_shooter: "yes",
  second_shooter_name: 'John Smith',
  second_shooter_email: 'johnsmith@mail.com',
  second_shooter_paid_by: 'classic',
  second_shooter_pay_rate: 20,
  second_shooter_total_pay: 140,
  second_shooter_additional_pay_amt: 40
}

class WeddingPayConfirmFinal extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
      nextBtnVisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: 10,
      listData: []
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  componentDidMount() {
    // const { weddingpayreq } = this.props
    let listData = []
    for(let key in this.props.weddingpayres){
      let obj = {}
      switch(key){
        case 'pay_date':
          obj = Object.assign({}, 
            {
              key: "Payment Request Date",
              value: weddingpayreq['pay_date']
            }
          );
          listData.push(obj)
          break;
        case 'hours_as_per_contract':
          obj = Object.assign({}, 
            {
              key: "Hours As Per Contract",
              value: weddingpayreq['hours_as_per_contract']
            }
          );
          listData.push(obj)
          break;
        case 'additional_hours':
          obj = Object.assign({},
            { 
              key: "Additional Hours", 
              value: weddingpayreq['additional_hours']
            }
          );
          listData.push(obj)        
          break;
        case 'first_shooter_total_pay':
          obj = Object.assign({},
            {
              key: "First Shooter Total Pay", 
              value: '$ ' + weddingpayreq['first_shooter_total_pay']
            }
          );
          listData.push(obj)
          break;
        case 'first_shooter_additional_pay_amt':
          obj = Object.assign({},
            {
              key: "First Shooter Additional / Extra Pay", 
              value: '$ ' + weddingpayreq['first_shooter_additional_pay_amt']
            }
          );
          listData.push(obj)
          break;
        case 'first_shooter_travel_pay_amt':
          obj = Object.assign({},
            {
              key: "First Shooter Travel Fees", 
              value: '$ ' + weddingpayreq['first_shooter_travel_pay_amt']
            }
          );
          listData.push(obj)
          break;
        case 'if_second_shooter':
          obj = Object.assign({},
            {
              key: "Second Shooter?", 
              value: weddingpayreq['if_second_shooter']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_name':
          obj = Object.assign({},
            {
              key: "Second Shooter Name", 
              value: weddingpayreq['second_shooter_name']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_email':
          obj = Object.assign({},
            {
              key: "Second Shooter Email", 
              value: weddingpayreq['second_shooter_email']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_paid_by':
          obj = Object.assign({},
            {
              key: "Second Shooter Paid By", 
              value: weddingpayreq['second_shooter_paid_by']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_pay_rate':
          obj = Object.assign({},
            {
              key: "Second Shooter Pay Rate", 
              value: '$ ' + weddingpayreq['second_shooter_pay_rate'] + ' / hour'
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_total_pay':
          obj = Object.assign({},
            {
              key: "Second Shooter Total Pay", 
              value: '$ ' + weddingpayreq['second_shooter_total_pay']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_additional_pay_amt':
          obj = Object.assign({},
            {
              key: "Second Shooter Additional / Extra Pay", 
              value: '$ ' + weddingpayreq['second_shooter_additional_pay_amt']
            }
          );
          listData.push(obj)
          break;
        default:
          break;
      }
      
      
    }
    this.setState({listData: listData})

    console.log('listData', this.state.listData)
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

  confirm = () => {
    this.props.navigation.navigate("dashboard")
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent 
          backbtn 
          {...this.props} 
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
        <View style={{marginTop: 10, height: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}}>
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Payment Request</Text>
        </View>
        <View style={{paddingHorizontal: 10, marginTop: 5}}>
          <Text style={{color: colors.btnColor,fontSize: 12, textAlign: 'center'}}>
            Your payment will process in 7 to 14 days, please check your payable.com account for payment status updates.
          </Text>
        </View>
        <View style = {{marginTop: 5}}>
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
        <View style={{alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity
            style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, backgroundColor: colors.btnColor}}
            onPress={()=>this.confirm()}
          >
            <Text style={{color: colors.white}}>Confirm</Text>
          </TouchableOpacity>
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
  weddingpayreq: state.weddingPaymentRequestReducer.weddingpayreq,
  user: state.authReducer.user,
  weddingpayres: state.weddingPayResultReducer.weddingpayres,
})

export default connect(mapStateToProps)(WeddingPayConfirmFinal)
