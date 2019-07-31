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
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        "margin-bottom": "20px",
    },
    listItem: {
        "display": "flex",
        "flex-direction": "column"
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
        const { abundance, accessible, ownerPermission, quality} = args;
        const publicLand = args.public;
        const adjectiveMap = {
            5: "Extremely",
            4: "Very",
            3: "Decently",
            2: "Not-so",
            1: "Not"
        }
        let publicOrPrivate;
        if (publicLand) {
            publicOrPrivate = "Totally public"
        } else {
            publicOrPrivate = `${adjectiveMap[ownerPermission]} cool with the owner`
        }
        return(
            <Grid container spacing={0}>
                <Grid item zeroMinWidth xs={6}>
                    <Typography variant="overline">
                        {adjectiveMap[abundance]} abundant
                    </Typography>
                </Grid>
                <Grid item zeroMinWidth xs={6}>
                    <Typography variant="overline">
                        {adjectiveMap[accessible]} accessible
                    </Typography>
                </Grid>
                <Grid item zeroMinWidth xs={6}>
                    <Typography variant="overline">
                        {publicOrPrivate}
                    </Typography>
                </Grid>
                <Grid item zeroMinWidth xs={6}>
                    <Typography variant="overline">
                        {adjectiveMap[quality]} high-quality stuff
                    </Typography>
                </Grid>
            </Grid>
            
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
                    {this.renderFeatures({...rest})}
                </ListItem>
            </Paper>
        ));
        return( 
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