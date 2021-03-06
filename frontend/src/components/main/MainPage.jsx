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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { $ } from 'jquery';
const { FETCH_ALL_PRODUCE } = Queries;

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
            city: "",
            bounds: {
                south: "",
                east: "",
                west: "",
                north: ""
            },
            center:  {
                lat: 37.8811226,
                lng: -122.27595379999998
            },
            produce: [],
            loading: true,
        };
    }

    async componentDidMount() {
        this.props.history.push("/");
        await this.getLocation();
        this.setPosition();
        const city = document.getElementById("outlined-city-input");
        const options = {
            types: ['geocode']
        };
        const autocomplete = new window.google.maps.places.Autocomplete(city, options);
        window.google.maps.event.addDomListener(window, "load", autocomplete);
        let address;
        autocomplete.addListener("place_changed", (e) => {
            if (!autocomplete.getPlace().formatted_address) {
                address = autocomplete.getPlace().name;
                this.setState({
                    city: address
                });
            } else {
                address = autocomplete.getPlace().formatted_address;
                this.setState({
                    city: address
                });
            }
        });
        // comment in to make enter feature work more seamlessly
        // window.google.maps.event.addDomListener(city, 'keydown', (e) => {
        //     e.preventDefault();
        //     debugger
        //     if (e.keyCode == 13 && $('.pac-container').length) {
        //         this.setState({ city: city.value })
        //     } else if (city === e.currentTarget) {
        //         this.setState({ city: e.currentTarget.value })
        //     }
        // });
        
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(this.setCurrentLocation.bind(this))

    }

    setCurrentLocation({coords}) {
        let geocoder = new window.google.maps.Geocoder();
        let latLng = new window.google.maps.LatLng(coords.latitude, coords.longitude)
        geocoder.geocode({location: latLng}, (results, status) => {
            if (status === "OK") {
                let city;
                results[0].address_components.forEach(component => {
                    if (component.types.includes("locality")) {
                        city = component.long_name;
                    }
                })
                if (city) {
                    this.setState({city: city})
                }
            }
        })
        this.setState({
                center: {lat: coords.latitude,
                lng: coords.longitude}
            })
        if (this.map) {
            this.map.setCenter(this.state.center);
        }
    }

    setPosition() {
        const mapOptions = {
            center: {
                ...this.state.center
             },
            zoom: 14
        };

        const map = document.getElementById("map");
        this.map = new window.google.maps.Map(map, mapOptions);
        this.MarkerManager = new MarkerManager(this.map);

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

    update(field) {
        return (e) => this.setState({[field]: e.target.value})
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
           const produces = data.produces.filter(produce => produce.thumbnail);
           this.MarkerManager.updateMarkers(produces);
           this.setState({ produce: produces, loading: false })
       })
    }

    async handleSubmit(e, client) {
        e.preventDefault();
        let geocoder = new window.google.maps.Geocoder();
        let lat, lng;
        if (this.state.city) {
            geocoder.geocode({ address: this.state.city }, (results, status) => {
                if (status === "OK") {
                    lat = results[0].geometry.location.lat();
                    lng = results[0].geometry.location.lng();
                    if (this.state.center.lat !== lat 
                        && this.state.center.lng !== lng) {
                            this.setState({center: { lat, lng }});
                            this.map.setCenter({ lat, lng });
                    } else {
                        this.fetchProduce(client);
                    }
                }
            })
        } else {
            this.fetchProduce(client);
        }
    }

    // handleClickAway() {
        // if (this.clickedMarker === "") return;
        // this.clickedMarker.style.backgroundColor = "";
    // }


    render() {
        const { classes } = this.props;
        return(
            <ApolloConsumer>
                {(client) => {
                    this.client = client;
                    return <div>
                        <div className="flex center top main-page-container"> 
                            <div className="flex center column map-flex-container">
                                {/* <ClickAwayListener onClickAway={this.handleClickAway.bind(this)}> */}
                                    <div className="map-container">
                                        <div id="map"><ClipLoader css={loader} /></div>
                                    </div> 
                                {/* </ClickAwayListener> */}
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
                                            <TextField
                                                id="outlined-city-input"
                                                label="Where?"
                                                margin="normal"
                                                fullWidth
                                                value={this.state.city}
                                                variant="outlined"
                                                className={classes.input}
                                                onChange={this.update("city")}
                                            />
                                            <Button type="submit" size="large" className={classes.button} variant="outlined">
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </Paper>
                                <ProduceIndex loading={this.state.loading} produce={this.state.produce} />
                            </div>
                        </div>
                    </div>
                }}
            </ApolloConsumer>
        )
    }
}

export default withStyles(styles)(MainPage);


