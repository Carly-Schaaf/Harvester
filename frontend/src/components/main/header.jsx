import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    root: {
        marginTop: ".35em",
        fontFamily: "'Roboto Mono', monospace"
    }
});


const Header = (props) => (
    <div className="header-container">
        <img src="https://static.thenounproject.com/png/1046400-200.png" alt="harvest icon"/>
        <Typography className={props.classes.root} variant="h4" align="left" gutterBottom color="inherit">
            harvester
        </Typography>
    </div>
)

export default withStyles(styles)(Header);
