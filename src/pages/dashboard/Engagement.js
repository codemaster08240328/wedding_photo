import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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
  
})


export default connect(mapStateToProps)(Engagement)
