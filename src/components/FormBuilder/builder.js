import React,{Fragment, useEffect, useState} from "react";
import { Form, Button, InputGroup,Badge } from "react-bootstrap";
import Select from 'react-select';
import Swal from "sweetalert2";
import { AddMessage } from "../../services/MessageService";
import AsyncSelect from 'react-select/async';

// email, password, number
export default function Builder (props) {
    
    const [form, setForm] = useState(props.form);    

    useEffect(() => {
        setForm(props.form);
    }, [props.form]);

    /*
    * CALLBACKS
    */
    const HundleBeforeSubmitElements = (e) =>{
        if (!form.update){
        let bucket = {};
        let clearToLunch = true;
        let method = form.method ?? false;
        let action = form.action ?? false;
        let actionType = form.actionType ?? false;
        const clone = form;
        Object.entries(form.elements).map(([key, value])=> {
            if (value.required){
                if(value.value){
                   // Object.assign(bucket,{key: value.value});
                    bucket[key] = value.value;
                }else{
                    clearToLunch = false;
                    clone.elements[key]["errors"] = {"required": clone.elements[key].requireMessage};
                    setForm({...clone});
              
                }
            }else{
                if(value.value){
                    bucket[key] = value.value;
                }
            }
        });
        if(clearToLunch) {
            if (!form.update){
            HundleSubmitElements(bucket, method, action, actionType);
            }
        }else{
            setForm({...clone});
        }
    }
        
    }

    const HundleSubmitElements = async (bucket, method, action, actionType) => {
            if (!form.update){
                if(actionType === 'internal'){
                    try{

                        await AddMessage({
                            form: form.form_id,
                            page: form.page_id,
                            content: bucket
                        });
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your form has been submitted',
                            showConfirmButton: false,
                            timer: 1500
                          });
                          setForm(props.form);

                    }catch(error){
                        console.log('error');
                    }
                }
            }
    }

    const HundleChangeEvent = (e, key, type) =>{
        if ((type === 'text')|| (type === 'textarea') || (type === 'radio')) {
            const {name} = e.target;
            var fieldData = form;
            fieldData.elements[name]["value"] = e.target.value;
            setForm({...fieldData});
        }
        if(type === 'select'){
            var fieldData = form;
            fieldData.elements[key]["value"] = e;
            setForm({...fieldData});
        }        
        if(type === 'checkbox'){
            var name = e.target.name;
            var fieldData = form;
            var array = new Array();
            array = array || [];
            if (fieldData.elements[name]['value'] != null) {
                array = fieldData.elements[name]["value"];
                array = array || [];
            }
            if (e.target.checked) {
                array.push(e.target.value);
            } else {
                array.splice(array.indexOf(e.target.value), 1);
            }
            fieldData.elements[name]["value"] = array;
            setForm({...fieldData});
        }       
    }


    /*
    * RENDERING FORM
    */

    function  CreateElement()  {
        if (!(Object.keys(form).length === 0) && !(Object.keys(form.elements).length === 0))  {
            const rendedredItems = Object.entries(form.elements).map(([key, value]) => {
                    switch(value.type){
                        case 'text':
                            return TextElement(value,key);
                        case 'textarea':
                            return TextAreaElement(value,key);
                        case 'select':
                            return SelectElement(value,key);
                        case 'checkbox':
                            return CheckboxElement(value,key);
                        case 'radio':
                            return RadioElement(value,key);
                        
                            
                    }
                });
        
            return rendedredItems;
        }

        return (<span><pre>Your form goes here...</pre></span>);
    }


    /*
    *  RENDERING ELEMENT ERRORS
    */

    const RequiredField = (element) => {
        if (element.required) {
            return (<span className="text-danger">*</span>);
        }
        // return (<></>);
    }

  const ElementError = (errors) => {
        var er = "";
        if (errors != null) {
            er = Object.entries(errors).map(([key, err]) => {
                return (<Form.Text key={key} className="text-danger">{err}</Form.Text>)
            });
        }
        return er;
    }

    const UpdateModeElement = (name) => {
        if(form.update){
            return(<Badge name={name} bg="danger" onClick={(e) => { props.remove(name) }}>X</Badge>);
        }
    }

    /*
    *   FORM ELEMENT FUNCTIONS
    */

    const TextElement = (value,key) => {
        return (
            <div key={"field-" + key}>
                <Form.Group>
                    <Form.Label>{ UpdateModeElement(key)} {value.label} {RequiredField(value)}</Form.Label>
                    <InputGroup>
                        {value.prefix && <InputGroup.Text id="basic-addon1">{value.prefix}</InputGroup.Text>}
                        <Form.Control
                            ref={form.elements[key]["actions"]}
                            onChange={(e) => HundleChangeEvent(e, key, value.type)}
                            readOnly={value.readOnly == true ? true : false}
                            type={value.type}
                            name={key}
                            value={value.value != null ? value.value : ""}
                            placeholder={value.placeholder != null && value.placeholder}
                        />
                        {value.suffix && <InputGroup.Text id="basic-addon1">{value.suffix}</InputGroup.Text>}
                    </InputGroup>
                    {ElementError(value.errors)}
                </Form.Group>                
            </div>
        );
    }

    const TextAreaElement = (value, key) => {
        return (
            <div key={"field-" + key}>
                <Form.Group>
                    <Form.Label>{ UpdateModeElement(key)} {value.label} {RequiredField(value)}</Form.Label>
                    <textarea
                        onChange={(e) => HundleChangeEvent(e, key, value.type)}
                        ref={form.elements[key]["actions"]}
                        className="form-control"
                        type={value.type}
                        name={key}
                        readOnly={value.readOnly == true ? true : false}
                        value={value.value != null ? value.value : ""}
                        placeholder={value.placeholder != null && value.placeholder}
                    ></textarea>
                    {ElementError(value.errors)}
                </Form.Group>
            </div>
        );
    }


    const SelectElement = (value,key) => {
        return (
            <div key={"field-" + key}>
                <Form.Group>
                    <Form.Label>{ UpdateModeElement(key)} {value.label} {RequiredField(value)}</Form.Label>
                    <Select
                        name={key}
                        ref={form.elements[key]["actions"]}
                        placeholder={value.placeholder != null && value.placeholder}
                        isMulti={value.multiple != null ? value.multiple : false}
                        autoFocus={value.autofocus != null ? value.autofocus : false}
                        options={value.options}
                        value={value.value != null ? value.value : ""}
                        onChange={(e) => HundleChangeEvent(e, key, value.type)}
                        className="form-builder-select"
                    />
                    {ElementError(value.errors)}

                </Form.Group>
            </div>
        );
    }

    const RadioElement = (value, key) => {
        return (
            <div key={"field-" + key}>
                <Form.Group ref={form.elements[key]["actions"]} >
                    <Form.Label>{ UpdateModeElement(key)} {value.label} {RequiredField(value)}</Form.Label>
                    {
                        Object.entries(value.options).map(([k, v]) => {
                            var checked = false;
                            if (value != null) {
                                if (value.value == v.value) {
                                    checked = true;
                                }
                            }
                            return (<Form.Check type="radio" key={k} name={key} checked={checked} onChange={(e) => HundleChangeEvent(e, key, value.type)} label={v.label} value={v.value} />);
                        })
                    }
                    {ElementError(value.errors)}
                </Form.Group>
            </div>
        );
    }

    const  CheckboxElement = (value,key) => {
        return (
            <div key={"field-" + key}>
                <Form.Group ref={form.elements[key]["actions"]} >
                    <Form.Label>{ UpdateModeElement(key)} {value.label} {RequiredField(value)}</Form.Label>
                    {
                        Object.entries(value.options).map(([k, v]) => {
                            var ischecked = false;
                            if (value.value != null) {
                                var array = value.value;
                                array = array || [];
                                if (array.includes(v.value)) {
                                    ischecked = true;
                                }
                            }
                            return (<Form.Check key={k} type="checkbox" checked={ischecked} name={key} onChange={(e) => HundleChangeEvent(e, key, value.type)} label={v.label} value={v.value} />);
                        })
                    }
                    {ElementError(value.errors)}
                </Form.Group>
            </div>
        );
    }

    const SubmitElement = (e) => {
        if( !(Object.keys(form).length === 0) &&(form["submit"] && !(Object.keys(form.submit).length === 0) )){
            return (<Button onClick={ (e) => HundleBeforeSubmitElements(e)} className={'mt-4 btn-'+(form["submit"].color ?? 'primary')}>{form["submit"].label ?? 'Submit'}</Button>);
        }
        return (<span><pre>No submition are defined !</pre></span>);
                
    }



    return (
        <div>
            {CreateElement()}
            {SubmitElement()}
        </div>
    );
}