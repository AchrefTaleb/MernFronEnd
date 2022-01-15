import React from "react";
import {Outlet } from 'react-router-dom';
import PageSideBar from "../../components/commun/PageSideBar";
export default function HomePage(){
    return(        
        <div className="row pt-4">                    
            <PageSideBar />
           <div className="col-md-10">
           <div className="text-left">
            <h3>Pages management</h3>
            <hr/>
            </div>  
                <div className="p-4 mt-4">        
                <Outlet />
                </div>
            
           </div>
            
        </div>
    );

}