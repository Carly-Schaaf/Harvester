import React from 'react';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';
import NaturePeople from '@material-ui/icons/NaturePeople';
import AccessibleForward from '@material-ui/icons/AccessibleForward';
import Add from '@material-ui/icons/Add';
import HighQuality from '@material-ui/icons/HighQuality';
import Star from '@material-ui/icons/StarRate';
import StarHalf from '@material-ui/icons/StarHalf';
import ProduceShow from './ProduceShow';

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
    listItem: {
        "display": "flex",
        "flex-direction": "column",
        width: "30%",
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
    star: {
        fontSize: "19px",
    },
    starHalf: {
        position: 'relative',
        bottom: '2.5px',
        fontSize: "15px",
    },
});


const ProduceDetail = ({ produce, classes, location }) => {
    const { id, name, score, reviews, thumbnail, ...rest } = produce;

    const renderFeatures = (args) => {
        const { abundance, accessible, ownerPermission, quality } = args;
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
            "quality stuff": quality
        },
            { [publicOrPrivate]: "publicOrPrivate" });

        const gridItems = Object.keys(features).map((feature, i) => {
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
                return (
                    <div key={i} className="grid-item-container">
                        {icon}
                        <Typography className={classes.typography} variant="overline">
                            {feature}
                        </Typography>
                    </div>
                )
            }
        })

        return (
            <div className="features-container">
                {gridItems}
            </div>

        )
    }

    const generateStars = (score, numReviews) => {
        const stars = [];
        let remainder = score;
        for (let index = 1; index < score; index++) {
            stars.push(<Star key={Math.random()} className={classes.star} />)
            remainder -= 1;
        }
        if (remainder > 0) { stars.push(<StarHalf key={Math.random()} className={classes.starHalf} />) }
        const reviewString = numReviews > 1 ? "reviews" : "review";
        stars.push(<br key={Math.random()} />);
        stars.push(<span key={Math.random()}>{numReviews} {reviewString}</span>)
        return (
            <span>
                {stars}
            </span>
        )
    }
    
    const displayScore = score === 0 ? "No reviews yet" : generateStars(score, reviews.length);
    const photo = thumbnail ? thumbnail : "https://as1.ftcdn.net/jpg/02/30/26/76/500_F_230267677_1vZFvqpLu1Sk6fITUzii9BXqs6l8ZRJR.jpg";
    
    // if (location.pathname !== `/produces/${id}`) {
    return (
        <Paper id={id} key={Math.random()} square className={classes.root}>
            <ListItem className={classes.listItem} alignItems="flex-start">
                <ListItemText primary={name} secondary={displayScore} />
            </ListItem>
            {renderFeatures({ ...rest })}
            <img className="produce-thumbnail" src={photo} alt={`${name} thumbnail`} />
        </Paper>)
    } 
    // else {
    //     return(
    //         <ProduceShow produce={produce} />
    //     )
    // }
    
// }

export default withStyles(styles)(withRouter(ProduceDetail));