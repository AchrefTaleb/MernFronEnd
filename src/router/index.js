import React from 'react';
import { BrowserRouter, Link, Route, Routes as Switch, useLocation} from 'react-router-dom';
import TopHeader from '../components/commun/TopHeader';
import Home from '../views/home';
import HomeForm from '../views/formsViews/HomeForm';
import CreateForm from '../views/formsViews/CreateForm';
import ListForm from '../views/formsViews/ListForm';
import UpdateForm from '../views/formsViews/UpdateForm';
import HomePage from '../views/pagesViews/HomePage';
import ListPage from '../views/pagesViews/ListPage';
import NotFound from '../views/NotFound';
import CreatePage from '../views/pagesViews/CreatePage';
import UpdatePage from '../views/pagesViews/UpdatePage';
import DisplayPage from '../views/pagesViews/DisplayPage';
import HomeMessage from '../views/submitionsViews/HomeMessage';
import ListMessage from '../views/submitionsViews/ListMessage';

export default function Routes(){
    return(       
        <BrowserRouter> 
        <TopHeader/>
            <Switch>
                {/* HOME */}
                <Route exact path="/" element={<Home/>} />

                {/* FORMS */}
                <Route exact path="/homeform" element={<HomeForm/>}>
                    <Route path="createform" element={<CreateForm/>}/>
                    <Route path="listform" element={<ListForm/>}/>
                    <Route path="updateform/:id" element={<UpdateForm/>}/>
                    <Route exact path="/homeform" element={<ListForm/>}/>
                </Route>

                {/* PAGES */}
                <Route exact path="/homepage" element={<HomePage/>}>
                    <Route path="listpage" element={<ListPage/>}/>
                    <Route path="createpage" element={<CreatePage/>}/>
                    <Route path="updatepage/:id" element={<UpdatePage/>}/>
                    <Route exact path="/homepage" element={<ListPage/>}/>
                </Route>

                {/* SUBMITIONS */}
                <Route exact path="/homemessage" element={<HomeMessage/>}>
                    <Route path="listmessage" element={<ListMessage/>}/>
                    <Route exact path="/homemessage" element={<ListMessage/>}/>
                </Route>

                {/* Client display */}
                <Route exact path="/client/:id" element={<DisplayPage/>} />

                {/* 404 route */}
                <Route path="*" element={<NotFound/>} />
            </Switch>

        </BrowserRouter>
    );
}