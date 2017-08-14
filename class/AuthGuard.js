class AuthGuard {
  constructor(props){ }

  static loginRequired(req, res, next) {
    if(!req.isAuthenticated()) {
      req.flash('info', ['Please signin to proceed']);
      return res.redirect('/signin');
    }
    return next();
  }

  static adminRequired(req, res, next) {
    if(!req.user['isAdmin']) {
      return res.render('unauthorized');
    }
    return next();
  }
}

module.exports = AuthGuard;