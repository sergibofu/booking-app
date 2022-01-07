const Amadeus = require('amadeus'); //Requerimos amadeus

//Amadeus set-up
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});



/*
Este handler recibe como parametro una ciudad y retorna un json que contiene la infomracion del aeropuesrto,
o aeropuertos de la misma
*/
exports.getAirport = (req, res) => {
    let city = '';

    //comprobamos si hay errores en el parametro
    if (!req.query.city) {
        res.send({
            data: {
                error: "All params are required"
            },
            status: 'failed'
        })
    } else {
        city = req.query.city;
    }

    //llamamos a la api de amadeus preguntando por la ciudad que hemos recibido por parametro
    amadeus.referenceData.locations.get({
        subType: 'CITY',
        keyword: city

    }).then((result) => {
        //preparamos nuestra respuesta y la retornamos a la vista
        let response = {
            data: result.data,
            status: "success"
        }

        res.json(response);

    }).catch((err) => {
        //en caso de error, preparamos nuestra respuesta y le enviamos a la vista tambien
        let response = {
            data: err.response,
            status: "failed"
        };

        res.json(response);
    });

};

/*
Este handler recibe como parametro el codigo de dos ciudades + fecha y retorna un json que contiene los vuelos entre
las dos ciudades ordenados por precio y las fechas de los mismos
*/
exports.getFlights = (req, res) => {
    if (!req.query.origin || !req.query.destination || !req.query.date || !req.query.adults) {
        response = {
            data: {
                error: "Too few params"
            },
            status: "success"
        }
        res.send(JSON.stringify(response));
    }

    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: req.query.origin,
        destinationLocationCode: req.query.destination,
        departureDate: req.query.date, //YYYY-MM-DD
        adults: req.query.adults

    }).then(function (response) {
        res.json(response.data);

    }).catch(function (responseError) {
        res.json(responseError);
    })
};

