import React from 'react';
import {Navbar} from 'react-bootstrap';

const NavbarComponent = () => {
    return(
        <Navbar collapseOnSelect className="d-flex justify-content-center" expand="lg" bg="dark" sticky='top'>
               <Navbar.Brand style={{color:'white'}}  href="/">Hospital Waiting Time</Navbar.Brand>
        </Navbar>
    )
}

export default NavbarComponent;