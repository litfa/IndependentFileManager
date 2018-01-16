import ajaxMoudule from "./ajax";
import tools from "./tools";

const Ajax = ajaxMoudule.Ajax;

function promiseAjax(url, datas = "") {
    return new Promise((resolve, reject) => {
        new Ajax({
            url: url,
            data: datas,
            success(res, obj) {
                resolve(res);
            },
            error(XML, textStatus, errorThrown) {
                reject(XML, textStatus, errorThrown);
            }
        }).ajax();
    });
}

exports.cd = (path) => {
    console.log("改变目录");

}

exports.ls = (path) => {
    console.log("刷新");
    return new Promise((resolve, reject) => {
        promiseAjax("/fs/ls", path).then((data) => {
            //排序
            let res_dir = [];
            let res_file = [];
            for (let k in data) {
                if (!data[k].isFile) {
                    res_dir.push(data[k]);
                } else {
                    res_file.push(data[k]);
                }
            }
            let newRes = res_dir.sort().concat(res_file.sort());
            resolve(newRes);
        });
    });
}

exports.copy = (fileStack) => {
    console.log("复制");
    return promiseAjax("/fs/cp", fileStack);
}

exports.paste = () => {
    console.log("粘贴");
    return promiseAjax("/fs/patse");
}

exports.remove = (fileStack) => {
    console.log("删除");
    return promiseAjax("/fs/rm", fileStack);
}

exports.cponce = (fileStack) => {
    console.log("剪贴");
    return promiseAjax("/fs/ct", fileStack);
}

exports.rename = (filesStack, newName) => {
    console.log("重名名:", filesStack[0].name, "->", newName);
    if (filesStack.length == 1) {
        let oldName = filesStack[0].name;
        return promiseAjax("/fs/rename", {
            oldName: oldName,
            newName: newName
        });
    } else {
        tools.popWindow("非法操作，同时命名多个文件或未选择文件！");
    }

}