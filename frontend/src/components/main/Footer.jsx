import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    itemsContainerLeft: {
        fontFamily: "'Roboto Mono', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", 
        marginLeft: "5%"
    },
    itemsContainerRight: {
        fontFamily: "'Roboto Mono', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginRight: "5%"
    },
    footerItems: {
        textAlign: "initial"
    }
});


const Footer = (props) => (
    <footer>
            <div className={props.classes.itemsContainerLeft}>
                <div className={props.classes.footerItems}>Built and designed by</div>
                <div>Carly Schaaf</div>
                <a href="https://github.com/Carly-Schaaf">Github</a>
                <a href="https://www.linkedin.com/in/carlyschaaf/">LinkedIn</a>
            </div>
            <div className={props.classes.itemsContainerRight}>
            <div>Technologies:</div>
                <div>React</div>
                <div>Apollo-Client</div>
                <div>GraphQL</div>
                <div>Node.js</div>
                <div>Express</div>
                <div>MongoDB</div>
            </div>
    </footer>
)

export default withStyles(styles)(Footer);
