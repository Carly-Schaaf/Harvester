import { connect } from 'react-redux';
import { logout, openModal } from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.session.isAuthenticated,
});

const mdtp = (dispatch) => ({
    logout: () => dispatch(logout()),
    // openModal: (type) => dispatch(openModal(type))
})


export default connect(mapStateToProps, mdtp)(NavBar);