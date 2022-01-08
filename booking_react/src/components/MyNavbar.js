import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './custom/nav-custom.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlane, faBed, faGlobeEurope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';

function MyNavbar() {
  return (
    <Navbar variant="dark" bg="blueNav" expand="lg">
      <Container>
        <Navbar.Brand href="#home">BookingApp.com</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navlinks">
            <div className="leftNavSection myNavSection">
            <Nav.Link className='navlink' href="/flights"><FontAwesomeIcon className='mr-5' icon={faPlane}/>  vuelos</Nav.Link>
            <Nav.Link className='navlink' href="/hotels " disabled><FontAwesomeIcon className='mr-5' icon={faBed}/> hoteles</Nav.Link>
            <Nav.Link className='navlink' href="/flightandhotel " disabled><FontAwesomeIcon className='mr-5' icon={faGlobeEurope}/> vuelo + hotel</Nav.Link>
            </div>

            <div className="rightNavSection myNavSection">
            <Nav.Link className='navlink' href="/login"><FontAwesomeIcon className='mr-5' icon={faLock}/>  login</Nav.Link>
            <Nav.Link className='navlink' href="/register "><FontAwesomeIcon className='mr-5' icon={faUser}/> register</Nav.Link> 
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar;