const pathm = require("path");

exports.parseHandle = (form) => {
    if (form['request'] != undefined) {
        try {
            return JSON.parse(form.request);
        } catch (err) {
            return form.request;
        }
    }
    return "";
};


exports.sendHandle = (req, res, obj, key = "response") => {
    let sendObj = {};
    sendObj[key] = obj;
    res.send(sendObj);
};


exports.filesToPaths = (stack, cwd) => {
    let names = [];
    let baseP = cwd;
    for (const v of stack) {
        names.push(pathm.join(baseP, v.name));
    }
    return names;
};