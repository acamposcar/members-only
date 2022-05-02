exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

exports.isNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/')
  } else {
    next()
  }
}

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next()
  } else {
    res.status(401).json({ msg: 'Unauthorized.' })
  }
}
