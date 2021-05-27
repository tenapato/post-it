import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Switch, Route } from 'react-router-dom';  //Dependencies to make app multi-page

import Navbar from './components/Navbar/Navbar';

import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => (
    <BrowserRouter>
        <Container maxWidth = "LG">
            <Navbar/>
            <Switch>
                <Route path = "/" exact component = {Home} />
                <Route path = "/auth" exact component = {Auth}/>
                <Route path = "/dashboard" exact component = {Dashboard}/>
            </Switch>
        </Container>
    </BrowserRouter>
         
           

);

export default App;