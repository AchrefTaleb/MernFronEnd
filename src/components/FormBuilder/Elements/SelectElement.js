import React, { useEffect, useState } from "react";
import { Form, Button, Badge } from "react-bootstrap";


export default function SelectElement (props) {
    const [element, setElement] = useState({
        "name" : "",
        "attributes": {
            "label":"",
            "type": "select",
            "placeholder": "",
            "required": false,
            "requireMessage": "",
            "options":[]
        }       
    });

    const [option, setOption] = useState({
        "label": "",
        "value": ""
    })

    const ResetElement = () => {
        const clone = {
            "name" : "",
            "attributes": {
                "label":"",
                "type": "select",
                "placeholder": "",
                "required": false,
                "requireMessage": "",
                "options":[]
            }       
        };

        setElement({...clone});
    }

    const HandleNameChange = (e) => {
        let clone = element;
        clone.name = e.target.value;
        setElement({...clone});
    }
    const HandleLabelChange = (e) => {
        let clone = element;
        clone.attributes.label = e.target.value;
        setElement({...clone});
    }

    const HandlePlaceHolderChange = (e) => {
        let clone = element;
        clone.attributes.placeholder = e.target.value;
        setElement({...clone});
    }

    const HandleRequiredMessageChange = (e) => {
        let clone = element;
        clone.attributes.requireMessage = e.target.value;
        setElement({...clone});
    }

    const HandleRequiredChange = (e) => {
        let clone = element;
        clone.attributes.required=e.target.checked;
        setElement({...clone});
    }

    const HandleOptionLabelChange = (e) => {
        let clone = option;
        clone.label=e.target.value;
        setOption({...clone});
    }

    const HandleOptionValueChange = (e) => {
        let clone = option;
        clone.value=e.target.value;
        setOption({...clone});
    }

    const HandleOptionsChange = (e) => {
        let clone = element;
        clone.attributes.options.push({...option});
        setElement({...clone});
        let dummy = {
            "label": "",
            "value": ""
        };
        setOption({...dummy});


    }

    const HandleSubmit = () => {
        if (element.name && element.attributes.placeholder && element.attributes.requireMessage && element.attributes.required && element.attributes.label && element.attributes.options.length > 0){
            let obj = {}
            obj[element.name] = element.attributes;
            props.done(obj);
            ResetElement();
            
        }
    }

    /*
    * OPTIONS
    */
   const DisplayElementOptions = () => {
        let options = element.attributes.options.map((item, index) => {
            return (<span key={index}><Badge bg="primary" >{item.label} : {item.value}</Badge><Badge  bg="danger" onClick={(e) => { RemoveOption(index) }}>X</Badge></span>);
        });

        return options;
    }

    const RemoveOption = (index) => {
        let clone = element;
        clone.attributes.options.splice(index,1);
        setElement({...clone});

    }

    return(
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter name" value={element.name} onChange={(e) => HandleNameChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Label</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter label" value={element.attributes.label} onChange={(e) => HandleLabelChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Placeholder</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter placeholder" value={element.attributes.placeholder} onChange={(e) => HandlePlaceHolderChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Required message</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter required message" value={element.attributes.requireMessage} onChange={(e) => HandleRequiredMessageChange(e)} />
                </Form.Group>
                <Form.Label >Options</Form.Label><span className="text-danger">*</span>
                <Form.Group className="mb-3 d-flex justify-content-between "  controlId="formBasicEmail">                    
                    <Form.Control  type="text" placeholder="label..." value={option.label}  onChange={(e) => HandleOptionLabelChange(e)} />
                    <Form.Control type="text" placeholder="value..." value={option.value}  onChange={(e) => HandleOptionValueChange(e)} />
                    <Button size="sm" variant="primary" onClick={(e) => {HandleOptionsChange(e)}} >Add</Button>
                </Form.Group>

                <Form.Group className="mb-3 d-flex  "  controlId="formBasicEmail"> 
                { DisplayElementOptions()}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Required" value={element.attributes.required} onChange={(e) => HandleRequiredChange(e)} />
                </Form.Group>

                <Button variant="primary" onClick={(e) => {HandleSubmit()}}>
                    Add Element
                </Button>
            </Form>
    );
}