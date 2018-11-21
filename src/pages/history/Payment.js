import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'

import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import Menu from '../../components/SideMenu'

import { colors } from '../../settings/constant'
import actions from '../../redux/payment/action';

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
  componentDidMount(){
    if(this.state.flag){
      const param = {
        photog_id: this.props.user.photog_id,
        pay_for: 'Wedding'
      }
      this.props.dispatch(actions.getWeddingPaymentHistory(param));
    }else{
      const param = {
        photog_id: this.props.user.photog_id,
        pay_for: 'Engagement'
      }
      this.props.dispatch(actions.getWeddingPaymentHistory(param));
    }
      
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

  payForClicked = (flag) => {
    this.setState({flag});
    if(flag){
      const param = {
        photog_id: this.props.user.photog_id,
        pay_for: 'Wedding'
      }
      this.props.dispatch(actions.getWeddingPaymentHistory(param));
    }else{
      const param = {
        photog_id: this.props.user.photog_id,
        pay_for: 'Engagement'
      }
      this.props.dispatch(actions.getWeddingPaymentHistory(param));
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => {
    return(
      <View 
        style={{
          flexDirection: "row", 
          borderBottomWidth: 0.5, 
          borderColor: colors.lightBorderColor,
          paddingVertical: 10,
          paddingHorizontal: 15
        }}
      >
        <View style={{flex: 8}}>
          <Text style={{fontSize: 15}}>{item.cust_name}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>First shooter: ${item.first_shooter_total_pay}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>Second shooter: ${item.second_shooter_total_pay}</Text>
        </View>
        <View style = {{flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          
          <Text style={item.pay_status == 'paid' ? {marginLeft:5, color: "#05ff02", fontSize:18} : {marginLeft:5, color: colors.btnColor, fontSize:18}}>
          {item.pay_status.charAt(0).toUpperCase() + item.pay_status.substr(1)}
          </Text>

        </View>
      </View>
    )
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
                onPress={() => this.payForClicked(true)}            
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
                onPress={() => this.payForClicked(false)}

              >
                <Text style={!this.state.flag ? {color: colors.white} : {color: colors.btnColor}} >Engagement</Text>
              </TouchableOpacity>
            </View>
            <Text style = {{marginTop: 5, fontSize: 12}}>Showing last 15 records</Text>

          </View>
          <View>
            <FlatList
              data={this.props.PaymentHistory}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
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
  user: state.authReducer.user,
  PaymentHistory: state.weddingPaymentHistoryReducer.paymenthistory
})

export default connect(mapStateToProps)(Payment)
