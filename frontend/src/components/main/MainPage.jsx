import React from 'react'; 
import ProduceIndex from '../produces/ProduceIndex';
import MarkerManager from '../../util/marker_manager';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Query, ApolloConsumer } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Queries from '../../graphql/queries';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const { FETCH_ALL_PRODUCE } = Queries;
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

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
        
    }
});

const loader = css`
    display: block;
    margin: 50% auto;
`;

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.search = this.props.location.search;
        this.newURL = new URLSearchParams(this.search);
        this.state = {
            currentLocation: "",
            search: "",
            bounds: {
                south: "",
                east: "",
                west: "",
                north: ""
            },
            produce: [],
            loading: true,
        };
        this.clickedMarker = "";
    }

    componentDidMount() {
        this.props.history.push("/");
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this))
    }

    setPosition(position) {
        const mapOptions = {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
             },
            zoom: 10
        };

        const map = document.getElementById("map");
        this.map = new window.google.maps.Map(map, mapOptions);
        this.MarkerManager = new MarkerManager(this.map, this.setClickedMarker.bind(this));

        window.google.maps.event.addListener(this.map, 'idle', async () => {
            const { north, south, east, west } = this.map.getBounds().toJSON();
            const bounds = {
                north,
                east,
                south,
                west
            };
            await this.setState({bounds});
            this.fetchProduce(this.client);
        });

    }

    setClickedMarker(nodeId) {
        this.clickedMarker = nodeId;
    }


    // transitionUp() {
    //     const searchInput = document.getElementsByClassName("search-field")[0];
    // }

    update(field) {
        return (e) => {this.setState({[field]: e.target.value})}
    }

    fetchProduce(client) {
       return client.query({
            query: FETCH_ALL_PRODUCE,
            variables: {
                south: this.state.bounds.south,
                east: this.state.bounds.east,
                west: this.state.bounds.west,
                north: this.state.bounds.north,
                name: this.state.search
            }
       }).then(({ data }) => {
           this.MarkerManager.updateMarkers(data.produces);
           this.setState({ produce: data.produces })
       })
    }

    handleSubmit(e, client) {
        e.preventDefault();
        this.fetchProduce(client);
    }

    handleClickAway() {
        if (this.clickedMarker === "") return;
        this.clickedMarker.style.backgroundColor = "";
    }


    render() {
        const { classes } = this.props;
        return(
            <ApolloConsumer>
                {(client) => {
                    this.client = client;
                    return <div>
                        <div className="flex center top main-page-container"> 
                            <div className="flex center column map-flex-container">
                                <ClickAwayListener onClickAway={this.handleClickAway.bind(this)}>
                                    <div className="map-container">
                                        <div id="map"><ClipLoader css={loader} /></div>
                                    </div> 
                                </ClickAwayListener>
                            </div>
                            <div className="outer-produce-index-container">
                                <Paper className={classes.paper}>
                                    <form onSubmit={(e) => this.handleSubmit(e, client)}>
                                        <Typography className={classes.overrideTypography} variant="h6">Search your neigborhood for local produce:</Typography>
                                        <div className="form-container">
                                            <TextField
                                                id="outlined-produce-input"
                                                label="Try 'arugula'"
                                                margin="normal"
                                                fullWidth
                                                value={this.state.search}
                                                variant="outlined"
                                                className={classes.input}
                                                onChange={this.update("search")}
                                            />
                                            <Button type="submit" size="large" className={classes.button} variant="outlined">
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </Paper>
                                <ProduceIndex produce={this.state.produce} />
                            </div>
                        </div>
                    </div>
                }}
            </ApolloConsumer>
        )
    }
}

export default withStyles(styles)(MainPage);


