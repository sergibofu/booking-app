import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';

const Flight = ({flight, iata}) => {
    const [time, setTime] = useState({
        departure:'',
        arrival: ''
    }); 

    useEffect(() => {
        getDepartureAndArrivalTime();
        
    }, [])


    const getDepartureAndArrivalTime = () => {
        let segmentsLength = flight.itineraries[0].segments.length;
        let itinerary = {
            departure: flight.itineraries[0].segments[0].departure.at,
            arrival: flight.itineraries[0].segments[segmentsLength-1].arrival.at

        }
        itinerary.departure = itinerary.departure.split('T')[1];
        itinerary.departure = itinerary.departure.slice(0,5);

        itinerary.arrival = itinerary.arrival.split('T')[1];
        itinerary.arrival = itinerary.arrival.slice(0,5);

        setTime(itinerary);
    }

    return (
        <Card className="flightInfo">
            <Card.Header className="flightCardHeader">
                <div>{flight.itineraries[0].segments[0].departure.iataCode}</div>
                <div>{flight.itineraries[0].segments[flight.itineraries[0].segments.length-1].arrival.iataCode}</div>
            </Card.Header>
            <Card.Body className="flightCardBody">
                <Row>
                    <Col className="flightCardBodyInnerLeft flightCardBodyInner" lg={8}>
                        <div className="departureTime">
                            <div className="thiccFont bigLetter">{time.departure}</div>
                            salida
                        </div>
                        
                        <div className="arrivalTime">
                        <div className="thiccFont bigLetter">{time.arrival}</div>
                            llegada
        
                        </div>
                    </Col>
                    <Col className="flightCardBodyInnerRight flightCardBodyInner" lg={4}>
                        {flight.price.total}€
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    )
}

export default Flight;