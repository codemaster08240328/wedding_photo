import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity 
} from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LogoComponent from '../../components/LogoComponent'
import { colors } from '../../settings/constant';

class Engagement extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       customer: this.props.navigation.getParam('customer')
    }
  }

  
  componentDidMount() {
    
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoComponent backbtn {...this.props}/>
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
          <Text style={{color: colors.fontGrayColor}}>Schedule Engagement Date Form</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 5, paddingHorizontal: 5}}>
            <View style={{height: 50, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>Enter Engagement Info</Text>
            </View>
            <View style={{flex: 1, padding: 5}}>
              <Text style = {{paddingVertical: 5}}>EngagmentDate</Text>
              <TextInput
                style={styles.input}
              />
            </View>
            <View style={{flex: 1, padding: 5}}>
              <Text style={{paddingVertical: 5}}>Photoshoot Timeframe</Text>
              <TextInput
                style={styles.input}
              />
            </View>
            <View style={{flex: 1, padding: 5}}>
              <Text style={{paddingVertical: 5}}>Engagment Venue</Text>
              <TextInput
                style={styles.input}
              />
            </View>
            <View style={{flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity 
                style={{
                  backgroundColor: colors.btnColor,
                  borderRadius: 18,
                  paddingVertical: 10,
                  paddingHorizontal: 20
                }}
              >
                <Text style={{color: colors.white}}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={{flex: 4}}></View>
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


export default connect(mapStateToProps)(Engagement)
