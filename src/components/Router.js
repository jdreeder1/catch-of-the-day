import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

//Router function is a stateless functional component
//switch: will try the first route, if it doesn't match will try 2nd route, if neither work, will fallback to not found route

//when path exactly matches '/', render out StorePicker
//colon after / means any string of text after /store/
//the route without a path is equivalent to 404 path not found
const Router = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={StorePicker}/>
            <Route path="/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    );
}

export default Router;