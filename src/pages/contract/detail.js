import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import Menu from '../../components/SideMenu'
import SideMenu from 'react-native-side-menu'
import Spinner from 'react-native-loading-spinner-overlay';
import actions from '../../redux/contract/action'

import { View, Text, StyleSheet, TouchableOpacity, WebView } from 'react-native'
import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import ContractHelper from '../../service/contract'

import { colors } from '../../settings/constant'

class ContractDetail extends Component {
  static propTypes = {
    prop: PropTypes
  }

  constructor(props) {
    super(props)
  
    this.state = {
       value: 1,
       isloading: true,
       status: 'Signed',
       signedDate: "03/18/2018",
       title: 'Photography Contract for TestPayment TestPayment Wedding',
       esign: 'Signed by Kfir Oklahoma  on  03/19/2018 at 1:46:33 AM from 103.85.99.21',
       detail: '',
       item: this.props.navigation.getParam('item')
    }

    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  componentDidMount(){
    const param = {
      photog_id: this.props.user.photog_id,
      contract_id: this.state.item.id
    }
    ContractHelper.getContractDetail(param).then((resp)=>{
      console.log(resp)
      this.setState({detail: resp})
    });
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

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} {...this.props} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        {/* <Spinner visible={this.state.isloading} textContent={"Loading..."} textStyle={{color: '#FFF'}} /> */}
        <View style={styles.container}>
          <LogoComponent {...this.props} />
          <NavBar handlePress={this.toggleSideMenu} {...this.props} />
          <View style={{alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 2, borderColor: colors.darkBorderColor}}>
            <View style={{flex: 1, alignItems: 'flex-start', fontSize: 18}}><Text style={{color: colors.btnColor}}>{"<Back"}</Text></View>
            <View style={{flex: 1, alignItems: 'center', fontSize: 18}}><Text>{this.state.item.contract_status}</Text></View>
            <View style={{flex: 1, alignItems: 'flex-end', fontSize: 18}}><Text>{this.state.item.contract_sign_date}</Text></View>
          </View>
          <View style={{alignItems: 'center', height: 60, justifyContent: 'center'}}>
            <Text style={{textAlign: "center", fontSize: 20}}>{this.state.item.contract_name}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{textAlign: "center", fontSize: 18, color: "#05ff02"}}>{this.state.item.contract_esign}</Text>
          </View>
          <View style={{flex: 1}}>
            <WebView 
              style={styles.WebViewStyle}  
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source = {{html:this.state.detail}}
            />
          </View>
          <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: '100%'}}>
            <TouchableOpacity style={{height: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderRadius: 15, backgroundColor: colors.btnColor}}><Text style={{color: colors.white}}>I AGREE & SIGN THIS AGREEMENT</Text></TouchableOpacity>
            <TouchableOpacity style={{height: 30, justifyContent: 'center', alignItems: 'center', marginVertical: 5}}><Text>I have some concerns</Text></TouchableOpacity>
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
  },
  WebViewStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 20
  }
})

const mapStateToProps = (state) => ({
  state: state,
  user: state.authReducer.user,
  contractReducer: state.contractReducer,
  contract: state.contractReducer.contract
})


export default connect(mapStateToProps)(ContractDetail)
