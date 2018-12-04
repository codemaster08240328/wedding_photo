import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Font } from 'expo'
import Menu from '../../components/SideMenu'
import SideMenu from 'react-native-side-menu'
import Spinner from 'react-native-loading-spinner-overlay'
import HTML from 'react-native-render-html'
import Dimensions from 'Dimensions'
import { View, Text, StyleSheet, TouchableOpacity, WebView, ScrollView } from 'react-native'

import actions from '../../redux/contract/action'
import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import ContractHelper from '../../service/contract'

import { colors } from '../../settings/constant'
const DEVICE_WIDTH = Dimensions.get('window').width;
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
       item: this.props.navigation.getParam('item'),
       fontLoaded: false
    }

    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
  async componentDidMount(){
    const param = {
      photog_id: this.props.user.photog_id,
      contract_id: this.state.item.id
    }
    ContractHelper.getContractDetail(param).then((resp)=>{
      console.log(resp)
      this.setState({detail: resp})
      this.setState({isloading: false})
    });

    await Font.loadAsync({
      'arial': require('../../../assets/fonts/arial.ttf'),
    })

    this.setState({fontLoaded: true})
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

  agreeBtn = () => {
    
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
          <View style={{alignItems: 'center', paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 2, borderColor: colors.darkBorderColor}}>
            <View style={{flex: 1, alignItems: 'flex-start', fontSize: 18}}><TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Text style={{color: colors.btnColor}}>{"<Back"}</Text></TouchableOpacity></View>
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
              ref={webview => {
                  this.myWebView = webview;
              }}
              scrollEnabled={true}
              style = {{width:DEVICE_WIDTH, zIndex:50}}      
              source = {{html:this.state.detail}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
            {/* <ScrollView style={{flex: 1}}>
              {this.state.fontLoaded && 
              <HTML
                html={this.state.detail}
                imagesMaxWidth={DEVICE_WIDTH}
              />}
            </ScrollView> */}
          </View>
          <View style={{position: 'absolute', bottom: 0, alignItems: 'center', width: '100%'}}>
            <TouchableOpacity 
              onPress={()=>this.agreeBtn()}
              style={{height: 30, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderRadius: 15, backgroundColor: colors.btnColor}}
            >
              <Text style={{color: colors.white}}>I AGREE & SIGN THIS AGREEMENT</Text>
            </TouchableOpacity>
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
