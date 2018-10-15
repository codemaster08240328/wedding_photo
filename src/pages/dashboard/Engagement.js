import React, { Component } from 'react'
import { 
  View, 
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity 
} from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LogoComponent from '../../components/LogoComponent'
import { colors } from '../../settings/constant';

class Engagement extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent backbtn />
        <View style={{height:60}}></View>
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
          <View style={{flex: 6}}>
            <View style={{flex: 1, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
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
                  borderRadius: 17,
                  padding: 10
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
