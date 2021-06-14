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
8、cross-env : 跨平台设置和使用环境变量  

## 实现功能
1、用户注册\登录\退出  
2、展现课程列表\添加课程\编辑课程\删除课程  
3、不同用户登录只能看到本人所添加的课程  
4、用户登录成功后才可操作课程相关功能  

## 启动
1、`npm run dev` 连接本地测试环境，也可使用 `nodemon`，当源码存在变化时自动重启    
2、`npm run start` 连接生产环境  

## 演示地址  
基于[heroku](https://heroku.com/)、[mongodb](https://cloud.mongodb.com/)搭建的[在线演示地址](https://node-app-demo-2021.herokuapp.com/)  
