import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native'
import { Icon } from 'react-native-elements'
import LogoComponent from '../../components/LogoComponent'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Notifications} from 'expo';

import{ colors } from '../../settings/constant'
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
class Notification extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      unread_notifications: this.props.dashReducer.dashboard['unread_notifications'] ? this.props.dashReducer.dashboard['unread_notifications'] : [],
      read_notifications: this.props.dashReducer.dashboard['read_notifications'] ? this.props.dashReducer.dashboard['read_notifications'] : []
    }
  }

  _renderRow(item) {
    return (
    <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: colors.darkBorderColor, height: 45, flex:1}}>
      <Icon
        type='evilicon'
        name='question'
        color={ colors.btnGrayColor }
        size={25}
      />
      <Text style={{marginLeft: 10}}>
        { item.n_name }
      </Text>
    </View>
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
              paddingLeft: 15
            }}
          >
            <Text style={{fontWeight:"bold"}}>Unread Notifications</Text>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(this.state.unread_notifications)}
            renderRow={(item)=>this._renderRow(item)}
          />
          <View
            style={{
              height: 25, 
              justifyContent: "center", 
              backgroundColor: colors.headerColor,
              paddingLeft: 15
            }}  
          >
            <Text style={{fontWeight:"bold"}}>Read Notifications</Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <ListView
              dataSource={ds.cloneWithRows(this.state.read_notifications)}
              renderRow={(item)=>this._renderRow(item)}
            />
          </View>
          
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
