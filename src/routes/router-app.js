const express = require('express');
const router = express.Router();
const verifyUser = require('../configs/verify');
const homeController = require('../controllers/controller-home');
router.get('/', verifyUser.isLogin, homeController.home);
console.log(homeController);


module.exports = router;
