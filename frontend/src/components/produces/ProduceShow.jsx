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
import StarBorder from '@material-ui/icons/StarBorder';
import ProduceDetail from './ProduceDetail';
import Button from '@material-ui/core/Button';
import { withApollo } from "react-apollo";
import { useQuery } from '@apollo/react-hooks';
import Queries from '../../graphql/queries';
const { FETCH_REVIEWS } = Queries;


const styles = theme => ({
    root: {
        display: "flex",
        "align-items": "flex-start",
        justifyContent: "baseline",
    },
    paper: {
        "margin-bottom": "20px",
        padding: "1em 0",
        '&:hover': {
            background: "rgba(102, 205, 170, .3)",
        }
    },
    listItem: {
        "display": "flex",
        "flex-direction": "column",
        width: "36%",
        "padding-top": "0px"
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
    button: {
        marginTop: '10px'
    }
});


const ProduceShow = ({classes, client, produce, location}) => {
    const { id, name, thumbnail, ...rest } = produce;
    const { loading, error, data } = useQuery(FETCH_REVIEWS, {
        variables: { produceId: id },
        client
    });
    if (loading) { return null };
    const reviews = data.reviews;
    let score = 0;
    if (reviews.length > 0) {
        score = reviews[0].produce.score;
    }
    const renderFeatures = (args) => {
        const { abundance, accessible, quality } = args;
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
        for (let index = 1; index <= score; index++) {
            stars.push(<Star key={Math.random()} className={classes.star} />)
            remainder -= 1;
        }
        if (remainder > 0) { stars.push(<StarHalf key={Math.random()} className={classes.starHalf} />) }
        const emptyStars = 5 - stars.length;
        for (let index = 0; index < emptyStars; index++) {
            stars.push(<StarBorder key={Math.random()} className={classes.starHalf} />)
        }
        const reviewString = numReviews > 1 ? "reviews" : "review";
        stars.push(<br key={Math.random()} />);
        stars.push(<span key={Math.random()}>{numReviews} {reviewString}</span>)
        return (
            <span>
                {stars}
            </span>
        )
    }
    const showMore = () => {
        if (location.pathname.includes(id)) {
            return(
                <ProduceDetail produce={produce} reviews={reviews} />
            )
        } else {
            return null;
        }
    }
    const displayScore = reviews.length === 0 ? "No reviews yet" : generateStars(score, reviews.length);
    
        return (
            <Paper id={id} key={Math.random()} square className={classes.paper}>
                <div className={classes.root}>
                    <ListItem className={`${classes.listItem} produce-show-list-item`} alignItems="flex-start">
                        <ListItemText primary={name} secondary={displayScore} />
                        <div>
                            <Button onClick={(e) => { 
                                e.preventDefault(); 
                                window.open(`https://www.google.com/maps/search/?api=1&query=${produce.lat},${produce.lng}`);
                            }} size="small" 
                            className={classes.button} variant="outlined">
                                Directions
                            </Button>
                        </div>
                    </ListItem>
                    {renderFeatures({ ...rest })}
                    <img className="produce-thumbnail" src={thumbnail} alt={`${name} thumbnail`} />
                </div>
                {showMore()}
            </Paper>
            )

}

export default withApollo(withStyles(styles)(withRouter(ProduceShow)));
