import React,{ useState, useEffect }  from "react";
import { Table, Card,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetForms } from "../../services/FormService";

export default function ListPage(){
    
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();
    const fectForms = async () => {
        const response = await GetForms();
        setForms(response.data);
    }

    const update = (id) => {      
        navigate('../updateform/'+id);
    }

       useEffect(() => {
        fectForms();
    }, []);
    return(
        <Card className="mt-4">

            <Card.Header className="mb-4">Forms List</Card.Header>
            <Card.Body>
            <Table striped bordered hover className="mt-2">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map(item =>
                    <tr key={item._id}>
                        <td>#</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="pull-right">
                            <Button variant="success" onClick={() => update(item._id)}>View / Edit</Button>
                        </td>
                    </tr>
                         )}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
               
    );
}