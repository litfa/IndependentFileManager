const express = require('express');
const router = express.Router();
const {
    FileOperateStructure,
} = require("../model/fsoperate_session");

const BASE_DIR = process.cwd();

router.all('/', (req, res) => {
    req.session.fsos = new FileOperateStructure(BASE_DIR, "./");
    req.session.fsoperate = {};
    req.session.fsoperate.tmp = [];
    req.session.save();
    res.redirect('/public');
});


router.all('/logout', (req, res) => {
    req.session.destroy();
    res.send('[正常] 您已安全退出，现在可以关闭这个网页。');
});


module.exports = router;