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

export async function notificationRegister(){
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
  // const param = {

  // }
  //const result = await NotificationHelper.RegisterDevice(param);

}
  