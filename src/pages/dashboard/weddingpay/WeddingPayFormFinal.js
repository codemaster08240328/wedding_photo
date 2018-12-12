import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import actions from '../../../redux/payrequest/action'

import LogoComponent from '../../../components/LogoComponent'
import { colors } from '../../../settings/constant'
class WeddingPayFormFinal extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
      nextbtnvisible: true,
      customer: this.props.navigation.getParam('customer'),
      value: 10,
      listData: []
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  componentDidMount() {
    const { weddingpayreq } = this.props
    let listData = []
    for(let key in weddingpayreq){
      let obj = {}
      switch(key){
        case 'if_second_shooter':
          obj = Object.assign({}, 
            {
              key: "Was there a second shooter?",
              value: weddingpayreq['if_second_shooter']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_paid_by':
          obj = Object.assign({}, 
            {
              key: "Second Shooter paid by",
              value: weddingpayreq['second_shooter_paid_by']
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
        case 'second_shooter_pay_rate':
          obj = Object.assign({},
            {
              key: "Second Shooter Pay / Hour", 
              value: '$ ' + weddingpayreq['second_shooter_pay_rate']
            }
          );
          listData.push(obj)
          break;
        case 'hours_as_per_contract':
          obj = Object.assign({},
            {
              key: "Contracted Hours", 
              value: weddingpayreq['hours_as_per_contract'] + ' Hours'
            }
          );
          listData.push(obj)
          break;
        case 'additional_hours':
          obj = Object.assign({},
            {
              key: "Extra Hours", 
              value: weddingpayreq['additional_hours'] + ' Hours'
            }
          );
          listData.push(obj)
          break;
        case 'first_shooter_images':
          obj = Object.assign({},
            {
              key: "Primary Shooter Image Count", 
              value: weddingpayreq['first_shooter_images']
            }
          );
          listData.push(obj)
          break;
        case 'second_shooter_images':
          obj = Object.assign({},
            {
              key: "Second Shooter Image Count", 
              value: weddingpayreq['second_shooter_images']
            }
          );
          listData.push(obj)
          break;
        case 'total_images':
          obj = Object.assign({},
            {
              key: "Total Image Count", 
              value: weddingpayreq['total_images']
            }
          );
          listData.push(obj)
          break;
        case 'travel_fees':
          obj = Object.assign({},
            {
              key: "First Shooter Travel Pay", 
              value: '$ ' + weddingpayreq['travel_fees']
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
    if (this.state.nextbtnvisible){
      const action_param = {
        second_shooter_pay_rate: this.state.value,
        stage: 4
      }
      this.props.dispatch(actions.secondShooterDetail(action_param))
      // console.log("clicked");
      
    }
  }

  submit = () => {
    const param = Object.assign({}, this.props.weddingpayreq, {
      photog_id: this.props.user.photog_id,
      odr_id: this.state.customer.order_data[0].odr_id,
      cust_id: this.state.customer.customer_data[0].cust_id,
      pay_for: "Wedding"
    })
    console.log('param', param)
    this.props.dispatch(actions.requestWeddingPay(param))
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
          <Text style={{fontSize: 17, textAlign: 'center', fontWeight: 'bold'}}>Review & Submit For Payment</Text>
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
        <View style={{paddingHorizontal: 10, marginTop: 5}}>
          <Text style={{color: colors.btnColor,fontSize: 12, textAlign: 'center'}}>
            Please review all data on the payment form. Please do not submit this form unless All information provided is 100% correct and accurate!!! So often people get paid the incorrect amount and then get frustrated with us when the error was on their part. The data from this form gets sent directly to Payable and the editing staff. Incorrect data can also result in a delay in the bride getting her images, and non of us want that :) Thank you for your careful attention to this matter. The goal is to have everything run as smooth as possible.
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: 0, height: 40, flexDirection: 'row', width: '100%'}}>
          <TouchableOpacity
            onPress={() => this.submit()}
            style={{flex: 1, backgroundColor: colors.btnColor, justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white'}}>Submit</Text></TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('weddingpay')}
            style={{flex: 1, backgroundColor: '#e5404a', justifyContent: 'center', alignItems: 'center'}}><Text style={{color: 'white'}}>Edit</Text></TouchableOpacity>
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

})

export default connect(mapStateToProps)(WeddingPayFormFinal)
