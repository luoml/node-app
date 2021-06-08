const express = require("express");

const router = express.Router();

// 注册
router.get("/register", (req, res) => {
    res.render("users/register");
})

// 登录
router.get("/login", (req, res) => {
    res.render("users/login");
})

module.exports = router;