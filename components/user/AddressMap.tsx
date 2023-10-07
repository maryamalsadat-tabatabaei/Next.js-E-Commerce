"use client";

import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import type { MarkerDragEvent } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useCallback, useState } from "react";
import GeocoderControl from "./GeocoderControl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMap = ({
  onLocationChange,
  location,
}: {
  onLocationChange: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
  location: { [x: string]: number };
}) => {
  const initialViewState = {
    zoom: 8,
    latitude: location?.latitude || 37.8,
    longitude: location?.longitude || -122.4,
    pitch: 0,
    antialias: true,
  };
  const [marker, setMarker] = useState({
    latitude: location?.latitude || 37.8,
    longitude: location?.longitude || -122.4,
  });

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const updateMarkerPosition = useCallback((latitude: any, longitude: any) => {
    setMarker({
      latitude,
      longitude,
    });
    onLocationChange({ latitude, longitude });
  }, []);

  const manualMarkerUpdateHandler = useCallback(
    (event: MarkerDragEvent) => {
      const { lngLat } = event;
      updateMarkerPosition(lngLat.lat, lngLat.lng);
    },
    [updateMarkerPosition]
  );
  const markClickHandler = () => {
    setShowPopup(true);
  };
  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Map
        onClick={() => setShowPopup(true)}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.MAPGL_TOKEN}
        attributionControl={true}
      >
        <>
          <Marker
            key="marker"
            longitude={marker?.longitude}
            latitude={marker?.latitude}
            anchor="bottom"
            draggable
            onDrag={manualMarkerUpdateHandler}
            onClick={markClickHandler}
          >
            <FaMapMarkerAlt size={30} className="text-red-600" />
          </Marker>

          {showPopup && (
            <Popup
              longitude={marker?.longitude}
              latitude={marker?.latitude}
              anchor="top-left"
              onClose={() => setShowPopup(false)}
            >
              <div>
                <h3>Location Information</h3>
                <p>Latitude: {marker?.latitude}</p>
                <p>Longitude: {marker?.longitude}</p>
              </div>
            </Popup>
          )}
        </>
        <GeocoderControl
          mapboxAccessToken={process.env.MAPGL_TOKEN}
          position="top-left"
          updateMarkerPosition={updateMarkerPosition}
          geocoderMarker={marker}
          setGeocoderMarker={setMarker}
          onMarkerClick={markClickHandler}
        />
        <NavigationControl position="bottom-right" style={{ padding: "5px" }} />
      </Map>
    </div>
  );
};

export default MapboxMap;
