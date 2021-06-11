const express = require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');

const index = require("./routes/index")
const ideas = require("./routes/ideas")
const users = require("./routes/users")

require("./config/passport")(passport)

const app = express();

// Connect to mongodb
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

// 加载静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// method-override
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

// passport
app.use(passport.initialize());
app.use(passport.session());

// connect-flash
app.use(flash());

// 配置全局变量
app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//load routes
app.use("/", index);
app.use("/ideas", ideas);
app.use("/users", users);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
})