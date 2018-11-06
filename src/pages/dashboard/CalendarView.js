import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import actions from '../../redux/dashboard/action'

import { connect } from 'react-redux'
import LogoComponent from '../../components/LogoComponent'
import { colors } from '../../settings/constant';


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
      markedData: {
        '2018-11-16': {selected: true, selectedColor: colors.btnGrayColor},
        '2018-11-17': {selected: true, selectedColor: colors.btnGrayColor},
        '2018-11-18': {selected: true, selectedColor: colors.btnGrayColor},
        '2018-11-19': {selected: true, selectedColor: colors.btnGrayColor}
      }
    };
    this.selectedDay = this.selectedDay.bind(this)
  }

  componentDidMount() {
    const dt = new Date();
    const param = {
      photog_id: this.props.user.photog_id,
      filter_by_year: dt.getFullYear()
    }
    this.props.dispatch(actions.getUnavailableDate(param));
  }
 
  selectedDay = (day) => {
    let selectedDay = day.dateString;
    let obj={}
    if(selectedDay in this.state.markedData){
      obj = Object.assign({}, this.state.markedData);
      delete obj[selectedDay];
      this.setState({markedData: obj})
    }else{
      obj[selectedDay] = {selected: true, selectedColor: colors.btnGrayColor}
      console.log('obj~~~~~~~', obj)
      let newMarkedData = {...this.state.markedData, ...obj}
      console.log(newMarkedData)
      this.setState({markedData: newMarkedData});
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.unavailable_date.length > 0){
      let obj={}
      nextProps.unavailable_date.map((item)=>{
        obj[item.unavl_date] = {selected: true, selectedColor: colors.btnGrayColor}
      })
      this.setState({
        markedData: obj
      })
    }
  }

 
  render() {    
 
    return (
      <View style={styles.container}>
        <LogoComponent {...this.props} backbtn />
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
          // Initially visible month. Default = Date()
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => this.selectedDay(day)}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {console.log('selected day', day)}}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {console.log('month changed', month)}}
          // Hide month navigation arrows. Default = false
          // hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          // hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          // disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          // hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          // onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          // onPressArrowRight={addMonth => addMonth()}
          markedDates={this.state.markedData}
        />
        </View>
        
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  }
})

function mapStateToProps(state){
  return {
    state: state,
    user: state.authReducer.user,
    unavailable_date: state.unavailableDateReducer.unavailable_date
  }
}

export default connect(mapStateToProps)(CalendarView)