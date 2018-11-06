import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ListView } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'
import Menu from '../../components/SideMenu'
import { Icon } from 'react-native-elements'
import actions from '../../redux/dashboard/action'

import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import { colors } from '../../settings/constant'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class Search extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       text:'',
       searchResult: false,
       order:[]
    }
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  componentWillReceiveProps(nextProps){
    console.log("~~~~~~~~~`",nextProps)
    if( nextProps.order.length > 0 ){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      this.setState({searchResult: true, order: ds.cloneWithRows(nextProps.order)})
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
  toggleSideMenu() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  searchbtn = () => {
    console.log(this.state.text)
    const param = {
      photog_id: this.props.user.photog_id,
      search_term: this.state.text,
      show_recent: false
    }
    this.props.dispatch(actions.getOrder(param));
  }
  recent = () => {
    const param = {
      photog_id: this.props.user.photog_id,
      search_term: '',
      show_recent: true
    }
    this.setState({text: 'Recent'})
    this.props.dispatch(actions.getOrder(param));
  }
  renderRowItem = (row_data) => {
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
        <View style={{flex: 10}}>
          <Text style={{fontSize: 15}}>{row_data.customer_data[0].cust_fname + " " + row_data.customer_data[0].cust_lname}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{row_data.customer_data[0].cust_addr1 + " " + row_data.customer_data[0].cust_city + ", " + row_data.customer_data[0].cust_state + " " + row_data.customer_data[0].cust_zip}</Text>
          <Text style={{fontSize:13, color: colors.fontGrayColor}}>{row_data.customer_data[0].cust_wed_date}</Text>
        </View>
        <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity 
            onPress={() => this._toggleModal(item)} 
          >
            <Icon 
              name="dots-three-vertical"
              type="entypo"
              color={colors.fontGrayColor}
              size={25}
            />
          </TouchableOpacity>
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
          {!this.state.searchResult &&
          <View>
          <View style={{height: 60, flexDirection: 'row', padding: 10}}>
            <View style={{flex: 7, flexDirection: 'row'}}>
              <View 
                style={{
                  width: 50, 
                  height: '100%', 
                  borderWidth: 1, 
                  borderRightWidth: 0,
                  borderColor: colors.darkBorderColor, 
                  backgroundColor: colors.headerColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5
                }}
              >
                <Icon
                  name='search'
                  color={colors.darkBorderColor}
                  size={25}
                />
              </View>
              <TextInput
                style={{
                  flex: 1,
                  paddingLeft: 10, 
                  borderWidth: 1,
                  borderColor: colors.darkBorderColor
                }}
                onChangeText={(text)=>this.setState({text})}
              />
            </View>
            <View style={{flex: 2}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: colors.btnColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5
                }}
                onPress={this.searchbtn}
              >
                <Text style={{color: colors.white}}>Search</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text>
              View Upcoming Events & Recent Shoots
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
                backgroundColor: colors.btnColor,
                paddingHorizontal: 15,
                paddingVertical: 7,
                borderRadius: 5
              }}
              onPress={this.recent}
            >
              <Text style={{color: colors.white}}>Show Recent Customers</Text>
            </TouchableOpacity>
          </View>
        </View>
          }
          {
            this.state.searchResult && 
            <View>
              <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>Results for search "{this.state.text}"</Text>
              </View>
              <ListView
                dataSource = {this.state.order}
                renderRow={(row_data)=>this.renderRowItem(row_data)}
              />
            </View>
          }
        </View>
          
      </SideMenu>
    )
  }
}

const mapStateToProps = (state) => ({
  state: state,
  user: state.authReducer.user,
  order: state.orderReducer.order

})

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  modal:{
    width: 0.65*DEVICE_WIDTH, 
    backgroundColor: 'white', 
    height: DEVICE_HEIGHT*0.6,
    borderRadius:5
  }
})

export default connect(mapStateToProps)(Search)
