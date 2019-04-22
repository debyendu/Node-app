const express = require('express');
var router = express.Router();

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);
router.post('/admin', UserController.admin_signup);

router.post('/login',UserController.user_login);
module.exports = router;