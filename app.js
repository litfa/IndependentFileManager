var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Cookie and Session 的基础功能
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());


const UUID = require('uuid');
app.use(session({
    secret: UUID.v4(),
    name: 'IFM_SESSION',
    //1小时
    cookie: {
        maxAge: 1000 * 60 * 60
    },
    resave: true,
    saveUninitialized: true,
}));

app.use('/public', express.static('./public'));

const baseRoute = require('./controller/function');
const authRoute = require('./controller/auth');

app.use('/fs_auth', authRoute);
//必须先进行登陆
app.use(['/fs', '/public'], function (req, res, next) {
    if (req.session.fsos) {
        next();
        return true;
    }
    res.status(403).send('禁止访问：权限不足！');
});
app.use('/fs', baseRoute);

const server = app.listen(3000, function () {
    // const host = server.address().address;
    const port = server.address().port;

    console.log(' - 演示项目运行');
    console.log(' - 访问即可使用与体验: http://localhost:%s/fs_auth/auth/foo', port);
});