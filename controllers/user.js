const User = require('../models/user')

exports.index = async (req, res) => {
  try {
    const users = await User.find({}).sort({ name: 1 })
    res.render('category_index', { error: null, users })
  } catch (err) {
    res.render('category_index', { error: err, users: [] })
  }
}
