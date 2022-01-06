const express = require("express");
const controllers = require('../controllers/bookingController');
let router = express.Router();

router.route('/airport')
.get(controllers.getAirport);

router.route('/flights')
.get(controllers.getFlights)

module.exports = router;