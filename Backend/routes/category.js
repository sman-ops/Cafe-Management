const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();
var auth = require('../middlewares/authentification');
var checkRole = require('../middlewares/checkRole');

router.post(
  '/add',
  auth.authenticateToken,
  checkRole.checkRole,
  categoryController.add
);
router.get('/get', auth.authenticateToken, categoryController.get);
router.patch(
  '/update',
  auth.authenticateToken,
  checkRole.checkRole,
  categoryController.update
);

module.exports = router;
