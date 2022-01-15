import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";


export default function TextAreaElement (props) {
    const [element, setElement] = useState({
        "name" : "",
        "attributes": {
            "label":"",
            "type": "textarea",
            "placeholder": "",
            "required": false,
            "requireMessage": "",
        }       
    });

    const ResetElement = () => {
        const clone = {
            "name" : "",
            "attributes": {
                "label":"",
                "type": "textarea",
                "placeholder": "",
                "required": false,
                "requireMessage": "",
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

    const HandleSubmit = () => {
        if (element.name && element.attributes.placeholder && element.attributes.requireMessage && element.attributes.required && element.attributes.label){
            const obj = {}
            obj[element.name] = element.attributes;
            props.done(obj);
            ResetElement();
            
        }
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

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Required" value={element.attributes.required} onChange={(e) => HandleRequiredChange(e)} />
                </Form.Group>

                <Button variant="primary" onClick={(e) => {HandleSubmit()}}>
                    Add Element
                </Button>
            </Form>
    );
}