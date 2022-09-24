import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'ca',
        access_token: 'pk.eyJ1IjoiZWZhcmlueWVzIiwiYSI6ImNsODJ1d3NwdTAxNzUzdXFxbWl6a24zanUifQ.vSAnaqYDeUVgmVnxajeeZw'
    }
})

export default searchApi;




