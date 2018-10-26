import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native'
import LogoComponent from '../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import{ colors } from '../../settings/constant'
class Notification extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    console.log(this.props.dashReducer.dashboard['read_notifications'])
  }
  _renderRow(item) {

    return (
    <Text>asdfadfa</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent {...this.props} backbtn />
        <View>
          <View 
            style={{
              height: 25, 
              justifyContent: "center", 
              backgroundColor: colors.headerColor,
              paddingLeft: 10
            }}
          >
            <Text>Unread Notifications</Text>
          </View>
          {this.props.dashReducer.dashboard['unread_notifications']&&
            <ListView
              dataSource={[]}
              renderRow={(item)=>this._renderRow(item)}
            />
          }
          

          <View
            style={{
              height: 25, 
              justifyContent: "center", 
              backgroundColor: colors.headerColor,
              paddingLeft: 10
            }}  
          >
            <Text>Read Notifications</Text>
          </View>
          {
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  }
})

const mapStateToProps = (state) => ({
  dashReducer: state.dashReducer
})


export default connect(mapStateToProps)(Notification)
