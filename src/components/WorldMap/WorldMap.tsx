import  { useRef } from "react";
import Map from "react-map-gl/maplibre";
import type { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
  import { useNavigate } from 'react-router-dom';

const WorldMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 21.8,
        zoom: 1,
      }}
      minZoom={1}
      style={{ width: 1000, height: 667 }}
      mapStyle="https://api.maptiler.com/maps/0197251e-f92a-7cb9-98e8-774bde6e5d8e/style.json?key=FcmP3QUhWP2LWWud2CSk"
      renderWorldCopies={false}
      onDblClick={(event) => {
        if (mapRef.current) {
          const map = mapRef.current.getMap();
          const features = map.queryRenderedFeatures(event.point);
          navigate(`/${features[0].layer.id}`)
          console.log("Double-clicked Country:", features[0].layer.id);
        }
      }}
    />
  );
};

export default WorldMap;
