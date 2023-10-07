"use client";

import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const UserAddressMap = ({
  latitude,
  longitude,
}: {
  latitude?: number;
  longitude?: number;
}) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const initialViewState = {
    zoom: 8,
    latitude,
    longitude,
  };
  return (
    latitude !== undefined &&
    longitude !== undefined && (
      <div style={{ height: "200px", width: "100%" }}>
        <Map
          onClick={() => setShowPopup(true)}
          initialViewState={initialViewState}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.MAPGL_TOKEN}
        >
          <>
            <Marker
              key="marker"
              longitude={longitude}
              latitude={latitude}
              anchor="bottom"
              onClick={() => setShowPopup(true)}
            >
              <FaMapMarkerAlt size={30} className="text-red-600" />
            </Marker>

            {showPopup && (
              <Popup
                longitude={longitude}
                latitude={latitude}
                anchor="top-left"
                onClose={() => setShowPopup(false)}
              >
                <div>
                  <h3>Location Information</h3>
                  <p>Latitude: {latitude}</p>
                  <p>Longitude: {longitude}</p>
                </div>
              </Popup>
            )}
          </>
        </Map>
      </div>
    )
  );
};

export default UserAddressMap;
