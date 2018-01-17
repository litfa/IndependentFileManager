const express = require('express');
const router = express.Router();

const {
    parseHandle,
    sendHandle,
    filesToPaths
} = require("../module/dataHandle");
const {
    FileOperateStructure,
} = require("../model/fsoperate_session");


router.all('/', (req, res) => {
    req.session.fsos = new FileOperateStructure("E:/test/", "./");
    req.session.fsoperate = {};
    req.session.fsoperate.tmp = [];
    req.session.w = "AAA";
    req.session.ewe = function () {
        console.log(11111111);
    };
    req.session.save();
    res.redirect('/public');
});


router.all('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


module.exports = router;