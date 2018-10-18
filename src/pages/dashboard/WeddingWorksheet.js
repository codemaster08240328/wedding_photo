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


class WeddingWorksheet extends Component {
  
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
    this.props.dispatch(actions.getWeddingWorksheet(param));
  }
  

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent backbtn {...this.props}/>
        <ScrollView style={{padding: 10}}>
          <View style={{height: 44, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>{this.state.customer.customer_data[0].cust_name} Wedding Worksheet</Text>
          </View>
          <View style={{height: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>Photographer: {this.props.user.photog_name}</Text>
          </View>
          <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 10}}>Wedding Date: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
          <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 10}}>Email: <Text style={{color: '#000'}}>soumikabandon02@yahoo.com</Text></Text>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 35}}>
            <View style={{flex:6}}>
              <Text style={{color: colors.fontGrayColor, fontSize: 14, marginTop: 12}}>Phone: <Text style={{color: '#000'}}>9749945541</Text></Text>
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
            {this.props.wedding_worksheet.package_info ? this.props.wedding_worksheet.package_info.map((item, index)=>{
              <Text>{item}</Text>
            }):''}
          </View>

          <View style={{flex: 1, height: 145, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Wedding Day Info</Text>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 7, paddingLeft: 7}}>
                <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Name: <Text style={{color: '#000'}}>{this.props.wedding_worksheet.wedding_day_info ? this.props.wedding_worksheet.wedding_day_info.cust_fname + this.props.wedding_worksheet.wedding_day_info.cust_finance_lname : ''}</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>
                  Email: <Text style={{color: '#000'}}>{this.props.wedding_worksheet.wedding_day_info ? this.props.wedding_worksheet.wedding_day_info.cust_email : ''}</Text>
                </Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>
                  Phone: <Text style={{color: '#000'}}>{this.props.wedding_worksheet.wedding_day_info ? this.props.wedding_worksheet.wedding_day_info.cust_phone1 : ''}</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Fiance's Name: <Text style={{color: '#000'}}>{this.props.wedding_worksheet.wedding_day_info ? this.props.wedding_worksheet.wedding_day_info.cust_finance_fname + this.props.wedding_worksheet.wedding_day_info.cust_finance_lname : ''}</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Fiance's Phone: <Text style={{color: '#000'}}>{this.props.wedding_worksheet.wedding_day_info ? this.props.wedding_worksheet.wedding_day_info.cust_finance_phone1 : ''}</Text></Text>
              </View>
              <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 9}}>
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
                    marginTop: 5 
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
          </View>

          <View style={{flex: 1, height: 220, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Wedding Day Start Location</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
             
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>(House/hotel for preparation or church/ venue):</Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.wedding_day_start_location ?
                this.props.wedding_worksheet.wedding_day_start_location.venue : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>What time would you like to have your photographer start at the above location? </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.wedding_day_start_location ?
                this.props.wedding_worksheet.wedding_day_start_location.start_time : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Would you like groom preparation photography? If so please tell us where:</Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.wedding_day_start_location ?
                this.props.wedding_worksheet.wedding_day_start_location.groom_preparation : ''
              }
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: colors.btnColor}}>
                <Text style={{color: colors.white}}>Get Start Location Driving Direction</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Ceremony Start Location</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
             
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Ceremony Location:</Text>
              <Text style={{fontSize: 12}}>
                { 
                  this.props.wedding_worksheet.ceremony_start_location ?
                  this.props.wedding_worksheet.ceremony_start_location.venue : ""
                }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>
                Ceremony Start Time: {" "}
                <Text style={{color: '#000'}}>
                  { 
                    this.props.wedding_worksheet.ceremony_start_location ?
                    this.props.wedding_worksheet.ceremony_start_location.start_time : ""
                  }
                </Text>
              </Text>
            </View>
          </View>
          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Reception Start Location</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
             
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Reception Location Name:</Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.reception_start_location ? 
                this.props.wedding_worksheet.reception_start_location.location_name : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Reception Address & Contact Person: </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.reception_start_location ? 
                this.props.wedding_worksheet.reception_start_location.reception_address : '' 
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Start Time (If there is a cocktail hour, use that as start time):</Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.reception_start_location ? 
                this.props.wedding_worksheet.reception_start_location.start_time : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Reception Venue Coordinator's First Name: </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.reception_start_location ? 
                this.props.wedding_worksheet.reception_start_location.reception_contact_firstname : ''
              }
              </Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Reception Venue Coordinator's Email Address: </Text>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.reception_start_location ?
                this.props.wedding_worksheet.reception_start_location.reception_contact_email : ''
              }
              </Text>
              
            </View>
          </View>

          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Customer Special Comments</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 12}}>
              {
                this.props.wedding_worksheet.customer_special_comments
              }  
              </Text>
            </View>
          </View>

          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Special Requests for Preparation Photos</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 12}}>{this.props.wedding_worksheet.special_request_preparation}</Text>
            </View>
          </View>

          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Special Requests for Ceremony Photography</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 12}}>{this.props.wedding_worksheet.special_request_ceremony}</Text>
            </View>
          </View>

          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Special Requests for Family/ Bridal Party Formals</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 12}}>{this.props.wedding_worksheet.special_request_family_bridal}</Text>
            </View>
          </View>

          <View style={{flex: 1, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 10, paddingBottom: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row', paddingHorizontal:8, paddingVertical:9}}>
              <Icon 
                type="font-awesome"
                name="list"
                size={13}
              /> 
              <Text style={{marginLeft: 5, color: colors.fontGrayColor }}>Special Requests for Reception Photography</Text>
            </View>
            <View style={{paddingHorizontal: 7}}>
              <Text style={{fontSize: 12}}>{this.props.wedding_worksheet.special_request_reception}</Text>
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
  weddingWorksheetReducer: state.weddingWorksheetReducer,
  wedding_worksheet: state.weddingWorksheetReducer.wedding_worksheet
})


export default connect(mapStateToProps)(WeddingWorksheet)
