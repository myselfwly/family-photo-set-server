const AppError = require("../utils/appError");
const conn = require("../services/db");
const { login } = require('../utils/status')
const setCookie = (cookie, loginName) => {
    conn.query("UPDATE user_info SET cookie=? WHERE loginName=?", [cookie, loginName], function (err, data, fields) {
        if (err) return next(new AppError(err))
    });
}
exports.login = (req, res, next) => {
    const { loginName, password } = req.params
    conn.query("SELECT password FROM user_info WHERE loginName = ?", [loginName], function (err, data, fields) {
        if (err) return next(new AppError(err))
        if (data === password) {
            const cookie = password + Math.round(Math.random() * (Math.random() * 30)).toString()
            setCookie(cookie, loginName)
            res.cookie('X-Request-Auth', 'stone', { maxAge: 6000, httpOnly: true })
            res.status(200).json({
                status: login.success,
                length: data?.length,
                data: data,
            });
        } else {
            res.status(200).json({
                status: login.pwdErr,
                message: ['用户名或密码错误']
            }
            )
        }
    });
};