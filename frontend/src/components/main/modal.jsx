import React from 'react';
import LoginFormContainer from '../session/login_container';
import SignupFormContainer from '../session/signup_container';
import { connect } from 'react-redux';

class Modal extends React.Component {
    render() {
        if (this.props.loggedIn) {
            return null;
        }
        const { modal } = this.props;

        switch (modal) {
            case "login":
                return(
                    <div className="modal-background">
                        <div className="modal-screen">
                            <LoginFormContainer />
                        </div>
                    </div>
                )
            case "signup":
                return(
                    <div className="modal-background">
                        <div className="modal-screen">
                            <SignupFormContainer />
                        </div>
                    </div>
                )
            default:
                return null;
        }

    }
}

const mstp = (state) => ({
    modal: state.ui.modal,
    loggedIn: state.session.isAuthenticated
})

export default connect(mstp, null)(Modal);