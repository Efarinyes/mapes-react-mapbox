import { useContext } from 'react';
import { MapesContext,LlocsContext } from '../context';



export const BtnLocalitzacio = () => {

  const {map, isMapReady } = useContext(MapesContext)
  const { userLocation } = useContext(LlocsContext)

  const onClick = () => {
    if( !isMapReady ) throw new Error('Mapa no disponible');
    if ( !userLocation ) throw new Error('No tenim la vostre ubicació');
    map?.flyTo({
      zoom: 15,
      center: userLocation
    })
  }

  return (
    <button className="btn btn-outline-primary"
            onClick={ onClick }
            style = {{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
    >
        Torna a casa
    </button>
  )
}
