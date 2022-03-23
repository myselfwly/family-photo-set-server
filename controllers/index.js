const AppError = require("../utils/appError");
const conn = require("../services/db");
exports.getAllTodos = (req, res, next) => {
    conn.query("SELECT * FROM user_info", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};
exports.createTodo = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [req.body.name, "pending"];
    conn.query(
        "INSERT INTO user_info (loginName, userName, password) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user created!",
            });
        }
    );
};
exports.getTodo = (req, res, next) => {
    if (!req.params.loginName) {
        return next(new AppError("No loginName found", 404));
    }
    conn.query(
        "SELECT * FROM user_info WHERE loginName = ?",
        [req.params.loginName],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};
exports.updateTodo = (req, res, next) => {
    if (!req.params.loginName) {
        return next(new AppError("No todo loginName found", 404));
    }
    conn.query(
        "UPDATE user_info SET cookie='completed' WHERE loginName=?",
        [req.params.loginName],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo updated!",
            });
        }
    );
};
exports.deleteTodo = (req, res, next) => {
    if (!req.params.loginName) {
        return next(new AppError("No todo loginName found", 404));
    }
    conn.query(
        "DELETE FROM user_info WHERE loginName=?",
        [req.params.loginName],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "todo deleted!",
            });
        }
    );
}

exports.login = (req, res, next) => {
    const { userName, passWord } = req.body
}