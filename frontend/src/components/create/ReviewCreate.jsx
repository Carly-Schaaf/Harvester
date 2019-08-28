import React from 'react';
import { Mutation, Query } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';
import gql from 'graphql-tag';


const { NEW_REVIEW } = Mutations;
const { FETCH_SINGLE_PRODUCE, FETCH_ALL_PRODUCE, FETCH_REVIEWS } = Queries;

const styles = theme => ({
    overrideTypography: {
        fontFamily: "'Roboto Mono', monospace"
    },
    input: {
        fontFamily: "'Roboto Mono', monospace !important",
    },
    paper: {
        padding: "1.5em 2em",
        "box-shadow": "none",
        border: "1px solid rgba(0,0,0,0.12)",
        marginBottom: "2%"
    },
    button: {
        backgroundColor: "rgba(102, 205, 170, .3)"

    },
    listItem: {
        textAlign: "center"
    }
});

class ReviewCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: "",
            public: 0,
            accessible: 0,
            ownerPermission: 0,
            quality: 0,
            abundance: 0,
            messages: [],
            user: ""
        }
    }
    
    componentDidMount() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    rendermessages() {
        if (!this.state.messages.length > 0) return null;
        return this.state.messages.map((error, i) => {
            return (
                <ListItem key={i} className={this.props.classes.listItem}>
                    <ListItemText primary={error} />
                </ListItem>
            )
        })
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.checked })
        }
    }

    handleSubmit(e, newReview) {
        e.preventDefault();
        this.setState({ messages: [] });
        let newState = Object.assign({}, this.state, {produce: this.props.match.params.produceId});
        delete newState.messages;
        newReview({
            variables: {
                ...newState
            }
        }).then(({ data: { newReview } }) => {
            this.setState({
                comments: "",
                public: 0,
                accessible: 0,
                ownerPermission: 0,
                quality: 0,
                abundance: 0,
                user: "",
                messages: [`Thanks, ${newReview.user.username}! Your review has been added.`]
            })
        }, error => {
                this.setState({ messages: [error.message] })
        })

    }

    updateCache(cache, newReview) {         
        let { reviews } = cache.readQuery({ 
            variables: {
                produceId: this.props.match.params.produceId
            },
            query: FETCH_REVIEWS
         });
        cache.writeQuery({
            query: FETCH_REVIEWS,
            variables: {
                produceId: this.props.match.params.produceId
            },
            data: { reviews: reviews.concat(newReview) }
        });
        
    }

    renderPublic(ownerPermission) {
        const { classes } = this.props;
        if (ownerPermission) {
            return (
            <div>
                <Typography id="ownerPermission" gutterBottom >
                    How okay did the owner seem with you harvesting this produce?
                </Typography>
                    <br />
                    <br />
                <Slider
                    aria-labelledby="ownerPermission"
                    defaultValue={this.state.ownerPermission}
                    value={this.state.ownerPermission}
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={0}
                    max={5}
                    onChange={(e, value) => this.setState({ 'ownerPermission': value })}
                    className={classes.slider}
                />
            </div>)
        } else {
            return(
            <div>
                <Typography id="public" gutterBottom >
                    How public was this site?
                </Typography>
                    <br />
                    <br />
                <Slider
                    aria-labelledby="public"
                    defaultValue={this.state.public}
                    value={this.state.public}
                    valueLabelDisplay="on"
                    step={1}
                    marks
                    min={0}
                    max={5}
                    onChange={(e, value) => this.setState({ 'public': value })}
                    className={classes.slider}
                />
            </div>
                )
        }
    }

    render() {
        const { classes } = this.props;   
        const loader = css`
            display: block;
            margin: 50% auto;
            .css-10hh9gs-style {
                background-color: rgba(102, 205, 170, .3);
            }
        `     
        return (
            <Query query={FETCH_SINGLE_PRODUCE} variables={{id: this.props.match.params.produceId}}>
                {({data: {produce}, loading, error}) => {
                    if (loading) return(
                        <div>
                            <BounceLoader css={loader} />
                        </div>
                    )
                    if (error) return <span>{error.message}</span>
                    if (produce) {
                        return(
                            <Mutation mutation={NEW_REVIEW} update={(cache, { data: { newReview } }) => this.updateCache(cache, newReview)}>
                                {(newReview, { data }) => {
                                    return (
                                        <div>
                                                <div className="flex right">
                                                    <IconButton onClick={() => this.props.history.push(`/produces/${produce.id}`)}>
                                                        <Close />
                                                    </IconButton>
                                                </div>
                                                <form onSubmit={(e) => this.handleSubmit(e, newReview)}>
                                                    <Typography variant="h6">
                                                        {produce.name}
                                                    </Typography>
                                                    {this.renderPublic(produce.ownerPermission)}
                                                    <Typography id="accessible" gutterBottom >
                                                        How accessible was this site?
                                                    </Typography>
                                                    <br />
                                                    <br />
                                                    <Slider
                                                        aria-labelledby="accessible"
                                                        defaultValue={this.state.accessible}
                                                        value={this.state.accessible}
                                                        valueLabelDisplay="on"
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={5}
                                                        onChange={(e, value) => this.setState({ 'accessible': value })}
                                                        className={classes.slider}
                                                    />
                                                    <br />
                                                    <Typography id="quality" gutterBottom >
                                                        What was the quality of this produce?
                                                    </Typography>
                                                    <br />
                                                    <br />
                                                    <Slider
                                                        aria-labelledby="quality"
                                                        defaultValue={this.state.quality}
                                                        value={this.state.quality}
                                                        valueLabelDisplay="on"
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={5}
                                                        onChange={(e, value) => this.setState({ 'quality': value })}
                                                        className={classes.slider}
                                                    />
                                                    <br />
                                                    <Typography id="abundance" gutterBottom >
                                                        How abundant was this produce?
                                                    </Typography>
                                                    <br />
                                                    <br />
                                                    <Slider
                                                        aria-labelledby="abundance"
                                                        defaultValue={this.state.abundance}
                                                        value={this.state.abundance}
                                                        valueLabelDisplay="on"
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={5}
                                                        onChange={(e, value) => this.setState({ 'abundance': value })}
                                                        className={classes.slider}
                                                    />
                                                    <br />
                                                    <TextField
                                                        label="Any comments?"
                                                        value={this.state.comments}
                                                        margin="normal"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => this.setState({ 'comments': e.target.value })}
                                                    />
                                                    <br />
                                                    <TextField
                                                        required
                                                        label="Your display name"
                                                        value={this.state.user}
                                                        margin="normal"
                                                        variant="outlined"
                                                        fullWidth
                                                        onChange={(e) => this.setState({ 'user': e.target.value })}
                                                    />
                                                    <br />
                                                    <br />
                                                    <Button fullWidth type="submit" size="large" className={classes.button} variant="outlined">
                                                        Submit
                                                    </Button>
                                                {this.rendermessages()}
                                                </form>
                                            </div>
                                    )
                                }}
                            </Mutation>
                        )
                    }
                }}
            </Query>
        )

    }
}

export default withStyles(styles)(withRouter(ReviewCreate));

