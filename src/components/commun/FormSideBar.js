import React from 'react';
import { Navbar, Container, Nav, Card } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'


export default function FormSideBar() {

return (
    <Card className="col-md-2 bg-light p-0 ">

    <Card.Header className="">Menu</Card.Header>
    <Card.Body>
    <Nav variant="pills"  className="d-none d-md-block bg-light sidebar">
        <Nav.Item>
        <LinkContainer  to="listform">       
        <Nav.Link >Form list</Nav.Link>  
        </LinkContainer>
        </Nav.Item>

        <Nav.Item>
        <LinkContainer to="createform">   
        <Nav.Link>Create New Form</Nav.Link>
        </LinkContainer>
        </Nav.Item>
        
    </Nav>
    </Card.Body>
    </Card>
);

}


{/*
    <nav className="sidebar">
                <ul>
                    <li><Link to="listform">Form list</Link></li>
                    <li><Link to="createform">Create New Form</Link></li>               
                </ul>
            </nav> 
*/}
