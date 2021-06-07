const express = require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/node-app', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("MongoDB Connected");
}).catch(err => {
    console.err(err);
});

// 引入模型
require("./models/Idea");

const Idea = mongoose.model('ideas');

// Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// body parser
// json() 解析 application/json 请求体
// urlencoded() 解析 application/x-www-form-urlencoded 请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// method-override
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

// flash
app.use(flash());

// 配置全局变量
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    next();
})

// 路由配置
app.get("/", (req, res) => {
    const title = "大家好"
    res.render("index", {
        title: title
    });
})

app.get("/about", (req, res) => {
    res.render("about");
})

// 列表
app.get("/ideas", (req, res) => {
    Idea.find({})
        .sort({date: "desc"})
        .lean()
        .then(ideas => {
            res.render("ideas/index", {
                ideas: ideas
            });
        });
})

// 添加
app.get("/ideas/add", (req, res) => {
    res.render("ideas/add");
})

app.post("/ideas", (req, res) => {
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
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser).save().then(idea => {
            req.flash("successMsg", "数据添加成功");
            res.redirect('/ideas');
        }).catch(err => {
            req.flash("errorMsg", "数据添加失败");
            console.err(err);
        });
    }
})

// 编辑
app.get("/ideas/edit/:id", (req, res) => {
    Idea.findOne({_id: req.params.id})
        .lean()
        .then(idea => {
            res.render("ideas/edit", {
                idea: idea
            });
        });
})

app.put("/ideas/:id", (req, res) => {
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
app.delete("/ideas/:id", (req, res) => {
    Idea.deleteOne({_id: req.params.id})
        .then(() => {
            req.flash("successMsg", "数据删除成功");
            res.redirect('/ideas');
        })
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
})