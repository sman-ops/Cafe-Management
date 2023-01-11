const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();
var auth = require('../middlewares/authentification');
var checkRole = require('../middlewares/checkRole');

router.post(
  '/add',
  auth.authenticateToken,
  checkRole.checkRole,
  productController.add
);
router.get('/get', auth.authenticateToken, productController.get);
router.get(
  '/getByCategory/:id',
  auth.authenticateToken,
  productController.getByCategory
);
router.get('/getById/:id', auth.authenticateToken, productController.getById);
router.patch(
  '/update',
  auth.authenticateToken,
  checkRole.checkRole,
  productController.update
);
router.delete(
  '/delete/:id',
  auth.authenticateToken,
  checkRole.checkRole,
  productController.delete
);

router.patch(
  '/updateStatus',
  auth.authenticateToken,
  checkRole.checkRole,
  productController.updateStatus
);

module.exports = router;
