// Using Maplibre
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const  WorldMap = () => {
  return (
    <Map
      initialViewState={{
        longitude: 0,
        latitude: 21.8,
        zoom: 1,
        
      }}
      minZoom={1}
      style={{width: 1000, height: 667}}
      mapStyle="https://api.maptiler.com/maps/0197251e-f92a-7cb9-98e8-774bde6e5d8e/style.json?key=FcmP3QUhWP2LWWud2CSk"
      renderWorldCopies={false}
    />
  );
}

export default WorldMap;