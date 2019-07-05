import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
    }
    render() {
        const errors = Object.values(this.props.errors).map((error, i) => {
            return <li key={`error-${i}`}>{error}</li>
        })
        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} >
                    <input type="text" placeholder="username"
                    onChange={(e) => {this.setState({username: e.target.value})}}
                    value={this.state.username} />
                    <input type="password" placeholder="password" 
                    onChange={(e) => {this.setState({password: e.target.value})}}
                    value={this.state.password} />
                    <input type="submit" value="Sign In" onClick={this.handleSubmit.bind(this)} />
                    <ul>{errors}</ul>
                </form>
                <div>
                    New to Harvest? <Link to="/signup">Sign up instead</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: user => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);