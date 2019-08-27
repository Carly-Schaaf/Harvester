import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './main/MainPage';
import Login from './session/login_container';
import Signup from './session/signup_container';
import ProduceCreate from './create/ProduceCreate';
import Header from './main/Header';
import Footer from './main/Footer';
import Modal from './main/Modal';

const App = () => (
    <div className="main">
        <Header />
        <Route path="/" component={ MainPage } />
        <Switch>
            <Route path="/produces/:produceId/add-review" component={ Modal } />
            <Route path="/add-produce" component={ Modal } />
        </Switch>
        <Footer />
    </div>
)

export default App;
{/* <Route exact path="/produce/new" component={ ProduceCreate } /> */}
{/* <AuthRoute exact path="/login" component={ Login } />
<AuthRoute exact path="/signup" component={ Signup } /> */}