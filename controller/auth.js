const express = require('express');
const router = express.Router();
const {
    FileOperateStructure,
} = require("../model/fsoperate_session");

//验证身份路由
//请更改此路由，在此路由加入你的身份验证的相关代码
router.all('/auth/:token', (req, res) => {
    //此处列举一个简单的身份验证
    const token = req.params.token;
    if (token != 'foo') {
        console.log(`令牌用户 ${token} 权限阻止`);
        res.send("权限阻止");
        return;
    }

    //可以定义不同用户，不同跟目录
    const BASE_DIR = process.cwd();
    req.session.fsos = new FileOperateStructure(BASE_DIR, "./");
    //文件操作类相关初始化
    req.session.fsoperate = {};
    req.session.fsoperate.tmp = [];
    req.session.save();

    console.log(`令牌用户 ${token} 通过身份验证`);

    res.redirect('/public/');
});


//用户退出路由
router.all('/logout', (req, res) => {
    req.session.fsos = null;
    req.session.fsoperate = null;
    res.send('<script> window.close();</script>');
});


module.exports = router;