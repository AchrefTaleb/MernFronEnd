import React,{useState, useEffect} from "react";
import { Card, Table, Form, Button, Modal } from "react-bootstrap";
import { GetMessages } from "../../services/MessageService";

export default function ListMessage() {
    
    const [messages, setMessages] = useState([]); 

    useEffect(() => {
        FetchMessages();
    },[]);

    const FetchMessages = async () =>{
            const response = await GetMessages();
            setMessages(response.data);
            
    }



    const DisplayMessageDetails = (item) => {
        if(item !== undefined) {
            const row = Object.entries(item).map(([key, value])=> {
                return (<li>{ key }: { value }</li>)
        }); 

        return row;
        }

        return "";
        
    }


    return(
        <>
        <Card className="mt-4">

            <Card.Header className="mb-4">Submitions List</Card.Header>
            <Card.Body>
            <Table striped bordered hover className="mt-2">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Form</th>
                    <th>Page</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map(item =>
                    <tr key={item._id}>
                        <td>#</td>
                        <td>{item.form.name}</td>
                        <td>{item.page.name}</td>
                        <td className="pull-right ">
                            <ul>
                            {DisplayMessageDetails(item.content)}
                            </ul>
                        </td>
                    </tr>
                         )}
                </tbody>
            </Table>
            </Card.Body>
        </Card>            
        </>
    );

}