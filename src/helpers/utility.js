import {Permissions, Notifications} from 'expo';
import NotificationHelper from '../service/notification';

export function convertDateFormat(date){
    var res = date.split("-");
    return res[1] + '/' + res[2] + '/' + res[0];
}

export function convertTotal(total){
    var float = parseFloat(total);
    return float.toFixed(2);
}

export function convertDateFormat_(date){
  var res = date.split("-");
  return res[1] + '/' + res[2] + '/' + res[0].substr(2);
}

export function sumNum(str1, str2){
  return (parseFloat(str1)+parseFloat(str2)).toFixed(2);
}

export function getContentFromHTML(content){
  result = content.replace('more','');
  return result;
}

export async function notificationRegister(photog_id){
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if(existingStatus !== 'granted'){
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
    alert(finalStatus)
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log(finalStatus, token);
  console.log('photog_id', photog_id)
  const param = {
    photog_id,
    device_token: token
  }
  const result = await NotificationHelper.RegisterDevice(param);

}

/** Date format convert function. From any type to 'December 28, 2018' */
const month_eng_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const month_eng_long = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function getDateObject(param){
  const dateObj = new Date(param);
  const month = month_eng_long[dateObj.getMonth()];
  const date = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${date}, ${year}`;
}
  