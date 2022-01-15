import React from 'react';
import { Navbar, Container, Nav, Card } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


export default function MessageSideBar() {

return (
    <Card className="col-md-2 bg-light p-0 ">

    <Card.Header className="">Menu</Card.Header>
    <Card.Body>
    <Nav variant="pills"  className="d-none d-md-block bg-light sidebar">
        <Nav.Item>
        <LinkContainer  to="listmessage">       
        <Nav.Link >Submitions list</Nav.Link>  
        </LinkContainer>
        </Nav.Item>        
    </Nav>
    </Card.Body>
    </Card>
);

}


