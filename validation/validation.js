const { body } = require('express-validator')

exports.login = () => [
  body('username', 'Username must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password must be 4 characters o more.').isLength({ min: 4 }).escape()
]

exports.register = () => [
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('username', 'Username must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password must be 4 characters o more.').isLength({ min: 4 }).escape()
]

exports.post = () => [
  body('content', 'Content must be between 1 and 1000 characters').trim().isLength({ min: 1, max: 1000 }).escape()
]
