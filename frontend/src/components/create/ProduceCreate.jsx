import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
import Queries from '../../graphql/queries';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

const { NEW_PRODUCE } = Mutations;
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

    },
    icon: {

    }
});

class ProduceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            public: false,
            onwerPermission: false,
            accessible: 0,
            quality: 0,
            abundance: 0,
            city: "",
            messages: []
        }
    }

    componentDidMount() {
        const city = document.getElementById("produce-city-input");
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
    }

    rendermessages() {
        if (!this.state.messages.length > 0) return null;
        return this.state.messages.map((error, i) => {
            return(
                <ListItem key={i} className={this.props.classes.listItem} alignItems="center">
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

    handleSubmit(e, newProduce) {
        e.preventDefault();
        this.setState({messages: []});
        let that = this;
        let geocoder = new window.google.maps.Geocoder();
        let lat, lng;
        geocoder.geocode({ address: this.state.city }, (results, status) => {
            if (status === "OK") {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
                let newState = Object.assign({}, this.state);
                newState.name = newState.name.charAt(0).toUpperCase() + newState.name.slice(1);
                delete newState.city;
                delete newState.messages;
                newProduce({
                    variables: {
                        ...Object.assign(newState, { lat }, { lng })
                    }
                }).then(({data: {newProduce}}, error) => {
                    that.setState({
                        name: "",
                        public: false,
                        onwerPermission: false,
                        accessible: 0,
                        quality: 0,
                        abundance: 0,
                        city: "",
                        messages: [`Success! ${newProduce.name} has been added to Harvester.`]
                    })
                })
            } else {
                that.setState({messages: ["Hmm, that address doesn't seem to be correct."]})
            }
        })


        
    }

    updateCache(cache, newProduce) {
        const { produce } = cache.readQuery({ query: FETCH_ALL_PRODUCE });
        cache.writeQuery({
            query: FETCH_ALL_PRODUCE,
            data: { produces: produce.concat([newProduce])}
        })
    }

    render() {
        const { classes } = this.props;
   
        return (
            <Mutation mutation={NEW_PRODUCE}> 
            {/* update={(cache, { data: { newProduce }}) => this.updateCache(cache, newProduce)} */}
                {(newProduce, { data }) => {
                    return(
                        <div>                             
                                    <div className="flex right">
                                        <IconButton onClick={() => this.props.history.push("/")}>
                                            <Close />
                                        </IconButton>
                                    </div> 
                                <form onSubmit={(e) => this.handleSubmit(e, newProduce)}>
                                    <TextField
                                        required
                                        label="Name of produce"
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        value={this.state.name}
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                    <TextField
                                        required
                                        id="produce-city-input"
                                        label="Where? Enter an address"
                                        margin="normal"
                                        fullWidth
                                        variant="outlined"
                                        className={classes.input}
                                        value={this.state.city}
                                        onChange={(e) => this.setState({ city: e.target.value })}
                                    // add google autocomplete
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                required
                                                checked={this.state.public}
                                                onChange={this.update('public')}
                                                disabled={this.state.onwerPermission}
                                            />}
                                        label="Is this site on public grounds?"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                required
                                                checked={this.state.onwerPermission}
                                                disabled={this.state.public}
                                                onChange={this.update('onwerPermission')}
                                            />}
                                        label="Has the owner consented to us harvesting their produce?"
                                    />
                                    <br />
                                    <br />
                                    <Typography id="accessible" gutterBottom >
                                        How accessible is this site?
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
                                    <br />
                                    <Typography id="quality" gutterBottom >
                                        What's the quality of this produce?
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
                                    <br />
                                    <Typography id="abundance" gutterBottom >
                                        How abundant is this produce?
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
                                    <br />
                                    <Button type="submit" size="large" className={classes.button} variant="outlined">
                                        Submit
                                    </Button>
                                </form>
                                {this.rendermessages()}
                        </div>
                    )
                }}
            </Mutation>
        )

    }
}


export default withStyles(styles)(withRouter(ProduceCreate));