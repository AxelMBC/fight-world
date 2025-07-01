import { useRef, useState, useEffect, useCallback } from "react";
import Map from "react-map-gl/maplibre";
import type { MapRef } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useNavigate } from "react-router-dom";

const WorldMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const navigate = useNavigate();

  const [dialog, setDialog] = useState({
    show: false,
    country: "",
    lng: 0,
    lat: 0,
    x: 0,
    y: 0,
  });

  const updateDialogPosition = useCallback(() => {
    if (dialog.show && mapRef.current) {
      const map = mapRef.current.getMap();
      const point = map.project([dialog.lng, dialog.lat]);
      setDialog((prev) => ({ ...prev, x: point.x, y: point.y }));
    }
  }, [dialog.show, dialog.lng, dialog.lat]);

  useEffect(() => {
    if (dialog.show && mapRef.current) {
      const map = mapRef.current.getMap();
      map.on("move", updateDialogPosition);
      return () => {
        map.off("move", updateDialogPosition);
      };
    }
  }, [dialog.show, updateDialogPosition]);

  const handleClick = (
    event: maplibregl.MapMouseEvent & {
      lngLat: maplibregl.LngLat;
      point: { x: number; y: number };
    }
  ) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const features = map.queryRenderedFeatures(event.point);
      if (features.length > 0 && features[0].layer.id !== "Water") {
        const countryName = features[0].layer.id;
        setDialog({
          show: true,
          country: countryName,
          lng: event.lngLat.lng,
          lat: event.lngLat.lat,
          x: event.point.x,
          y: event.point.y,
        });
        setTimeout(() => {
          setDialog((prev) => ({ ...prev, show: false }));
        }, 2000);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: 0,
          latitude: 21.8,
          zoom: 1,
        }}
        minZoom={2}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
        mapStyle="https://api.maptiler.com/maps/0197251e-f92a-7cb9-98e8-774bde6e5d8e/style.json?key=FcmP3QUhWP2LWWud2CSk"
        renderWorldCopies={false}
        onClick={handleClick}
        onDblClick={(event) => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            const features = map.queryRenderedFeatures(event.point);
            if (features.length > 0) {
              navigate(`/${features[0].layer.id}`);
              console.log("Double-clicked Country:", features[0].layer.id);
            }
          }
        }}
      />

      {dialog.show && (
        <div
          className="absolute z-[1000] px-4 py-3 rounded-md shadow-xl border-2 text-center animate-pop-in"
          style={{
            left: `${dialog.x}px`,
            top: `${dialog.y - 80}px`,
            transform: "translateX(-50%)",
            minWidth: "180px",
            background: "linear-gradient(#cc1c2a, #f89a16)",
            borderColor: "darkred",
          }}
        >
          <h4 className="mb-0 text-white font-black text-lg capitalize drop-shadow">
            {dialog.country}
          </h4>

          <div
            className="absolute"
            style={{
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid #cc1c2a",
            }}
          />
        </div>
      )}

      <style>
        {`
          @keyframes pop-in {
            0% {
              transform: translateX(-50%) scale(0.8);
              opacity: 0;
            }
            100% {
              transform: translateX(-50%) scale(1);
              opacity: 1;
            }
          }

          .animate-pop-in {
            animation: pop-in 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default WorldMap;
