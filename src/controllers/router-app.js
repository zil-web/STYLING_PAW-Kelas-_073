const router = require('express').Router();
const homeController = require('../controllers').home;
const verifyUser = require('../configs/verify');
const controllerContact = require('../controllers/controller-contact');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/contact', verifyUser.isLogin, controllerContact.getContact);

module.exports = router;
