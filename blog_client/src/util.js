import config from "./config";
export function getText(str) {
  return str
    .replace(/<[^<p>]+>/g, "") // 将所有<p>标签 replace ''
    .replace(/<[</p>$]+>/g, "") // 将所有</p>标签 replace ''
    .replace(/&nbsp;/gi, "") // 将所有 空格 replace ''
    .replace(/<[^<br/>]+>/g, ""); // 将所有 换行符 replace ''
}
export function isNull(str) {
  if (str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

export function generateUrl(str){
    return str ? config.serverUrl + str : ''
}