module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("errorMsg", "请先登录！");
            res.redirect('/users/login');
        }
    }
}