import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './main/navbar_container';
import MainPage from './main/main_page';
import Login from './session/login_container';
import Signup from './session/signup_container';

const App = () => (
    <div className="main">
        <NavBarContainer />
        <Switch>
            <AuthRoute exact path="/login" component={ Login } />
            <AuthRoute exact path="/signup" component={ Signup } />
            <Route exact path="/" component={ MainPage } />
        </Switch>
        <footer>
            Footer
        </footer>
    </div>
)

export default App;