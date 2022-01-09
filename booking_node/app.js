//Requerimos las dependencias
require('dotenv').config(); //Requerimos variables de sistema almacenadas en .env utilizando dotenv
const cors = require('cors');
const express = require('express'); //Requerimos express
const mongoose = require('mongoose');
const flight_routes = require('./api_routes/bookingRoutes'); //Requerimos nuestras rutas 
const auth_routes = require('./api_routes/authRoutes'); //Requerimos nuestras rutas 


//Express set-up
const app = express();

//Iniciamos el servidor en el puerto 3001 (definido en fichero .env)
app.listen(process.env.PORT, ()=>{
  console.log("app running on port: " + process.env.PORT);

})
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pcno5.mongodb.net/booking-app?retryWrites=true&w=majority`;
mongoose.connect(url);//conectamos a la bbdd
//indicamos que estamos usando las rutas en api_routes/flight_routes y le asignamos la subruta /amadeus
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/booking', flight_routes);
app.use('/auth', auth_routes);




