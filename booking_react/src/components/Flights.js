import { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import Flight from './Flight.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Flights = ({ user, baseURL }) => {
    //declaramos nuestros states
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [alert, setAlert] = useState(false);
    const [flights, setFlights] = useState([]);

    let iataCodes = {};
    //cambiar fecha
    const convertDate = (dateString) => {
        var p = dateString.split(/\D/g)
        return [p[2],p[1],p[0] ].join("-")
    }
    //metodos para recuperar origen, destinacion, fecha
    const catchOrigin = (event) => {
        setOrigin(event.target.value)
    }

    const catchDestination = (event) => {
        setDestination(event.target.value)
    }

    const catchDate = (event) => {
        setDate(event.target.value)
    }

    //alerta
    const showDangerAlert = () => {
        setOrigin('');
        setDestination('');
        setDate('');
        setAlert(true);
    }

    //guardamos nuestro token en la cabecera
    axios.defaults.headers.common = { 'Authorization': `Bearer ${user.token}` };

    //recuperamos los codigos iata de los aeropuertos
    const getAirportCodes = async () => {
        try {
            const cityOrigin = await axios.get(baseURL + '/booking/airport', {
                params: {
                    city: origin
                }
            });
    
            const cityDestination = await axios.get(baseURL + '/booking/airport', {
                params: {
                    city: destination
                }
            });

            //si el status no es success lanzamos excepcion
            if(cityDestination.data.status != 'success' || cityOrigin.data.status != 'success'){
                throw "Operacion fallida";
            }

            //si el resultado de la operacion es 0, lanzamos excepcion
            if(cityDestination.data.data.length == 0 || cityOrigin.data.data.length == 0){
                throw "Operacion fallida";
            }
            

            return {
                originIataCode: cityOrigin.data.data[0].iataCode,
                destinationIataCode: cityDestination.data.data[0].iataCode
            }
        } catch (err) {
            showDangerAlert();
        }






    }

    //recuperamos los vuelos
    const getFlights = async () =>{
        try {
            let {originIataCode, destinationIataCode} = await getAirportCodes();
            iataCodes = {origin: originIataCode, destination:destinationIataCode};
            console.log(destinationIataCode);
            console.log(originIataCode);
            let props = {
                params: {
                    origin: originIataCode,
                    destination: destinationIataCode,
                    date: date,
                    adults: 1
                }

            }
            const flightOffers = await axios.get(baseURL + '/booking/flights', props);

            if(flightOffers.data.status != 'success'){
                throw "Operacion fallida";
            }
            console.log(flightOffers.data.data)
            setFlights(flightOffers.data.data);
        } catch (err) {
            showDangerAlert();
        }

    }
    return (
        <Container className='flightsContainer'>
            
            <Row className="aboveFormRow">
                <div className='title'>
                    Compara y reserva vuelos facilmente
                    <div className='subtitle'>Descubre tu próximo destino de ensueño</div>
                </div>

            </Row>
            <Row className='formRow'>
                {/* col1 */}
                <Col className="formCol1 formCol" lg="4">
                    <InputGroup size="lg" className="mb-3 flightInputGroup">
                        <InputGroup.Text id="origin-addon"><FontAwesomeIcon swapOpacity icon={faPlane} /></InputGroup.Text>

                        <FormControl onChange={catchOrigin}
                            placeholder="¿De dónde?"
                            aria-label="large"
                            aria-describedby="origin-addon"
                            id="origin"
                            value={origin}
                        />
                    </InputGroup>
                </Col>
        
                {/* col2 */}
                <Col className="formCol2 formCol" lg="4">
                    <InputGroup size="lg" className="mb-3 flightInputGroup">
                        <FormControl onChange={catchDestination}
                            placeholder="¿A dónde?"
                            aria-label="large"
                            aria-describedby="destination-addon"
                            id="destination"
                            value={destination}
                        />
                    </InputGroup>
                </Col>

                {/* Col3 */}
                <Col className="formCol3 formCol" lg="2">
                <InputGroup size="lg" className="mb-3 flightInputGroup">
                        <FormControl onChange={catchDate}
                            type="date"
                            placeholder="Ida"
                            aria-label="large"
                            aria-describedby="date-addon"
                            id="date"
                            value={date}
                        />
                    </InputGroup>
                </Col>

                {/* Col4 */}
                <Col className="formCol4 formCol" lg="2">
                    <Button onClick={getFlights} className="flightButton" size='lg'>Buscar</Button>
                </Col>
            </Row>
            <Row>
            <Alert className='mt-3' variant='danger' hidden={!alert}>Se ha producido un error, intentelo de nuevo mas tarde</Alert>
            </Row>
            <Row className='fligtInfoRow'>
                <ul>
                {flights.map((flight, i)=>{
          
                    return(
                    
                        <Flight key={flight.id} flight={flight} iata={iataCodes}/>
                    )
                })}
                </ul>
            </Row>
        </Container>

    )
}

export default Flights;