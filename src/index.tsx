/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

//@ts-ignore
import mapboxgl from '!mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZWZhcmlueWVzIiwiYSI6ImNsODJ1d3NwdTAxNzUzdXFxbWl6a24zanUifQ.vSAnaqYDeUVgmVnxajeeZw';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
if(!navigator.geolocation) {
  alert('El teu navegador no te opcions de Geolicalització')
  throw new Error('El teu navegador no te opcions de Geolicalització')
}

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);

