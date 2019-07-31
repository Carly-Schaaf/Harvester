import React from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            xCoord: "",
            yCoord: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            lng: this.state.xCoord,
            lng: this.state.yCoord
        }
    }

    render() {
        const errors = Object.values(this.props.errors).map((error, i) => {
            return <li key={`error-${i}`}>{error}</li>
        })
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <input type="text" placeholder="username"
                        onChange={(e) => { this.setState({ username: e.target.value }) }}
                        value={this.state.username} />
                    <input type="password" placeholder="password"
                        onChange={(e) => { this.setState({ password: e.target.value }) }}
                        value={this.state.password} />
                    <input type="password" placeholder="Re-type password"
                        onChange={(e) => { this.setState({ password2: e.target.value }) }}
                        value={this.state.password2} />
                    <input type="coordinates" placeholder="Enter your x coordinate"
                        onChange={(e) => { this.setState({ xCoord: e.target.value }) }}
                        value={this.state.xCoord} />
                    <input type="coordinates" placeholder="Enter your y coordinate"
                        onChange={(e) => { this.setState({ yCoord: e.target.value }) }}
                        value={this.state.yCoord} />
                    <input type="submit" value="Sign Up" onClick={this.handleSubmit.bind(this)} />
                    <ul>{errors}</ul>
                </form>
                <div>
                    Already signed up? <Link to="/login">Log in instead</Link>
                </div>
            </div>
        )
    }
}

export default SignupForm;