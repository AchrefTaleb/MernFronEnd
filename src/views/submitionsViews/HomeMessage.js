import React from "react";
import {Outlet } from 'react-router-dom';
import { Card } from "react-bootstrap";
import MessageSideBar from "../../components/commun/MessageSideBar";
export default function HomeMessage(){
    return(        
        <div className="row pt-4">                    
            <MessageSideBar />
           <div className="col-md-10">
           <div className="text-left">
            <h3>Submitions management</h3>
            <hr/>
            </div>  
                <div className="p-4 mt-4">        
                <Outlet />
                </div>
            
           </div>
            
        </div>
    );

}