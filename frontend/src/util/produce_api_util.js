import axios from 'axios';

export const fetchProduce = ({bounds}) => {
    return axios.get('/api/produces', {params: {
        north: bounds.north,
        west: bounds.west,
        south: bounds.south,
        east: bounds.east
    }});
}