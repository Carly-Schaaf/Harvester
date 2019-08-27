import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        marginTop: ".35em",
        fontFamily: "'Roboto Mono', monospace"
    },
    button: {
        fontFamily: "'Roboto Mono', monospace",
        color: "black"
    },
    icon: {
        marginRight: ".5em"
    }
});


class Header extends React.Component {
    constructor(props) {
        super(props);
        // this.logoutUser = this.logoutUser.bind(this);
        // this.getLinks = this.getLinks.bind(this);
    }

    // logoutUser(e) {
    //     e.preventDefault();
    //     this.props.logout();
    // }

    // getLinks() {
    //     if (this.props.loggedIn) {
    //         return (
    //             <div className="header-right-container">
    //                 <Link to={'/profile'}>Profile</Link>
    //                 <br />
    //                 <Link to={'/harvests'}>Your Harvests</Link>
    //                 <Button variant="outlined" onClick={this.logoutUser}>Logout</Button>
    //             </div>
    //         )
    //         // } else if (this.props.location.pathname === "/login" || this.props.location.pathname === "/signup") {
    //         //     return null;
    //         } else {
    //             return (
    //                 <div className="header-right-container">
    //                     <Button variant="outlined">
    //                         <Link to="/login">Login</Link>
    //                     </Button>
    //                     <Button variant="outlined">
    //                         <Link to="/signup">Signup</Link>
    //                     </Button>
    //                 </div>
    //             )
    //         }
    // }

    render() {
        const { classes } = this.props;
        return(
            <div className="header-container">
                <div className="header-left-container">
                    <img src="https://static.thenounproject.com/png/1046400-200.png" alt="harvest icon" />
                    <Typography className={classes.root} variant="h4" align="left" gutterBottom color="inherit">
                        harvester
                    </Typography>
                </div>
                <div className="header-right-container">
                    <Button size="large" onClick={() => this.props.history.push("/add-produce")} variant="outlined" className={classes.button}>
                        <Add className={classes.icon} /> Add your own produce
                    </Button>
                </div>
            </div>
        )
    }

}


export default withStyles(styles)(withRouter(Header));
