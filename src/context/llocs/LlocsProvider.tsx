import { useEffect, useReducer } from 'react';
import { LlocsContext } from './LlocsContext';
import { llocsReducer } from './llocsReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';
import { Feature, LlocsResposta } from '../../interfaces/llocs';



export interface LlocsState  {
    isLoading: boolean;
    userLocation?: [ number, number];
    isLoadingLlocs: boolean;
    llocs: Feature[];
    
}
const INITIAL_STATE: LlocsState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingLlocs: false,
    llocs: []
}


interface Props {
    children: JSX.Element | JSX.Element[]
}

export const LlocsProvider = ({ children }: Props ) => {

    const [state, dispatch] = useReducer(llocsReducer, INITIAL_STATE);

    useEffect(() => {
        getUserLocation()
            .then( lngLat => dispatch({ type: 'setUserLocation', payload: lngLat}))
    }, [])
    
    const cercarLlocsPerNom = async (query: string): Promise<Feature[]> => {
        if (query.length === 0 ) {
            dispatch({ type: 'setLlocs', payload: [] })
            return []
        }
        if( !state.userLocation) throw new Error('No tenim la ubicació usuari');
        dispatch({ type: 'setLoadingLlocs'});

        const resp = await searchApi.get<LlocsResposta>(`/${ query }.json`,{
            params: {
                proximity: state.userLocation.join(',')
            }
        })
        dispatch({ type: 'setLlocs', payload: resp.data.features})
        return resp.data.features
    }
    return (
        <LlocsContext.Provider value = {{
            ...state,

            // Metodes
            cercarLlocsPerNom
        }}>
            { children }

        </LlocsContext.Provider>
    )
}
