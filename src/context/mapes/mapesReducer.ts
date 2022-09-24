/* eslint-disable import/no-webpack-loader-syntax */
//@ts-ignore
import { Map, Marker } from '!mapbox-gl';
import { MapesState } from './MapesProvider';

type MapesAction = 
    | {type: 'setMap', payload: Map}
    | { type: 'setMarcadors', payload: Marker[]}



export const mapesReducer = (state: MapesState, action: MapesAction ): MapesState => {
    switch (action.type) {
            case 'setMap':
                return {
                    ...state,
                    isMapReady: true,
                    map: action.payload
                }
            case 'setMarcadors':
                return {
                    ...state,
                    marcadors: action.payload
                }
    
        default:
           return state
    }
}