import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'

import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import Menu from '../../components/SideMenu'

import { colors } from '../../settings/constant'

class Payment extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
       isOpen: false,
       flag: true //true: wedding, false: engagement
    }

    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  onMenuItemSelected(item){
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
    this.props.navigation.navigate(item);
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <LogoComponent {...this.props} />
          <NavBar handlePress={this.toggleSideMenu} {...this.props} />
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{fontSize: 15}} >Payments History</Text>
            <View 
              style={{
                marginTop: 5,
                flexDirection:'row'
              }}
            >
              <TouchableOpacity 
                style={[{
                  borderColor: colors.btnColor,
                  borderWidth: 1,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  width: 120,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                }, this.state.flag && {backgroundColor: colors.btnColor}]}
              >
                <Text 
                  style={this.state.flag ? {color: colors.white} : {color: colors.btnColor}}
                >
                  Wedding
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{
                  borderColor: colors.btnColor,
                  borderWidth: 1,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  width: 120,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center'

                }, !this.state.flag && {backgroundColor: colors.btnColor}]}
              >
                <Text style={!this.state.flag ? {color: colors.white} : {color: colors.btnColor}} >Engagement</Text>
              </TouchableOpacity>
            </View>
            <Text style = {{marginTop: 5, fontSize: 12}}>Showing last 15 records</Text>

          </View>
        </View>
      </SideMenu>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  body: {
    flex: 1
  }
  
})
const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(Payment)
