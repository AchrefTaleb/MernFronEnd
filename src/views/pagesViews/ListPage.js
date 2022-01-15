import React,{ useState, useEffect }  from "react";
import { Table, Card,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetPages } from "../../services/PageService";

export default function ListPage(){
    
    const [pages, setPages] = useState([]);
    const navigate = useNavigate();
    const fectPages = async () => {
        const response = await GetPages();
        setPages(response.data);
    }

    const update = (id) => {      
        navigate('../updatepage/'+id);
    }

       useEffect(() => {
        fectPages();
    }, []);
    return(
        <Card className="mt-4">

            <Card.Header className="mb-4">Pages List</Card.Header>
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
                    {pages.map(item =>
                    <tr key={item._id}>
                        <td>#</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td className="pull-right">
                            <Button variant="primary" onClick={() => {navigate('/client/'+item._id)}}>View</Button>{' '}
                            <Button variant="success" onClick={() => update(item._id)}>Edit</Button>
                        </td>
                    </tr>
                         )}
                </tbody>
            </Table>
            </Card.Body>
        </Card>
               
    );
}


