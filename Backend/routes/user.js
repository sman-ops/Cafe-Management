const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
var auth = require('../middlewares/authentification');
var checkRole = require('../middlewares/checkRole');
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/forgotpassword', userController.forgotpassword);
router.get(
  '/get',
  auth.authenticateToken,
  checkRole.checkRole,
  userController.get
);
router.patch(
  '/update',
  auth.authenticateToken,
  checkRole.checkRole,
  userController.update
);
router.get('/checkToken', auth.authenticateToken, userController.checkToken);
router.post(
  '/changePassword',
  auth.authenticateToken,
  userController.changePassword
);
module.exports = router;
