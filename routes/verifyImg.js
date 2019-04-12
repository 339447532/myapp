var express = require('express');
var svgCaptcha = require('svg-captcha');
var router = express.Router();
router.get('/getCaptcha', function (req, res, next) {
    const cap = svgCaptcha.create({
        // 翻转颜色
        inverse: false,
        // 字体大小
        fontSize: 36,
        // 噪声线条数
        noise: 3,
        // 宽度
        width: 80,
        // 高度
        height: 30,
    });
req.session.captcha = cap.text; // session 存储验证码数值
console.log(req.session)
res.type('svg'); // 响应的类型
res.send(cap.data)
 });
module.exports = router;