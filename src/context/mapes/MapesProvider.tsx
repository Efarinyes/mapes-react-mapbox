
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl"
import { useReducer, useContext, useEffect } from 'react';
import { MapesContext } from "./MapesContext";
import { mapesReducer } from "./mapesReducer";
import { LlocsContext } from '../';
import { rutesApi } from '../../apis';
import { RutesResponse } from "../../interfaces/rutes";

export interface MapesState {
    isMapReady: boolean,
    map?: Map,
    marcadors: Marker[]
}
const INITIAL_STATE: MapesState = {
    isMapReady: false,
    map: undefined,
    marcadors: []
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapesProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mapesReducer, INITIAL_STATE);
    const { llocs } = useContext(LlocsContext)


    useEffect(() => {
        state.marcadors.forEach(marcador => marcador.remove())
        const nousMarcadors: Marker[] = [];
        for (const lloc of llocs) {
            const [lng, lat] = lloc.center;
            const popup = new Popup()
                .setHTML(`
                    <h6> ${lloc.text_ca} </h6>
                    <p> ${lloc.place_name_ca} </p>
                  `)
            const nouMarcador = new Marker()
                .setPopup(popup)
                .setLngLat([lng, lat])
                .addTo(state.map!)
            nousMarcadors.push(nouMarcador)
        }
        // TODO: Netejar Polylines
        dispatch({ type: 'setMarcadors', payload: nousMarcadors })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [llocs])



    const setMap = (map: Map) => {

        const localitzacioPopUp = new Popup()
            .setHTML(`
                <h4>Soc aquí</h4>
                <p> Perdut pel mon </p>
            `)
        new Marker({
            color: 'violet'
        })
            .setLngLat(map.getCenter())
            .setPopup(localitzacioPopUp)
            .addTo(map)


        dispatch({ type: 'setMap', payload: map })
    }
    const obtenirRutaEntrePunts = async (inici: [number, number], final: [number, number]) => {
        const resp = await (rutesApi.get<RutesResponse>(`/${inici.join(',')};${final.join(',')}`));
        const { distance, duration, geometry } = resp.data.routes[0]
        const { coordinates: coords } = geometry

        let kms = distance / 1000
        kms = Math.round(kms * 100);
        kms /= 100
        const minuts = Math.floor(duration / 60);
        console.log({ kms, minuts })

        const bounds = new LngLatBounds(
            inici,
            inici
        )
        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord)
        }
        state.map?.fitBounds(bounds, {
            padding: 200
        })

        // Polylines - marquem la ruta 

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }
        // TODO: Borrar linies del mapa si ja ni ha
        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }
        
        state.map?.addSource('RouteString', sourceData)
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'pink',
                'line-width': 3
            }
        })
    }

    return (
        <MapesContext.Provider value={{
            ...state,
            // Metodes
            setMap,
            obtenirRutaEntrePunts
        }}>
            {children}

        </MapesContext.Provider>
    )
}
