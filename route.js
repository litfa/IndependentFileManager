var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var querystring = require('querystring');

//Cookie and Session 的基础功能
app.use(cookieParser());
// app.use(cookieParser({
//     uploadDir: './tmp_uploads'
// }));
// app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: false,
    // uploadDir: './tmp_uploads'
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'IFM_session_wseccret',
    name: 'IFM_session',
    //三天
    cookie: {
        maxAge: 10000 * 60 * 60 * 24 * 3
    },
    resave: true,
    saveUninitialized: true,
}));

app.use('/public', express.static('./public'));

app.post('/', function (req, res) {
    // app.use(express.static('public'));
});

var baseR = require('./controller/function');
var authR = require('./controller/auth');

app.use('/fs_auth', authR);
//必须先进行登陆
app.use(['/fs', '/public'], function (req, res, next) {
    if (req.session.fsos) {
        next();
        return true;
    }
    res.status(403).send('禁止访问：权限不足！');
});
app.use('/fs', baseR);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});