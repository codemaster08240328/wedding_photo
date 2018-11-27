import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import Menu from '../../components/SideMenu'
import SideMenu from 'react-native-side-menu'
import Spinner from 'react-native-loading-spinner-overlay';
import actions from '../../redux/contract/action'

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'

import { colors } from '../../settings/constant'


const items = [{
  label: 'Pending Contracts',
  value: 1
},{
  label: 'Signed Contracts',
  value: 2
}]

class Contract extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
       value: 1,
       isloading: true
    }

    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  componentDidMount() {
    const param = {
      photog_id: this.props.user.photog_id,
      contract_status: 'Pending'
    }
    this.props.dispatch(actions.getPendingContract(param));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.contractReducer.loading == false){
      this.setState({isloading: false})
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
  _keyExtractor = (item, index) => item.id;
  pickerChange = (value) => {
    this.setState({value, isloading: true})
    if(value==1){
      const param = {
        photog_id: this.props.user.photog_id,
        contract_status: 'Pending'
      }
      this.props.dispatch(actions.getPendingContract(param));
    }else if(value==2){
      const param = {
        photog_id: this.props.user.photog_id,
        contract_status: 'Signed'
      }
      this.props.dispatch(actions.getPendingContract(param));
    }
  }

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
          <Text style={{fontSize: 15}}>{item.contract_name}</Text>
          <Text style={{color: "#05ff02"}}>{item.contract_status}</Text>
        </View>
        <View style = {{flex: 3, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          
          <TouchableOpacity
            style={{
              backgroundColor: colors.btnColor,
              borderRadius: 20,
              height: 35, 
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{color: colors.white}}>VIEW</Text>
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
        <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.container}>
          <LogoComponent {...this.props} />
          <NavBar handlePress={this.toggleSideMenu} {...this.props} />
          <View style={{alignItems: 'center', marginTop: 10}}>
            <View 
              style={{
                marginTop: 5,
                flexDirection:'row',
                paddingHorizontal: 20
              }}
            >
              <RNPickerSelect
                items={items}
                style={{...pickerSelectStyles}}
                value={this.state.value}
                onValueChange={(value)=>this.pickerChange(value)}
              />
            </View>
            <Text style = {{marginTop: 5, fontSize: 12}}>Showing last 20 records</Text>

          </View>
          
            {
              this.props.contractReducer.success&&
              <View >
                <FlatList
                  data={this.props.contract}
                  extraData={this.state}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
              </View>
            }
            {
              !this.props.contractReducer.success&&
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              >
                <Text>{this.props.contractReducer.message}</Text>
              </View>
            }
          
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    width: 250
  },
});
const mapStateToProps = (state) => ({
  state: state,
  user: state.authReducer.user,
  contractReducer: state.contractReducer,
  contract: state.contractReducer.contract
})


export default connect(mapStateToProps)(Contract)
