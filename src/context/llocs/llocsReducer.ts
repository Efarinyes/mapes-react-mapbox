import { LlocsState } from './LlocsProvider';
import { Feature } from '../../interfaces/llocs';


type LlocsAction = 
   | { type: 'setUserLocation', payload: [ number, number ] }
   | { type: 'setLoadingLlocs'}
   | { type: 'setLlocs', payload: Feature[]}

export const llocsReducer = (state: LlocsState, action: LlocsAction ): LlocsState => {

    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setLoadingLlocs':
            return {
                ...state,
                isLoadingLlocs: true,
                llocs: []
            }    
        case 'setLlocs':
            return {
                ...state,
                isLoadingLlocs: false,
                llocs: action.payload
            } 
    
        default:
            return state;
    }

}