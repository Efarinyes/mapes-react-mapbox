//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from '!mapbox-gl';
import { createContext } from 'react';

interface MapesContextProps {
    isMapReady: boolean,
    map?: Map,
    // Metodes
    setMap: (map: Map) => void,
    obtenirRutaEntrePunts: (inici: [number, number], final: [number, number]) => Promise<void>
}



export const MapesContext = createContext({} as MapesContextProps )