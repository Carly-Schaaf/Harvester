import React, { useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import { ClassNames } from '@emotion/core';


const styles = theme => ({
    root: {
        "margin-bottom": "20px",
        display: "flex",
        "align-items": "flex-start",
        justifyContent: "space-between",
        padding: "1em 0",
        '&:hover': {
            background: "rgba(102, 205, 170, .3)",
        }
    },
});


const ProduceShow = ({ produce, classes }) => {
    const { id } = produce;
    useEffect(() => {
        const node = document.getElementById(id);
        const scrollBox = document.getElementById("scroll-container");
        scrollBox.scroll({ top: node.offsetTop, behavior: 'smooth' });
    }, [])

    return(
        <Paper id={id} key={Math.random()} square className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemText primary={"Hello"} />
            </ListItem>
        </Paper>
        );
}

export default withStyles(styles)(ProduceShow);