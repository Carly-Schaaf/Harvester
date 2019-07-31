import React from 'react'; 
import ProduceIndex from '../produces/produceIndex';
import MarkerManager from '../../util/marker_manager';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Query, ApolloConsumer } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Queries from '../../graphql/queries';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const { FETCH_ALL_PRODUCE } = Queries;

const override = css`
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
    }

    componentDidMount() {
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


    render() {
        return(
            <ApolloConsumer>
                {(client) => {
                    this.client = client;
                    return <div>
                        <div className="flex center top"> 
                            <div className="flex center column map-flex-container">
                                <form onSubmit={(e) => this.handleSubmit(e, client)}>
                                    <Typography variant="h5">what are you searching for?</Typography>
                                    <TextField
                                        id="outlined-produce-input"
                                        label="Fruit, vegetable, herb..."
                                        margin="dense"
                                        value={this.state.search}
                                        fullWidth
                                        variant="outlined"
                                        margin="normal"
                                        onChange={this.update("search")}
                                    />
                                    <Button fullWidth type="submit" size="large" variant="outlined">
                                        Submit
                                    </Button>
                                </form>
                                <div className="map-container">
                                    <div id="map"><ClipLoader css={override} /></div>
                                </div> 
                            </div>
                            <div>
                                <ProduceIndex produce={this.state.produce} />
                            </div>
                        </div>
                    </div>
                }}
            </ApolloConsumer>
        )
    }
}

export default MainPage;




