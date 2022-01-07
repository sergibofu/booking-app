const express = require("express");
const router = express.Router();
const controllers = require('../controllers/authController');


router.route('/login')
.post(controllers.login)

router.route('/register')
.post(controllers.register)
.delete(controllers.deleteUser)
.put(controllers.updateUser)
module.exports = router;