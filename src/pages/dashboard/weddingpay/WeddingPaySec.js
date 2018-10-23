import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import { Icon } from 'react-native-elements'
import LogoComponent from '../../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { colors } from '../../../settings/constant'
class WeddingPaySec extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      nextbtnvisible: true,
      customer: this.props.navigation.getParam('customer')
    }
    this.nextBtnClicked = this.nextBtnClicked.bind(this)
  }

  nextBtnClicked = () => {
    if (this.state.nextbtnvisible){
      console.log("clicked");
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
        <View style={{marginTop: 10, height: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Where there extra hours added at the day of the event?</Text>
        </View>
        <View style={{paddingHorizontal: 15}}>
          <Text style={{color: colors.btnColor, textAlign: 'center'}}>(Select this option only if this event had extra hours beyond contracted hours)</Text>
        </View>
        <View>
          <Picker
            selectedValue = {this.state.selected}
            onValueChange = {(itemValue, itemIndex)=>this.setState({selected: itemValue})}
          >
            <Picker.Item label="No Additional hours were added" value="nothing"/>
            <Picker.Item label="1 Additional Hour" value="1 hour"/>
            <Picker.Item label="2 Additional Hours" value="2 hours"/>
            <Picker.Item label="3 Additional Hours" value="3 hours"/>
            <Picker.Item label="4 Additional Hours" value="4 hours"/>
            <Picker.Item label="5 Additional Hours" value="5 hours"/>

          </Picker>
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

export default connect(mapStateToProps)(WeddingPaySec)
