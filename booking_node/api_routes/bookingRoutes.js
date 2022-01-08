const express = require("express");
const controllers = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');//nuestro middleware de autentificacion
let router = express.Router();

router.route('/airport')
.get(authMiddleware.isSigned, controllers.getAirport);

router.route('/flights')
.get(authMiddleware.isSigned, controllers.getFlights)

module.exports = router;