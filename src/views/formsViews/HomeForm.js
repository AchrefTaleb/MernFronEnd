import React from "react";
import {Outlet } from 'react-router-dom';
import FormSideBar from "../../components/commun/FormSideBar";
export default function HomeForm(){
    return(        
        <div className="row pt-4">                    
            <FormSideBar/>
           <div className="col-md-10">
           <div className="text-left">
            <h3>Forms management</h3>
            <hr/>
            </div>  
               <div className="p-4 mt-4">               
                <Outlet/>
               </div>               
           </div>
            
        </div>
    );

}