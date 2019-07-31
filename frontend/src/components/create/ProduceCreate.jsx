import React from 'react';
import { Mutation } from 'react-apollo';
import Mutations from '../../graphql/mutations';
const { NEW_PRODUCE } = Mutations;
import Queries from '../../graphql/queries';
const { FETCH_ALL_PRODUCE } = Queries;

class ProduceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            public: "",
            accessible: "",
            ownerPermission: "",
            quality: "",
            abundance: "",
            user: "",
            message: "",
            lat: "",
            lng: ""
        }
    }

    handleSubmit(e, newProduce) {
        e.preventDefault();
        const name = this.state.name;
        newProduce({
            variables: {
                name: name,
                type: this.state.type,
                public: true,
                accessible: parseInt(this.state.accessible, 10),
                ownerPermission: parseInt(this.state.ownerPermission, 10),
                quality: parseInt(this.state.quality, 10),
                abundance: parseInt(this.state.abundance, 10),
                lat: parseInt(this.state.lat, 10),
                lng: parseInt(this.state.lng, 10)
                }
        }).then(data => {
            console.log(data);
            this.setState({
                message: `${name.toUpperCase} is now harvestable. Thanks for adding to the public repository!`,
                name: "",
                type: "",
                public: "",
                accessible: "",
                ownerPermission: "",
                quality: "",
                abundance: "",
                lat: "",
                lng: ""
            })
        })
    }

    updateCache(cache, data) {
        let allProduce;
        try {
            allProduce = cache.readQuery({ query: FETCH_ALL_PRODUCE });
        } catch (err) {
            return;
        }
        if (allProduce) {
            cache.writeQuery({
                query: FETCH_ALL_PRODUCE,
                data: { produces: allProduce.concat(data.produces)}
            })
        }
    }

    update(field) {
        return (e) => {this.setState({[field]: e.target.value})}
    }

    render() {
        return(
            <Mutation update={(cache, data) => {this.updateCache(cache, data)}} mutation={ NEW_PRODUCE }>
                {(newProduce, { data }) => (
                    <div>
                        <form className="flex column left-start form" onSubmit={(e) => {this.handleSubmit(e, newProduce)}}>
                            <label>Name of item: <input type="text" onChange={this.update("name")} value={this.state.name} /></label> 
                            <label>Fruit or vegetable? <input type="text" onChange={this.update("type")} value={this.state.type} /></label>
                            <label>Is this on public land? <input type="text" onChange={this.update("public")} value={this.state.public}/></label>
                            <label>How accessible would you rate this spot? <input type="text" onChange={this.update("accessible")} value={this.state.accessible}/></label>
                            <label>If on private land, does the owner seem cool with harvesters ? <input type="text" onChange={this.update("ownerPermission")} value={this.state.ownerPermission} /></label >
                            <label>What's the quality of this item? <input type="text" onChange={this.update("quality")} value={this.state.quality}/></label>
                            <label>How abundant is this item? <input type="text" onChange={this.update("abundance")} value={this.state.abundance} /></label >
                            <label>Lat: <input type="text" onChange={this.update("lat")} value={this.state.lat} /></label >
                            <label>Lng: <input type="text" onChange={this.update("lng")} value={this.state.lng} /></label >
                            <button>Submit!</button>
                        </form>
                        <p>{this.state.message}</p>
                    </div>
                )}
            </Mutation>
        )
    }
}

export default ProduceCreate;