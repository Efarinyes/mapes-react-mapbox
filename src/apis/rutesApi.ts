import axios from 'axios';


const rutesApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiZWZhcmlueWVzIiwiYSI6ImNsODJ1d3NwdTAxNzUzdXFxbWl6a24zanUifQ.vSAnaqYDeUVgmVnxajeeZw'
    }
})

export default rutesApi