import React from 'react'; 
import { fetchProduce } from '../../actions/produce_actions';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

class MainPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.search = this.props.location.search;
        this.newURL = new URLSearchParams(this.search);
        this.state = {
            // lat: parseFloat(this.newURL.get("lat")),
            // lng: parseFloat(this.newURL.get("lng")),
            currentLocation: ""
        };
    }

    componentDidMount() {
        const script = document.createElement("script");
        const google = Cookies.get('google')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${google}`;
        script.type = "text/javascript";
        document.head.appendChild(script);
        this.getLocation();
    
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this))
        }
    }

    setPosition(position) {
        const mapOptions = {
            center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
             },
            zoom: 12
        };

        const map = document.getElementById("map");
        this.map = new window.google.maps.Map(map, mapOptions);
        // this.MarkerManager = new MarkerManager(this.map);

        window.google.maps.event.addListener(this.map, 'idle', () => {
            const { north, south, east, west } = this.map.getBounds().toJSON();
            const bounds = {
                north,
                east,
                south,
                west
            };
            // this.props.fetchProduce({bounds});
        });
    }

    transitionUp() {
        const searchInput = document.getElementsByClassName("search-field")[0];
    }


    render() {
        return(
            <div className="flex map-container">
             
                <div id="map">map</div>
                <div>
                    <div>what are you searching for?</div>
                    <div className="flex">
                    <input onClick={() => this.transitionUp()} className="search-field" type="text"/>
                    <input className="search-submit" type="submit" value="find"/>
                    </div>
                </div>
            </div>
        )
    }
}

const mstp = (state) => ({
})

const mdtp = (dispatch) => ({
    fetchProduce: (bounds) => (dispatch(fetchProduce(bounds)))
})

export default connect(mstp, mdtp)(MainPage);