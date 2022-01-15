import React, {useState} from "react";
import { Accordion,Badge,Button,Form } from "react-bootstrap";
import Builder from "../../components/FormBuilder/builder";
import TextElement from "../../components/FormBuilder/Elements/TextElement";
import TextAreaElement from "../../components/FormBuilder/Elements/TextAreaElement";
import SelectElement from "../../components/FormBuilder/Elements/SelectElement";
import RadioElement from "../../components/FormBuilder/Elements/RadioElement";
import CheckBoxElement from "../../components/FormBuilder/Elements/CheckBoxElement";
import { AddForm } from "../../services/FormService";
import Swal from "sweetalert2";
import JSONPretty from 'react-json-pretty';
export default function CreateForm(){



    const [form, setForm] = useState( {update:true, name:"",  method:'POST', action:false, actionType: 'internal' /* external */, "submit":{label:"submit", color:"primary"}, "elements": {}});

    /*
    * CALLBACKS
    */
    const RemoveElement = (name) => {
      const clone = form;
      delete form.elements[name];
      setForm({...clone});
    }
    const ElementCallback = (data) => {
      const clone = form;
      Object.assign(clone.elements,data);
      setForm({...clone});
    }
    
    /*
    * FORM STEUP
    */

    const DisableFormAction = () => {
      return form.actionType == 'internal' ? "disabled ": "";
    }

    const HandleFormNameChange = (e) => {
      let clone = form;
      clone.name = e.target.value;
      setForm({...clone});
    }

  const HandleFormMethodChange = (e) => {
    let clone = form;
    clone.method = e.target.value;
    setForm({...clone});
  }

  const HandleFormActionChange = (e) => {
    let clone = form;
    clone.action = e.target.value;
    setForm({...clone});
  }

  const HandleFormActionTypeChange = (e) => {
    let clone = form;
    clone.actionType = e.target.value;
    setForm({...clone});
  }

  const HandleFormSubmitLabelChange = (e) => {
    let clone = form;
    clone.submit.label = e.target.value;
    setForm({...clone});
  }

  const HandleFormSubmitColorChange = (e) => {
    let clone = form;
    clone.submit.color = e.target.value;
    setForm({...clone});
  }

  const HandleSaveForm = async() => {
    let clone = form;
    clone.update = false;
    if(clone.actionType === 'internal' ){
      clone.action = false;
      clone.method = 'POST';
    }

    try{
      await AddForm({
        name: clone.name,
        content: clone
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your page has been saved',
        showConfirmButton: false,
        timer: 1500
      });
      clone = {update:true, name:"",  method:'POST', action:false, actionType: 'internal' /* external */, "submit":{label:"submit", color:"primary"}, "elements": {}};
      setForm({...clone});
    }catch(error){
      console.log(error());
    };


  }

    return (
        <div>
            <h3>Create Form</h3>
            <div className="row">
              <div className="row">
              <div className="col-md-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter name..." value={form.name} onChange={(e) => HandleFormNameChange(e)} />
                </Form.Group>
              </div>
                <div className="col-md-3">
                <Form.Group className="mb-3" >
                    <Form.Label>Method</Form.Label><span className="text-danger">*</span>
                    <Form.Select aria-label="Default select example" value={form.method} disabled={ DisableFormAction()} onChange={(e) => HandleFormMethodChange(e)}>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </Form.Select>
                </Form.Group>
                </div>               
                <div className="col-md-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Action url</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter action url" value={form.action} disabled={ DisableFormAction()} onChange={(e) => HandleFormActionChange(e)}  />
                </Form.Group>
                </div>
                <div className="col-md-3">
                <Form.Group className="mb-3" >
                    <Form.Label>Action Type</Form.Label><span className="text-danger">*</span>
                    <Form.Select aria-label="Default select example" value={form.actionType} onChange={(e) => HandleFormActionTypeChange(e)}>
                      <option value="internal">Internal</option>
                    </Form.Select>
                </Form.Group>
                </div>
                <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Submit text</Form.Label><span className="text-danger">*</span>
                    <Form.Control type="text" placeholder="Enter name..." value={form.submit.label} onChange={(e) => HandleFormSubmitLabelChange(e)} />
                </Form.Group>
              </div>
                <div className="col-md-6">
                <Form.Group className="mb-3" >
                    <Form.Label>Submit color</Form.Label><span className="text-danger">*</span>
                    <Form.Select aria-label="Default select example" value={form.submit.color} onChange={(e) => HandleFormSubmitColorChange(e)}>
                      <option value="primary">Primary </option>
                      <option value="secondary">Secondary </option>
                      <option value="warning">Warning </option>
                      <option value="danger">Danger </option>
                    </Form.Select>
                </Form.Group>
                </div>               
              </div>
              <hr/>
              <div className="col-md-6"><Builder form={form} remove={(name) => RemoveElement(name)} /></div>
              <div className="col-md-6">
              <Accordion defaultActiveKey="">

                <Accordion.Item eventKey="text">
                  <Accordion.Header>Text Input</Accordion.Header>
                    <Accordion.Body>
                      <TextElement done={ (data) => {ElementCallback(data)}}/>
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="select">
                  <Accordion.Header>Select input</Accordion.Header>
                  <Accordion.Body>
                  <SelectElement done={ (data) => {ElementCallback(data)}}/>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="radio">
                  <Accordion.Header>Radio button</Accordion.Header>
                  <Accordion.Body>
                  <RadioElement done={ (data) => {ElementCallback(data)}}/>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="checkbox">
                  <Accordion.Header>Checkbox</Accordion.Header>
                  <Accordion.Body>
                  <CheckBoxElement done={ (data) => {ElementCallback(data)}}/>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="textarea">
                  <Accordion.Header>TextArea</Accordion.Header>
                  <Accordion.Body>
                  <TextAreaElement done={ (data) => {ElementCallback(data)}}/>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>
              </div>             
            </div>
            <hr/>
            <div className=" row col-md-12 text-center mt-3">
                  <Button size="lg" variant="primary" onClick={() => HandleSaveForm()}>Save form</Button>
              </div>
        </div>
    );
}