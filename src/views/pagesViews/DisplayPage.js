import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Builder from "../../components/FormBuilder/builder"
import { GetOnePage } from "../../services/PageService";
import JSONPretty from 'react-json-pretty';

export default function DisplayPage(){

    let { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [form, setForm] = useState({update:false, name:"",  method:'POST', action:false, actionType: 'internal' /* external */, "submit":{label:"submit", color:"primary"}, "elements": {}});
    useEffect(() => {
        fetchPage();
    }, []);

    const fetchPage = async () => {
        console.log('fetching');
        try{
            const response = await GetOnePage(id);
            setName(response.data.name);
            setDescription(response.data.description);
            const clone = response.data.form.content;
            clone.form_id = response.data.form._id;
            clone.page_id = id;
            clone.update = false;
            setForm({...clone});
        }catch(error){
            navigate('/notfound');
        };
        
    }


return(
    <div className="col-md-8 m-auto mt-4">
        <div className="col-md-12 text-center">
        <h1 className="text-primary">{ name }</h1>
        <p className="mt-4">{ description }</p>
        </div>
        <Builder form={form} />
    </div>
);

}