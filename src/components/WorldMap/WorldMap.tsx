import { useRef, useState, useEffect } from "react";
import Map from "react-map-gl/maplibre";
import type { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate } from 'react-router-dom';

const WorldMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({ show: false, country: '', lng: 0, lat: 0, x: 0, y: 0 });

  const updateDialogPosition = () => {
    if (dialog.show && mapRef.current) {
      const map = mapRef.current.getMap();
      const point = map.project([dialog.lng, dialog.lat]);
      setDialog(prev => ({ ...prev, x: point.x, y: point.y }));
    }
  };

  useEffect(() => {
    if (dialog.show && mapRef.current) {
      const map = mapRef.current.getMap();
      map.on('move', updateDialogPosition);
      return () => {
        map.off('move', updateDialogPosition);
      };
    }
  }, [dialog.show]);

  const handleClick = (event) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const features = map.queryRenderedFeatures(event.point);
      if (features.length > 0 && features[0].layer.id !== 'Water') {
        const countryName = features[0].layer.id;
        setDialog({
          show: true,
          country: countryName,
          lng: event.lngLat.lng,
          lat: event.lngLat.lat,
          x: event.point.x,
          y: event.point.y
        });
        // Auto-close dialog after 2 seconds
        setTimeout(() => {
          setDialog(prev => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  return (
    <div className="position-relative">
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
        onClick={handleClick}
        onDblClick={(event) => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            const features = map.queryRenderedFeatures(event.point);
            navigate(`/${features[0].layer.id}`);
            console.log("Double-clicked Country:", features[0].layer.id);
          }
        }}
      />
      {dialog.show && (
        <div
          className="position-absolute bg-primary text-white rounded-3 p-3 shadow-lg"
          style={{
            left: `${dialog.x}px`,
            top: `${dialog.y - 80}px`,
            transform: 'translateX(-50%)',
            zIndex: 1000,
            minWidth: '180px',
            background: 'linear-gradient(135deg, #007bff, #00d4ff)',
            border: '2px solid #ffffff',
            animation: 'popIn 0.3s ease-out'
          }}
        >
          <h4 className="mb-0 text-center fw-bold" style={{ textTransform: 'capitalize', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            {dialog.country}
          </h4>
          {/* Speech bubble triangle */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: '10px solid #007bff'
            }}
          />
        </div>
      )}
      <style>
        {`
          @keyframes popIn {
            0% { transform: translateX(-50%) scale(0.8); opacity: 0; }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default WorldMap;