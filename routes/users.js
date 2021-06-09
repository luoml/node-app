const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

require("../models/User");
const User = mongoose.model('users');

// 注册
router.get("/register", (req, res) => {
    res.render("users/register");
})

router.post("/register", (req, res) => {
    // console.log(req.body);
    let errors = [];
    if (req.body.password.length < 4) {
        errors.push({text: "密码长度不能小于4位！"});
    }
    if (req.body.password != req.body.password2) {
        errors.push({text: "两次密码不一致！"});
    }
    
    if (errors.length > 0) {
        res.render("users/register", {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    } else {
        User.find({email: req.body.email}).then(user => {
            if (user) {
                req.flash("errorMsg", "注册邮箱已存在");
                res.redirect('/users/register');
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }

                new User(newUser).save().then(user => {
                    req.flash("successMsg", "账号注册成功");
                    res.redirect('/users/login');
                }).catch(err => {
                    req.flash("errorMsg", "账号注册失败");
                    res.redirect('/users/register');
                    console.err(err);
                });
            }
        });        
    }
})

// 登录
router.get("/login", (req, res) => {
    res.render("users/login");
})

module.exports = router;