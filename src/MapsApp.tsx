import { LlocsProvider, MapesProvider } from './context';
import { HomeScreen } from './screens';

import './styles.css';

export const MapsApp = () => {
  return (
    <LlocsProvider>
      <MapesProvider>
          <HomeScreen />
      </MapesProvider>
       
    </LlocsProvider>
  )
}
