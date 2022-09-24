import { useContext, useState } from 'react';
import { LlocsContext, MapesContext } from '../context';
import { CarregantLlocs } from './';
import { Feature } from '../interfaces/llocs';



export const ResultatCercaLLocs = () => {

    const { llocs, isLoadingLlocs, userLocation } = useContext(LlocsContext)
    const { map, obtenirRutaEntrePunts } = useContext( MapesContext )
    const [activeId, setActiveId] = useState('')

    const siLlocClicat = (lloc: Feature) => {
        setActiveId(lloc.id)
        const [ lng, lat ] = lloc.center
        map?.flyTo({
            zoom: 14,
            center: [ lng, lat ]
        })
    }

    const obtenirRutes = (lloc: Feature ) => {
        if (!userLocation) return;
        const [ lng, lat ] = lloc.center
        obtenirRutaEntrePunts(userLocation, [ lng, lat ] )
        
    }

    if( isLoadingLlocs ) {
        return <CarregantLlocs />
    }
    if( llocs.length === 0 ) {
        return <></>
    }
    return (

        <ul className="list-group mt-3">

            {
                llocs.map(lloc => (
                    <li
                        key = { lloc.id }
                        className={`list-group-item list-group-item-action pointer ${ (activeId === lloc.id) ? 'active' : ''}`}
                        onClick={ () => siLlocClicat( lloc ) }
                    >
                        <h6> { lloc.text }  </h6>
                        <p 
                            style={{
                                fontSize: '12px'

                            }}
                        >
                            { lloc.place_name_ca }
                        </p>
                        <button 
                            onClick={ () => obtenirRutes(lloc) }
                            className={`btn btn-sm ${ activeId === lloc.id ? 'btn-outline-warning': 'btn-outline-primary'} `}> Ruta </button>
                    </li>
                ))

            }


        </ul>
    )
}
