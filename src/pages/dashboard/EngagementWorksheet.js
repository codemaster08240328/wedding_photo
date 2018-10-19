import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import actions from '../../redux/dashboard/action';
import LogoComponent from '../../components/LogoComponent'

import { colors } from '../../settings/constant'


class EngagementWorksheet extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      customer: this.props.navigation.getParam('customer')
    }
  }
  

  componentDidMount = () => {
    const param = {
      photog_id: this.props.user.photog_id,
      cust_id: this.state.customer.customer_data[0].cust_id,
      n_id: this.state.customer.customer_data[0].n_id,
      odr_id: this.state.customer.order_data[0].odr_id
    }
    this.props.dispatch(actions.getEngagementWorksheet(param));
  }
  

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent backbtn {...this.props}/>
        <ScrollView style={{padding: 10}}>
          <View style={{height: 44, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>Title</Text>
          </View>
          <View style={{height: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>Photographer: {this.props.user.photog_fname + " " + this.props.user.photog_lname}</Text>
          </View>
          <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 10}}>Wedding Date: <Text style={{color: '#000'}}>{this.state.customer.customer_data[0].cust_wed_date}</Text></Text>
          <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 10}}>Email: <Text style={{color: '#000'}}>{this.state.customer.customer_data[0].cust_email}</Text></Text>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 35}}>
            <View style={{flex:6}}>
              <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 12}}>Phone: <Text style={{color: '#000'}}>{this.state.customer.customer_data[0].cust_phone1}</Text></Text>
            </View>
            <View style={{flex:2, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#42b1a8", 
                  borderRadius: 17.5, 
                  height: 35, 
                  width: 35, 
                  alignItems: "center", 
                  justifyContent: 'center' 
                }}
              >
                <Icon
                  name="call"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#84b042', 
                  borderRadius: 17.5, 
                  height: 35, 
                  width: 35, 
                  alignItems: "center", 
                  justifyContent: 'center', 
                  marginLeft: 15 
                }}
              >
                <Icon
                  name="sms"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>            
          </View>
          <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 10}}>Start Location: <Text style={{color: '#000'}}>Boston MA, 02101</Text></Text>
          <View style={{flex: 1, height: 120, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Package Info</Text>
            </View>
            {this.props.engagement_worksheet.package_info ? this.props.engagement_worksheet.package_info.map((item, index)=>{
              <Text>{item}</Text>
            }):''}
          </View>

          <View style={{flex: 1, paddingBottom: 15, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Customer Requested Engagement Info</Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 7}}>
                <Text style={{color: colors.fontGrayColor, fontSize: 12}}>(Time Frame for Engagement Session): </Text>
                <Text style={{fontSize: 12}}>
                {
                  this.props.engagement_worksheet.customer_requested_engagement_info ? 
                  this.props.engagement_worksheet.customer_requested_engagement_info.eng_timeframe : ''
                }
                </Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>
                  (House/hotel for preparation or church/venue): 
                </Text>
                <Text style={{fontSize: 12}}>
                {
                  this.props.engagement_worksheet.customer_requested_engagement_info ? 
                  this.props.engagement_worksheet.customer_requested_engagement_info.venue : ''
                }
                </Text>
            </View>
          </View>

          <View style={{flex: 1, paddingBottom: 15, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Final Engagement Schedule Info</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
             
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>(Engagement Date):</Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.engagement_worksheet.final_engagement_info ?
                this.props.engagement_worksheet.final_engagement_info.eng_sch_date : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>(Time Frame for Engagement Session): </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.engagement_worksheet.final_engagement_info ?
                this.props.engagement_worksheet.final_engagement_info.eng_sch_timeframe : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>(House/hotel for preparation or church/venue): </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.engagement_worksheet.final_engagement_info ?
                this.props.engagement_worksheet.final_engagement_info.eng_sch_venue : ''
              }
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: colors.btnColor}}>
                <Text style={{color: colors.white}}>Get Start Location Driving Direction</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
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
  user: state.authReducer.user,
  dashReducer: state.dashReducer,
  engagementWorksheetReducer: state.engagementWorksheetReducer,
  engagement_worksheet: state.engagementWorksheetReducer.engagement_worksheet
})


export default connect(mapStateToProps)(EngagementWorksheet)
