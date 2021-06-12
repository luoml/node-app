const express = require("express");
const mongoose = require('mongoose');

const {ensureAuthenticated} = require('../config/auth');

const router = express.Router();

// 引入模型
require("../models/Idea");
const Idea = mongoose.model('ideas');

// 课程
// 列表
router.get("/", ensureAuthenticated, (req, res) => {
    Idea.find({userId: req.user._id})
        .sort({date: "desc"})
        .lean()
        .then(ideas => {
            res.render("ideas/index", {
                ideas: ideas
            });
        });
})

// 添加
router.get("/add", ensureAuthenticated, (req, res) => {
    res.render("ideas/add");
})

router.post("/", (req, res) => {
    // console.log(req.body);
    let errors = [];
    if (!req.body.title) {
        errors.push({text: "请输入标题！"});
    }
    if (!req.body.details) {
        errors.push({text: "请输入详情！"});
    }
    
    if (errors.length > 0) {
        res.render("ideas/add", {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newIdea = {
            title: req.body.title,
            details: req.body.details,
            userId: req.user._id
        }
        new Idea(newIdea).save().then(idea => {
            req.flash("successMsg", "数据添加成功");
            res.redirect('/ideas');
        }).catch(err => {
            req.flash("errorMsg", "数据添加失败");
            console.err(err);
        });
    }
})

// 编辑
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
    Idea.findOne({_id: req.params.id})
        .lean()
        .then(idea => {
            if (idea.userId != req.user._id) {
                req.flash("errorMsg", "非法操作！");
                res.redirect('/ideas');
            } else {
                res.render("ideas/edit", {
                    idea: idea
                });
            }            
        });
})

router.put("/:id", (req, res) => {
    Idea.findOne({_id: req.params.id})
        .then(idea => {
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save().then(idea => {
                req.flash("successMsg", "数据编辑成功");
                res.redirect('/ideas');
            })
        })
        .catch(err => {
            req.flash("errorMsg", "数据编辑失败");
            console.err(err);
        })
})

// 删除
router.delete("/:id", (req, res) => {
    Idea.deleteOne({_id: req.params.id})
        .then(() => {
            req.flash("successMsg", "数据删除成功");
            res.redirect('/ideas');
        })
})

module.exports = router;