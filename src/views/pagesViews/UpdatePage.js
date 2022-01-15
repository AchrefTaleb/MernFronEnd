import React,{ useState, useEffect}  from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GetOnePage,UpdatePage as EditPage } from "../../services/PageService";
import { GetForms } from "../../services/FormService";

export default function UpdatePage(){

    let { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const [forms, setForms] = useState({});
    const [form, setForm] = useState("");

    const fectForms = async () => {
        const response = await GetForms();
        setForms(response.data);
    }
       useEffect(() => {
        fectForms();
    }, []);

    const storePage = async () => {
        const response = await EditPage(id,{name: name, description: description, form: form});
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your changes has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  fetchPage();                  
    }

    const submit = () => {
        if(!(Object.keys(name).length === 0) && !(Object.keys(description).length === 0)) {
                storePage();
                
        }
    }

    const fetchPage = async () => {
        try{
            const response = await GetOnePage(id);
            setName(response.data.name);
            setDescription(response.data.description);
            setForm(response.data.form._id)
        }catch(error){
            navigate('/notfound');
        };
        
    }

    useEffect(() => {
        fetchPage();
        }, []);


    const RenderFormList = () => {
        const list =  Object.entries(forms).map(([key, value])=> {
             return (<option key={key} value={value._id}> { value.name} </option>);
         });
 
         return list;
     }

       
        
        return(
            <Card className="mt-4">
    
                <Card.Header className="mb-4">Create Page</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Page name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDescription">
                            <Form.Label>Page Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter description..." value={description} onChange={(e) => setDescription(e.target.value)}  />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Form</Form.Label><span className="text-danger">*</span>
                        <Form.Select aria-label="Default select example" value={form} onChange={(e) => {setForm(e.target.value); console.log(e.target.value)}}>
                        <option key="sddsd" value={false}> Select a form </option>
                        {RenderFormList()}
                        </Form.Select>
                        </Form.Group>
                        <Button className="m-3"  onClick={() => submit()}>Submit</Button>
                        <Button  variant="secondary" >Reset</Button>
                    </Form>                
                </Card.Body>
            </Card>
                   
        );  
    
}