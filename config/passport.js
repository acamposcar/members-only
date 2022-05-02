const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      const passwordIsCorrect = await bcrypt.compare(password, user.password)
      if (passwordIsCorrect) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect password' })
      }
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
