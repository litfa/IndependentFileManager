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
const fs = require("fs");
const os = require('os');




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


const multiparty = require('multiparty');
router.all('/upload', (req, res) => {
    let fileOperate = new UseFileOperate(req.session.fsos).fileOperate;
    var target_path = fileOperate.normalizePath(req.session.fsos.cwd); //获取绝对路径
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({
        uploadDir: os.tmpdir()
    });
    form.parse(req, function (err, fields, files) {
        // var filesTmp = JSON.stringify(files, null, 2);
        // console.log('parse files: ' + filesTmp);
        if (err) {
            res.status(500).send('服务器内部错误！文件上传错误！' + err);
            return;
        }
        try {
            var inputFile = files.upload_file[0];
            var uploadedPath = inputFile.path;
            var dstPath = pathm.join(target_path, inputFile.originalFilename);

            let readStream = fs.createReadStream(uploadedPath);
            let writeStream = fs.createWriteStream(dstPath);
            readStream.pipe(writeStream);
            fs.unlink(uploadedPath, (err) => { /*ignore*/ });
            res.send("Done");
        } catch (err) {
            res.status(500).send('上传虽然成功，但是处理文件出错: ' + err);
        }
    });
});

module.exports = router;