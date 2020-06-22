import React from 'react';

import { Link, Route } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import Photo from '../Photo/Photo';
import Api from '../Api/Api';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const navLinks = [
  {
    text: 'Contact',
    path: '/contact'
  },
  {
    text: 'Profile',
    path: '/profile'
  }
]

const Header = () => (
  <div className="rmdb-header">
    {/* <div className="rmdb-header-content">
      {/* <Link to="/">
        <img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" />
      </Link>
      <img className="rmdb-tmdb-logo" src="/images/tmdb_logo.png" alt="tmdb-logo" /> 
     <nav>
        <Link to="/photo">Photo</Link>
        <Link to="/api">Api</Link>
      </nav>
          <Route
                path="/photo"
          component={Photo}
          exact 
      />
      <Route
          path="/api"
          component={Api} 
      />
     
    </div> */}
    <div className="rmdb-header-content">
    <Navbar  bg="light" expand="lg">
    <Navbar.Brand href="#home"><img className="rmdb-logo" src="/images/reactMovie_logo.png" alt="rmdb-logo" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home"> <Link to="/photo">Photo</Link></Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form> */}
      <ul className="navbar-nav nav-flex-icons">
                        <li className="nav-item">
                            <a className="nav-link"> ss
                            <FontAwesome icon="copyright" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="fab fa-twitter light-green-text-2"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i class="fab fa-instagram light-green-text-2"></i>
                            </a>
                        </li>
                    </ul>
    </Navbar.Collapse>
  </Navbar>
   <Route
                path="/photo"
          component={Photo}
          exact 
      />
  </div>
  </div>
)

export default Header;