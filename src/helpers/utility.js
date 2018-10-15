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
  