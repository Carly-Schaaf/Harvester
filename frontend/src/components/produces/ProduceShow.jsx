import React, { useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        margin: "0em 1em"
    },
    listItem: {
        padding: "0"
    },
    button: {
        paddingTop: "5px",
        margin: "10px 0px 10px 10px"
    }
});


const ProduceShow = ({ produce, classes, history, reviews }) => {
    const { id } = produce;
    useEffect(() => {
        const node = document.getElementById(id);
        const scrollBox = document.getElementById("scroll-container");
        scrollBox.scroll({ top: node.offsetTop, behavior: 'smooth' });
    }, [])

    const renderReviews = () => {
        if (reviews.length > 0) {
            return reviews.map((review, i) => {
                return (
                    <ListItem key={i} className={classes.listItem}>
                        <ListItemText primary={review.comments} secondary={review.user.username} />
                    </ListItem>
                )
            })
        } else {
            return(
                <Typography gutterBottom>
                    No one has reviewed this produce yet.
                </Typography>
            )
        }
    }
    
    return(
        <div className={classes.root}>
            <br />
            <div>
                <Typography gutterBottom variant="h6">
                    Wiki
                </Typography>
                <Typography gutterBottom>
                    {`${produce.description.slice(0, 500)}...`}
                </Typography>
            </div>
            <br/>
            <div>
                <Typography variant="h6">
                    Reviews
                    <Button size="small" onClick={(e) => {
                        e.preventDefault();
                        history.push(`${produce.id}/add-review`);
                    }}
                        className={classes.button} variant="outlined">
                        <Add className={classes.icon} /> Add a review
                    </Button>
                </Typography>
                {renderReviews()}
            </div>
        </div>
        );
}

export default withStyles(styles)(withRouter(ProduceShow));