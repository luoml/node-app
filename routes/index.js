const express = require("express");

const router = express.Router();

// 首页
router.get("/", (req, res) => {
    const title = "大家好"
    res.render("index", {
        title: title
    });
})

// 关于
router.get("/about", (req, res) => {
    res.render("about");
})

module.exports = router;