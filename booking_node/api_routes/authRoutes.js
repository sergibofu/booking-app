const express = require("express");
const router = express.Router();
const controllers = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');//nuestro middleware de autentificacion

router.route('/login')
.post(controllers.login)

router.route('/register').post(controllers.register);
router.route('/delete').delete(authMiddleware.isSigned, controllers.deleteUser);
router.route('/update').put(authMiddleware.isSigned, controllers.updateUser);
module.exports = router;