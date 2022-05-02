const Post = require('../models/post')
const User = require('../models/user')
const validation = require('../validation/validation')
const { validationResult } = require('express-validator')
const passport = require('passport')
const authMiddleware = require('../middleware/auth')
const bcrypt = require('bcryptjs')

require('dotenv').config()

exports.index = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author').sort({ date: -1 })
    res.render('index', { posts, formErrors: [] })
  } catch (err) {
    return next(err)
  }
}

exports.postPost = [
  authMiddleware.isAuth,
  validation.post(),
  async (req, res, next) => {
    const formErrors = validationResult(req)

    if (!formErrors.isEmpty()) {
      const posts = await Post.find().populate('author')
      res.render('index', { posts, formErrors: formErrors.array() })
    } else {
      try {
        await new Post({
          content: req.body.content,
          author: req.user
        }).save()
        res.redirect('/')
      } catch (err) {
        return next(err)
      }
    }
  }
]

exports.deletePost = [
  authMiddleware.isAuth,
  async (req, res, next) => {
    try {
      await Post.findByIdAndRemove(req.params.postid)
      res.redirect('/')
    } catch (err) {
      return next(err)
    }
  }
]

exports.getLogin = [
  authMiddleware.isNotAuth,
  async (req, res, next) => {
    res.render('login', { errors: [], loginErrors: req.session.messages })
  }]

exports.postLogin = [
  authMiddleware.isNotAuth,
  validation.login(),
  (req, res, next) => {
    const formErrors = validationResult(req)
    if (!formErrors.isEmpty()) {
      res.render('login', { errors: formErrors.array(), loginErrors: '' })
    } else {
      next()
    }
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
]

exports.getLogout = (req, res, next) => {
  req.logout()
  res.redirect('/')
}

exports.getRegister = [
  authMiddleware.isNotAuth,
  async (req, res, next) => {
    res.render('register', { errors: [] })
  }
]

exports.postRegister = [
  authMiddleware.isNotAuth,
  validation.register(),
  async (req, res, next) => {
    const formErrors = validationResult(req)
    if (!formErrors.isEmpty()) {
      res.render('register', { errors: formErrors.array() })
    } else {
      // Check if username already exists
      const usernameCount = await User.countDocuments({ username: req.body.username })
      if (usernameCount > 0) {
        res.render('register', { errors: [{ msg: 'There is already a user with that username' }] })
      } else {
        try {
          const hasedPassword = await bcrypt.hash(req.body.password, 10)
          await new User({
            name: req.body.username,
            username: req.body.username,
            password: hasedPassword
          }).save()
          next()
        } catch (err) {
          return next(err)
        }
      }
    }
  },
  // Authenticate after register
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })]

exports.getAdmin = [
  authMiddleware.isAuth,
  async (req, res, next) => {
    res.render('admin', { errors: [] })
  }
]

exports.postAdmin = [
  authMiddleware.isAuth,
  async (req, res, next) => {
    console.log(process.env.ADMIN_PASSWORD)
    if (req.body.password === process.env.ADMIN_PASSWORD) {
      try {
        await User.findByIdAndUpdate(req.user._id, { admin: true }, {})
        res.redirect('/')
      } catch (err) {
        return next(err)
      }
    } else {
      res.render('admin', { errors: [{ msg: 'Wrong password' }] })
    }
  }
]
