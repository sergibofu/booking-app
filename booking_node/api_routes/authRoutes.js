const express = require("express");
const router = express.Router();
const controllers = require('../controllers/authController');


router.route('/login')
.get(controllers.login)

module.exports = router;