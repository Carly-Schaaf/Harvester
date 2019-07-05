import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="flex">
                    <Link to={'/profile'}>Profile</Link>
                    <br/>
                    <Link to={'/harvests'}>Your Harvests</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            )
        } else if (this.props.location.pathname === "/login" || this.props.location.pathname === "/signup" ) {
            return null;
        } else {
                return (
                    <div className="flex">
                        <button>
                            <Link to="/login">Login</Link>
                        </button>
                        <button>
                            <Link to="/signup">Signup</Link>
                        </button>
                    </div>
                )
            }
    }

    render() {
        return(
            <div className="flex navbar">
                <div className="flex">
                    <Link to="/"><img className="logo" src={window.images.logo} /></Link>
                    <div>harvester</div>
                </div>
                {this.getLinks()}
            </div>
        )
    }

 }

 export default withRouter(NavBar);