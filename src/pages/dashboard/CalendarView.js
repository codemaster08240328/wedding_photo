import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Toast, { DURATION } from 'react-native-easy-toast'
import SideMenu from 'react-native-side-menu'
import Spinner from 'react-native-loading-spinner-overlay';

import NavBar from '../../components/NavBar'
import Menu from '../../components/SideMenu'
import LogoComponent from '../../components/LogoComponent'

import actions from '../../redux/dashboard/action'
import DashHelper from "../../service/dashboard"
import { getDateObject } from '../../helpers/utility'
import { colors } from '../../settings/constant';

const dt = new Date();

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};
LocaleConfig.locales['En'] = {
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
  monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  dayNamesShort: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}
LocaleConfig.defaultLocale = 'En';

class CalendarView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      markedData: {},
      curYear:dt.getFullYear()
    };

    this.selectedDay = this.selectedDay.bind(this)
    this.onMenuItemSelected = this.onMenuItemSelected.bind(this)
    this.updateMenuState = this.updateMenuState.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  onMenuItemSelected(item){
    this.setState({
      isOpen: false,
      selectedItem: item,
      isLoading: false
    });

    this.props.navigation.navigate(item);
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  toggleSideMenu(){
    this.setState({isOpen: !this.state.isOpen})
  }

  componentDidMount() {
    const param = {
      photog_id: this.props.user.photog_id,
      filter_by_year: this.state.curYear
    }

    this.props.dispatch(actions.getUnavailableDate(param));
  }

  selectedDay = async(day) => {
    let selectedDay = day.dateString;
    let obj={}

    this.setState({isLoading: true})

    if(selectedDay in this.state.markedData){
      let deletingObj = this.props.unavailable_date.filter((item) => item.unavl_date === selectedDay);
      const param1 = {
        photog_id: this.props.user.photog_id,
        unavl_date: selectedDay,
        unavl_date_id: deletingObj[0].unavl_date_id
      }
      const result1 = await DashHelper.deleteUnavailableDate(param1)
      
      if(result1 && !result1.error){
        obj = Object.assign({}, this.state.markedData);
        delete obj[selectedDay];
        
        this.setState({
          markedData: obj,
          isLoading: false
        })
        
        this.refs.toast.show(
          `Deleted ${getDateObject(selectedDay)} from unavailable list`
          , 2000
        )
      }
    }else{
      const param = {
        photog_id: this.props.user.photog_id,
        unavl_date_from: selectedDay,
        unavl_date_to: selectedDay,
        unavl_reason: 1
      }
      const result = await DashHelper.addUnavailableDate(param);
      
      if(result && !result.error){
        obj[selectedDay] = {
          selected: true,
          selectedColor: colors.btnGrayColor
        }
        let newMarkedData = {...this.state.markedData, ...obj}
        
        this.setState({
          markedData: newMarkedData,
          isLoading: false
        });

        this.refs.toast.show(
          `Added ${getDateObject(selectedDay)} to unavailable list`
          , 2000
        )
      }else{
        this.setState({isLoading: false})
        this.refs.toast.show("From date must be a future date", 2000)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.unavailable_date.length > 0){
      let obj={}

      nextProps.unavailable_date.map((item) => {
        if(item.unavl_reason == 1){
          obj[item.unavl_date] = {selected: true, selectedColor: colors.btnGrayColor}
        }else{
          obj[item.unavl_date] = {selected: true, selectedColor: colors.btnColor}
        }   
      })

      this.setState({markedData: obj})
    }
  }

  onMonthChange = (month) => {
    if(this.state.curYear != month.year){
      const param = {
        photog_id: this.props.user.photog_id,
        filter_by_year: month.year
      }

      this.props.dispatch(actions.getUnavailableDate(param));

      this.setState({curYear:month.year})
    }
  }

 
  render() {    
    const menu = (<Menu onItemSelected={this.onMenuItemSelected} {...this.props} />);
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        menuPosition="right"
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Toast ref = 'toast' />
        <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.container}>
          <LogoComponent {...this.props} />
          <NavBar handlePress={this.toggleSideMenu} {...this.props} />
          <View style={{height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25}}>Manage My Dates</Text>
          </View>
          <View style={{height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{height: 14, width: 14, backgroundColor: colors.btnColor, borderRadius: 7}}></View>
            <Text style={{marginLeft: 5}}>Booked</Text>
            <View style={{marginLeft:10, height: 14, width: 14, backgroundColor: colors.btnGrayColor, borderRadius: 7}}></View>
            <Text style={{marginLeft: 5}}>Unavailable</Text>
          </View>
          <View>
            <Calendar
              onDayPress={(day) => this.selectedDay(day)}
              onDayLongPress={(day) => {console.log('selected day', day)}}
              monthFormat={'MMM yyyy'}
              onMonthChange={(month) => this.onMonthChange(month)}
              firstDay={1}
              showWeekNumbers={true}
              markedDates={this.state.markedData}
            />
          </View>
        </View>
      </SideMenu>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    state: state,
    user: state.authReducer.user,
    unavailable_date: state.unavailableDateReducer.unavailable_date
  }
}

export default connect(mapStateToProps)(CalendarView)