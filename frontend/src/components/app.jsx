import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import MainPage from './main/MainPage';
import Login from './session/login_container';
import Signup from './session/signup_container';
import ProduceCreate from './create/ProduceCreate';
import Header from './main/Header';

const App = () => (
    <div className="main">
        <Header />
        <Switch>
            <Route exact path="/produce/new" component={ ProduceCreate } />
            <Route path="/" component={ MainPage } />
        </Switch>
        <footer>
        </footer>
    </div>
)

export default App;
{/* <AuthRoute exact path="/login" component={ Login } />
<AuthRoute exact path="/signup" component={ Signup } /> */}