import React from 'react';
import { Link } from "react-router-dom";
import { Query, ApolloConsumer } from "react-apollo";
import Queries from '../../graphql/queries';
const { FETCH_ALL_PRODUCE } = Queries;
import DeleteProduce from './deleteProduce';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import NaturePeople from '@material-ui/icons/NaturePeople';
import AccessibleForward from '@material-ui/icons/AccessibleForward';
import Add from '@material-ui/icons/Add';
import HighQuality from '@material-ui/icons/HighQuality';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';


const styles = theme => ({
    root: {
        "margin-bottom": "20px",
        display: "flex",
        "align-items": "baseline",
        '&:hover': {
            background: "antiquewhite",
        }
    },
    listItem: {
        "display": "flex",
        "flex-direction": "column",
        width: "50%",
        "padding-top": "0px"
    },
    typography: {
        width: "100px"
    },
    icon: {
        fontSize: "15px",
        position: 'relative',
        top: '2px',
        "margin-right": "5px"
    },
    gridItem: {
        display: "flex",
        "align-items": "baseline",
        margin: "5px 0"
    }
});


class ProduceIndex extends React.Component {

    constructor(props) {
        super(props);
    }

    renderReviews(reviews) {
        if (!reviews) {
            return null;
        } else {
            return(
                reviews.map(review => {
                    return(
                        <ListItemText key={review.id} secondary={`- ${review.comments}`}/>
                    )
                })
            )
        }
    }

    renderFeatures(args) {
        const { abundance, accessible, ownerPermission, quality } = args;
        const { classes } = this.props;
        const publicLand = args.public;
        let publicOrPrivate;
        if (publicLand) {
            publicOrPrivate = "Public"
        } else {
            publicOrPrivate = "Owner Consent"
        }

        const features = Object.assign({ 
            "abundant": abundance, 
            accessible, 
            "quality stuff": quality }, 
            {[publicOrPrivate]: "publicOrPrivate"});

        const gridItems = Object.keys(features).map((feature) => {
            if (features[feature] > 2 || (features[feature] === "publicOrPrivate")) {
                let icon;
                switch (feature) {
                    case "abundant":
                        icon = (<Add className={classes.icon} />);
                        break;
                    case "accessible":
                        icon = (<AccessibleForward className={classes.icon} />);
                        break;
                    case "quality stuff":
                        icon = (<HighQuality className={classes.icon} />);
                        break;
                    case "Public":
                        icon = (<NaturePeople className={classes.icon} />);
                        break;
                    case "Owner Consent":
                        icon = (<NaturePeople className={classes.icon} />);
                        break;
                }
                return(
                    <div className="grid-item-container">
                        {icon}
                        <Typography className={classes.typography} variant="overline">
                            {feature} 
                        </Typography>
                    </div>
                )
            }
        })
        return(
            <div className="features-container">
                {gridItems}
            </div>
            
        )
    }

    render() {
        const { classes } = this.props;
        let plural;
        let count = this.props.produce.length;
        count > 1 ? plural = " types of" : "";
        const listItems = this.props.produce.map(({ id, name, type, reviews, ...rest }, i) => (
            <Paper key={id + i} square className={classes.root}>
                <ListItem className={classes.listItem} alignItems="flex-start">
                    <ListItemText primary={name} secondary={type} />
                </ListItem>
                {this.renderFeatures({...rest})}
            </Paper>
        ));
        return (
            <div>
                <Typography align="center" variant="h4">
                        {count} harvestable{plural} produce
                    </Typography>
                    <Divider className={classes.root} />
                    <List>
                        {listItems}
                    </List>
            </div>
        )
                
    }
}

export default withStyles(styles)(ProduceIndex);