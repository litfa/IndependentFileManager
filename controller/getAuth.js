/**
 * @Author: litfa
 * @Date: 2022-04-15 14:57:39
 * @LastEditTime: 2022-04-15 15:35:20
 * @LastEditors: litfa
 * @Description: 获取密钥
 * @FilePath: /IndependentFileManager/controller/getAuth.js
 * @
 */
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

router.post('/', (req, res) => {
  const { authKey, host } = req.body;
  if(authKey != config.authKey) {
    return res.send({status: 4, msg: '密钥错误！'});
  }
  if(!host || !/^[a-z0-9-]{1,20}$/.test(host)) {
    return res.send({status: 4});
  }
  console.log(host, authKey);
  const path = host;
  const key = uuid.v4();
  auths[key] = {
    path,
    key,
    date: Date.now(),
    status: true
  };
  res.send({ status: 1, key });
});

module.exports = router;