//Requerimos las dependencias
require('dotenv').config(); //Requerimos variables de sistema almacenadas en .env utilizando dotenv
const express = require('express'); //Requerimos express
const flight_routes = require('./api_routes/bookingRoutes'); //Requerimos nuestras rutas 
const auth_routes = require('./api_routes/authRoutes'); //Requerimos nuestras rutas 

//Express set-up
const app = express();


//Iniciamos el servidor en el puerto 3001 (definido en fichero .env)
app.listen(process.env.PORT, ()=>{
  console.log("app running on port: " + process.env.PORT);
})

//indicamos que estamos usando las rutas en api_routes/flight_routes y le asignamos la subruta /amadeus
app.use('/booking', flight_routes);
app.use('/auth', auth_routes);




