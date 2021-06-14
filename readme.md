# NodeJS 项目实战
NodeJS + Express + Handlebars + MongoDB 实现的一套简易课程管理系统，参考[https://ke.qq.com/course/464841]

## 使用到的一些模块
1、express : 基于 Node.js 平台，快速、开放、极简的 Web 开发框架  
2、express-handlebars : 模板引擎  
3、mongoose : 操作MongoDB  
4、express-session : 在服务端存储session信息  
5、connect-flash : 依赖express-session，flash存储在session模块；消息写入到 flash 中，在跳转目标页中显示该消息  
6、bcrypt : 密码加密  
7、passport : 登录认证, 导航守卫  

## 实现功能
1、实现用户注册\登录\退出  
2、实现展现课程列表\添加课程\编辑课程\删除课程  
3、实现不同用户登录只能看到本人所添加的课程  

## 演示地址  
基于heroku[https://heroku.com/]、mongodb[https://cloud.mongodb.com/]搭建的在线演示地址[https://node-app-demo-2021.herokuapp.com/]  
