const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 加载model
const User = mongoose.model('users');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        {usernameField: "email"},
        (email, password, done) => {
            // console.log(email);
            // console.log(password);

            User.findOne({email: email}).then(user => {
                // console.log(user)
                if (!user) {
                    return done(null, false, {message: "用户不存在"});
                }
        
                // 验证密码
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "密码错误"});
                    }
                });    
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}