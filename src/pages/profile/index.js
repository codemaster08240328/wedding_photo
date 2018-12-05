import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Switch, Slider, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'
import Spinner from 'react-native-loading-spinner-overlay';
import ProfileHelper from '../../service/profile';
import { colors } from '../../settings/constant'
import LogoComponent from '../../components/LogoComponent'
import NavBar from '../../components/NavBar'
import Menu from '../../components/SideMenu'

import actions from '../../redux/profile/action'

class Profile extends Component {
  static propTypes = {
    prop: PropTypes
  }
  constructor(props) {
    super(props)
  
    this.state = {
      isOpen: false,
      flag: true, //true: wedding, false: engagement
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thr: true,
      fri: true,
      sat: true,
      sec: false,
      maxdist: '80',
      isloading: true 
    }

    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  componentDidMount(){
    const param = {
      photog_id: this.props.user.photog_id,
    }
    this.props.dispatch(actions.getProfile(param));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.profileReducer.loading == false){
      this.setState({isloading: false});
      console.log("~~~~~~~~~~~~~~~~~~~~~~~`",nextProps.profile.photog_block_sun);
      this.setState({sun: nextProps.profile.photog_block_sun == '1' ? true : false})
      this.setState({mon: nextProps.profile.photog_block_mon == '1' ? true : false})
      this.setState({tue: nextProps.profile.photog_block_tue == '1' ? true : false})
      this.setState({wed: nextProps.profile.photog_block_wed == '1' ? true : false})
      this.setState({thr: nextProps.profile.photog_block_thu == '1' ? true : false})
      this.setState({fri: nextProps.profile.photog_block_fri == '1' ? true : false})
      this.setState({sat: nextProps.profile.photog_block_sat == '1' ? true : false})
      this.setState({sec: nextProps.profile.is_second_shooter == '1' ? true : false})
      this.setState({maxdist: nextProps.profile.photog_distance_value})
      this.setState({photog_fname: nextProps.profile.photog_fname})
      this.setState({photog_lname: nextProps.profile.photog_lname})
      this.setState({photog_email: nextProps.profile.photog_email})
      this.setState({photog_phone: nextProps.profile.photog_phone})
    }
  }

  onMenuItemSelected(item){
    this.setState({
      isOpen: false,
      selectedItem: item
    });
    this.props.navigation.navigate(item);
  }
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  sun = (item) => {
    switch(item){
      case 'sun':
        this.setState({sun: !this.state.sun})
        break
      case 'mon':
        this.setState({mon: !this.state.mon})
        break
      case 'tue':
        this.setState({tue: !this.state.tue})
        break
      case 'wed':
        this.setState({wed: !this.state.wed})
        break
      case 'thr':
        this.setState({thr: !this.state.thr})
        break
      case 'fri':
        this.setState({fri: !this.state.fri})
        break
      case 'sat':
        this.setState({sat: !this.state.sat})
        break
      case 'sec':
        this.setState({sec: !this.state.sec})
        break
      default:
        break
    }
  }

  detailClick = async() => {
    let param = {
      photog_id: this.props.user.photog_id,
      photog_fname: this.state.photog_fname,
      photog_lname: this.state.photog_lname,
      photog_email: this.state.photog_email,
      photog_phone: this.state.photog_phone,
      photog_pass: this.state.photog_pass,
      photog_block_sun: this.state.sun ? "1" : "0",
      photog_block_mon: this.state.mon ? "1" : "0",
      photog_block_tue: this.state.tue ? "1" : "0",
      photog_block_wed: this.state.wed ? "1" : "0",
      photog_block_thu: this.state.thr ? "1" : "0",
      photog_block_fri: this.state.fri ? "1" : "0",
      photog_block_sat: this.state.sat ? "1" : "0",
      is_second_shooter: this.state.sec ? "1" : "0",
      photog_distance_value: this.state.maxdist
    }
    const result = await ProfileHelper.setProfile(param);
    result.success == 'true' ? alert("Success")  : alert("False")
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
          <ScrollView>
            <View style={{padding: 10, paddingHorizontal: 15}}>
              <TextInput
                value={this.props.profile ? this.props.profile.photog_fname : ''}
                style={{padding: 5, borderWidth: 1, borderColor: colors.darkBorderColor}}
                placeholder="FIRST NAME"
                onChangeText={(photog_fname)=>this.setState({photog_fname})}
              />
              <TextInput
                value={this.props.profile ? this.props.profile.photog_lname : ''}
                style={styles.textInput}
                placeholder="LAST NAME"
                onChangeText={(photog_lname)=>this.setState({photog_lname})}
              />
              <TextInput
                value={this.props.profile ? this.props.profile.photog_email : ''}
                style={styles.textInput}
                placeholder="EMAIL"
                onChangeText={(photog_email)=>this.setState({photog_email})}
              />
              <TextInput
                value={this.props.profile ? this.props.profile.photog_phone : ''}
                style={styles.textInput}
                placeholder="PHONE"
                onChangeText={(photog_phone)=>this.setState({photog_phone})}
              />
              <TextInput
                style={styles.textInput}
                placeholder="PASSWORD"
                secureTextEntry = {true}
                onChangeText={(photog_pass)=>this.setState({photog_pass})}
              />
            </View>
            <View>
              <Text style={{marginLeft: 15, fontSize: 12}}>BLOCKED DAYS</Text>
              <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>SUN</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("sun")}
                    value={this.state.sun}
                  />
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>MON</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("mon")}
                    value={this.state.mon}
                  />
                </View>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>TUE</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("tue")}
                    value={this.state.tue}
                  />
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>WED</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("wed")}
                    value={this.state.wed}
                  />
                </View>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>THR</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("thr")}
                    value={this.state.thr}
                  />
                </View>
                
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>FRI</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("fri")}
                    value={this.state.fri}
                  />
                </View>
              </View>
              <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text>SAT</Text>
                  <Switch
                    onTintColor={colors.btnColor}
                    style={{marginLeft: 10}}
                    onValueChange={()=>this.sun("sat")}
                    value={this.state.sat}
                  />
                </View>
              </View>              
            </View>
            <View>
              <View style={{flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between', alignItems: 'center'}}>
                <Text>I want to be a second shooter: </Text>
                <Switch
                  onTintColor={colors.btnColor}
                  style={{marginLeft: 10}}
                  onValueChange={()=>this.sun("sec")}
                  value={this.state.sec}
                />
              </View>
              <View style={{marginTop: 10, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center'}}>
                <Text>Adjust your maximum travel distance: </Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: colors.darkBorderColor, padding: 5, width: 40}}
                  value={this.state.maxdist}
                  onChangeText={(text) => this.setState({maxdist: text})}
                />
              </View>
              <View style={{marginTop: 10, paddingHorizontal: 15}}>
                <Slider
                  minimumTrackTintColor={colors.btnColor}
                  maximumValue={180}
                  minimumValue={10}
                  value={this.state.maxdist}
                  onValueChange={(value) => this.setState({maxdist: Math.round(value).toString()})}
                />
              </View>

              <View style={{marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity 
                  onPress={()=>this.detailClick()}
                  style={{backgroundColor: colors.btnColor, padding: 10}}>
                  <Text style={{color: 'white'}}>SAVE DETAILS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  textInput: {padding: 5, borderWidth: 1, borderColor: colors.darkBorderColor, marginTop: 5}
  
})

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  profileReducer: state.profileReducer,
  profile: state.profileReducer.profile
})

export default connect(mapStateToProps)(Profile)
