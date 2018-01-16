const express = require('express');
const router = express.Router();
const pathm = require("path");
const {
    parseHandle,
    sendHandle,
    filesToPaths
} = require("../module/dataHandle");
const {
    FileOperateStructure,
    UseFileOperate
} = require("../model/fsoperate_session");



router.get('/auth', (req, res) => {
    req.session.fsos = new FileOperateStructure("E:/test/", "./");
    req.session.fsoperate = {};
    req.session.fsoperate.tmp = [];
    req.session.w = "AAA";
    req.session.ewe = function () {
        console.log(11111111);
    };
    res.send('auth Done');
    req.session.save();
});

router.post('/ls', (req, res) => {
    let name = parseHandle(req.body) || "./";
    req.session.fsos.cwd = pathm.normalize(pathm.join(req.session.fsos.cwd, name));
    let fileOperate = new UseFileOperate(req.session.fsos).fileOperate;
    if (req.session.fsos.cwd == "..\\") req.session.fsos.cwd = "./"; //越级,重置
    let obj = fileOperate.lsType(req.session.fsos.cwd);
    req.session.save();
    sendHandle(req, res, obj);
});

router.post('/rm', (req, res) => {
    let stack = (parseHandle(req.body));
    let fileOperate = new UseFileOperate(req.session.fsos).fileOperate;
    let names = filesToPaths(stack, req.session.fsos.cwd);
    let obj = fileOperate.batchExectue(fileOperate.rm, names);
    sendHandle(req, res, obj);
});


router.post('/cp', (req, res) => {
    let stack = (parseHandle(req.body));
    // let paths = filesToPaths(stack, req.session.fsos.cwd);
    req.session.fsoperate.tmp_files = stack;
    // req.session.fsoperate.tmp_paths = paths;
    req.session.fsoperate.tmp_cwd = req.session.fsos.cwd;
    req.session.fsoperate.tmp_action = "cp";
    req.session.save();
    sendHandle(req, res, null);
});

router.post('/ct', (req, res) => {
    let stack = (parseHandle(req.body));
    req.session.fsoperate.tmp_files = stack;
    req.session.fsoperate.tmp_cwd = req.session.fsos.cwd;
    req.session.fsoperate.tmp_action = "ct";
    req.session.save();
    sendHandle(req, res, null);
});

router.post('/patse', (req, res) => {
    let callFunc = null;
    let fileOperate = new UseFileOperate(req.session.fsos).fileOperate;
    if (req.session.fsoperate.tmp_action == "cp")
        callFunc = fileOperate.cp;
    else
        callFunc = fileOperate.mv;
    let oldpaths = filesToPaths(req.session.fsoperate.tmp_files, req.session.fsoperate.tmp_cwd);
    let newpaths = filesToPaths(req.session.fsoperate.tmp_files, req.session.fsos.cwd);
    let obj = fileOperate.batchExectue(callFunc, oldpaths, newpaths);

    sendHandle(req, res, obj);
});

router.post('/rename', (req, res) => {
    let json = (parseHandle(req.body));
    let fileOperate = new UseFileOperate(req.session.fsos).fileOperate;
    sendHandle(req, res, fileOperate.mv(json.oldName, json.newName));
});

module.exports = router;