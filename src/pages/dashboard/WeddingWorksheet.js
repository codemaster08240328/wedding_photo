import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet, 
  ScrollView,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LogoComponent from '../../components/LogoComponent'
import { colors } from '../../settings/constant'
import { Icon } from 'react-native-elements';



class WeddingWorksheet extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent backbtn {...this.props}/>
        <ScrollView style={{padding: 10}}>
          <View style={{height: 44, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>Danyelle Mcelroy Wedding Worksheet</Text>
          </View>
          <View style={{height: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>Photographer: TestPhotog One</Text>
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
            {<Text></Text>}
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
                <Text style={{color: colors.fontGrayColor, fontSize: 12}}>Name: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Email: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Phone: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Fiance's Name: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
                <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Fiance's Phone: <Text style={{color: '#000'}}>07/30/2018</Text></Text>
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
              <Text style={{fontSize: 12}}>Hotel, 253 Newbury Street, Boston MA, 02101</Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>What time would you like to have your photographer start at the above location? </Text>
              <Text style={{fontSize: 12}}>2 pm</Text>
              <Text style={{color: colors.fontGrayColor, fontSize: 12, marginTop: 7}}>Would you like groom preparation photography? If so please tell us where:</Text>
              <Text style={{fontSize: 12}}>Yes</Text>
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
  
})


export default connect(mapStateToProps)(WeddingWorksheet)
