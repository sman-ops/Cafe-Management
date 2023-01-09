const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgotpassword', userController.forgotpassword);
router.get('/get', userController.get);
router.patch('/update', userController.update);
router.get('/checkToken', userController.checkToken);
router.post('/changePassword', userController.changePassword);
module.exports = router;
