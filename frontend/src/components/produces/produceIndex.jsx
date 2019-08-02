import React from 'react';
import Queries from '../../graphql/queries';
const { FETCH_ALL_PRODUCE } = Queries;
import List from '@material-ui/core/List';
import { css } from '@emotion/core';
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
import Star from '@material-ui/icons/StarRate';
import StarHalf from '@material-ui/icons/StarHalf';
import BounceLoader from 'react-spinners/BounceLoader';


const styles = theme => ({
    root: {
        "margin-bottom": "20px",
        display: "flex",
        "align-items": "baseline",
        '&:hover': {
            background: "rgba(102, 205, 170, .3)",
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
    typographyHeader: {
        fontFamily: "'Roboto Mono', monospace"
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
    },
    indexContainer: {
        height: "64vh",
        overflow: "scroll",
        padding: "40px",
        "box-shadow": "none",
        border: "1px solid rgba(0,0,0,0.12)",
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

const loader = css`
        display: block;
        margin: 50% auto;
        .css-10hh9gs-style {
            background-color: rgba(102, 205, 170, .3);
        }
    `

const ProduceIndex = (props) => {
    const { classes } = props;

    const renderFeatures = (args) => {
        const { abundance, accessible, ownerPermission, quality } = args;
        const { classes } = props;
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
            if (remainder > 0) { stars.push(<StarHalf key={Math.random()} className={classes.starHalf} />)}
            const reviewString = numReviews > 1 ? "reviews" : "review";
            stars.push(<br key={Math.random()} />);
            stars.push(<span key={Math.random()}>{numReviews} {reviewString}</span>)
            return(
                <span>
                    {stars}
                </span>
            )
        }

        const listItems = () => {
            return props.produce.map(({ id, name, score, reviews, ...rest }, i) => {
                const displayScore = score === 0 ? "No reviews yet" : generateStars(score, reviews.length);
                return (
                <Paper id={id} key={id + i} square className={classes.root}>
                    <ListItem className={classes.listItem} alignItems="flex-start">
                        <ListItemText primary={name} secondary={displayScore} />
                    </ListItem>
                    {renderFeatures({ ...rest })}
                </Paper>)
                });
        }
        const [count, setCount] = React.useState(props.produce.length);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            if (props.produce.length > 0) {
                setLoading(false);
                setCount(props.produce.length);
            }
        }, [props.produce])

        let plural;
        let display;
        count > 1 ? plural = " types of" : "";
        if (loading) {
            display = (
                <BounceLoader css={loader} />
            )
        } else {
            display = (
                <React.Fragment>
                    <Typography className={classes.typographyHeader} align="center" variant="h5">
                        {count} harvestable{plural} produce
                    </Typography>
                    <Divider className={classes.root} />
                    <List>
                        {listItems()}
                    </List>
                </React.Fragment>
            );
        }
        return (
            <Paper id={"scroll-container"} elevation={1} className={classes.indexContainer}>
                {display}
            </Paper>
        )

}
    

export default withStyles(styles)(ProduceIndex);