const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index)

router.post('/', indexController.postPost)

router.get('/admin', indexController.getAdmin)

router.post('/admin', indexController.postAdmin)

router.get('/login', indexController.getLogin)

router.post('/login', indexController.postLogin)

router.get('/logout', indexController.getLogout)

router.get('/register', indexController.getRegister)

router.post('/register', indexController.postRegister)

router.post('/:postid/delete', indexController.deletePost)

module.exports = router
