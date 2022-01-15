import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

export default function TopHeader(){
    return(
        <Navbar bg="primary" variant="dark">
            
        <Container> 

            <LinkContainer to="/">
                <Navbar.Brand >Technical Test</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">        
            <LinkContainer to="/homeform">
                <Nav.Link>FORMS</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/homepage">
                <Nav.Link>PAGES</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/homemessage">
                <Nav.Link>SUBMITIONS</Nav.Link>
            </LinkContainer>
            </Nav> 

        </Container>
    </Navbar>
    );
}

