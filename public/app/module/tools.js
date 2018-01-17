//工具类

//弹出提示框
exports.popWindow = (data) => {
    console.log("弹出:", data);
    alert(data);
}


exports.encodeContext = (text) => {
    let tmp = new String(text);
    tmp = tmp.replace(/ /g, "&nbsp;");
    tmp = tmp.replace(/</g, "&lt;");
    tmp = tmp.replace(/>/g, "&gt;");
    // tmp = tmp.replace(/&/g, "&gt;");
    // tmp = tmp.replace(/\'/g, "&#39;");
    // tmp = tmp.replace(/\"/g, "&quit;");
    // tmp = tmp.replace(/\n/igm, "<>");
    return tmp;
};