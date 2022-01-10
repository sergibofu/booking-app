import { Card, Button, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Flight = ({flight, iata}) => {
    const [time, setTime] = useState({
        departure:'',
        arrival: ''
    }); 
    const [date, setDate] = useState({
        arrival: '',
        departure: ''
    });
    
    useEffect(() => {
        getDepartureAndArrivalTime();
        getDepartureAndArrivalDate();
        
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

    const getDepartureAndArrivalDate = () => {
        let segmentsLength = flight.itineraries[0].segments.length;
        let itinerary = {
            departure: flight.itineraries[0].segments[0].departure.at,
            arrival: flight.itineraries[0].segments[segmentsLength-1].arrival.at

        }
        itinerary.departure = itinerary.departure.slice(5, 10);
        itinerary.arrival = itinerary.arrival.slice(5, 10);
        setDate(itinerary);
    }

    return (
        <Card className="flightInfo">
            <Card.Header className="flightCardHeader">
                <div>{flight.itineraries[0].segments[0].departure.iataCode}</div>-
                <div>{flight.itineraries[0].segments[flight.itineraries[0].segments.length-1].arrival.iataCode}</div>
            </Card.Header>
            <Card.Body className="flightCardBody">
                <Row>
                    <Col className="flightCardBodyInnerLeft flightCardBodyInner" lg={8}>
                        <div className="departureTime">
                            <div className="thiccFont bigLetter">{time.departure}</div>
                            {date.departure}
                        </div>
                        
                        <div className="arrivalTime">
                        <div className="thiccFont bigLetter">{time.arrival}</div>
                            {date.arrival}
        
                        </div>
                    </Col>
                    {/* RIGHT COL */}
                    <Col className="flightCardBodyInnerRight flightCardBodyInner" lg={4}>
                        <div className="lugageIconsContainer">
                        <FontAwesomeIcon className="lugageIcons" icon={faSuitcaseRolling}/>
                        <FontAwesomeIcon className="lugageIcons" icon={faShoppingBag}/>
                        <div className="lugageIconsSubtext">Incluido: equipaje de mano, accesorio personal</div>
                        </div>
                        
                        <div className="priceContainer">
                            <div className="price">{flight.price.total}€</div>
                            <Button className="goToFlightButton">Ver vuelo</Button>
                        </div>

                        
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    )
}

export default Flight;