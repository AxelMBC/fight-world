import "maplibre-gl/dist/maplibre-gl.css";
import "../../styles/WorldMap/styles.scss";
import type { MapRef } from "@vis.gl/react-maplibre";

import { useRef, useState, useEffect } from "react";
import Map from "react-map-gl/maplibre";
import { useNavigate } from "react-router-dom";

const WorldMap = () => {
  const navigate = useNavigate();
    const goToCountry = (country: string) => {
    if (country) {
      navigate(`/${country}`);
    }
  };

  const mapRef = useRef<MapRef | null>(null);
  const [dialog, setDialog] = useState({
    show: false,
    country: "",
    lng: 0,
    lat: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateDialogPosition = () => {
      if (!mapRef.current) return;
      const map = mapRef.current.getMap();
      const point = map.project([dialog.lng, dialog.lat]);
      setDialog((prev) => ({ ...prev, x: point.x, y: point.y }));
    };

    if (dialog.show && mapRef.current) {
      const map = mapRef.current.getMap();
      map.on("move", updateDialogPosition);
      return () => {
        map.off("move", updateDialogPosition);
      };
    }
  }, [dialog.lat, dialog.lng, dialog.show]);

  const handleClick = (
    event: maplibregl.MapMouseEvent & {
      lngLat: maplibregl.LngLat;
      point: { x: number; y: number };
    }
  ) => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const features = map.queryRenderedFeatures(event.point);
      if (
        features.length > 0 &&
        features[0].layer.id !== "Water" &&
        features[0].layer.id !== "Country labels"
      ) {
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
        }, 3000);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <Map
        mapStyle="https://api.maptiler.com/maps/0197251e-f92a-7cb9-98e8-774bde6e5d8e/style.json?key=FcmP3QUhWP2LWWud2CSk"
        ref={mapRef}
        minZoom={2}
        renderWorldCopies={false}
        initialViewState={{
          longitude: 0,
          latitude: 21.8,
          zoom: 2,
        }}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
        onClick={handleClick}
      />

      {dialog.show && (
        <div
          className="absolute z-[1000] px-4 py-3 flex items-center justify-center rounded-md shadow-xl border-2 text-center country-label animate-pop-in"
          style={{
            left: `${dialog.x}px`,
            top: `${dialog.y - 80}px`,
            transform: "translateX(-50%)",
            minWidth: "180px",
            background: "linear-gradient(#cc1c2a, #f89a16)",
            borderColor: "darkred",
          }}
        >
          <h1 className="fc-white title-country mb-0 text-xl cursor-pointer"  onClick={() => goToCountry(dialog.country)}>
            {dialog.country}
          </h1>

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
    </div>
  );
};

export default WorldMap;
