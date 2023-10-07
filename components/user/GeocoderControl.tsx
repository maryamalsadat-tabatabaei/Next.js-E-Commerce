import * as React from "react";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function GeocoderControl(props: any) {
  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        ...props,
        marker: false,
        accessToken: props.mapboxAccessToken,
      });
      ctrl.on("loading", props.onLoading);
      ctrl.on("results", props.onResults);
      ctrl.on("result", (evt: any) => {
        props.onResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && props.marker) {
          <Marker
            key="geocoder-marker"
            longitude={location[0]}
            latitude={location[1]}
            onClick={props.onMarkerClick}
          >
            <FaMapMarkerAlt size={30} className="text-blue-600" />
          </Marker>;

          props.setGeocoderMarker(props.geocoderMarker);
          props.updateMarkerPosition(location[1], location[0]);
        } else {
          props.setGeocoderMarker(null);
        }
      });
      ctrl.on("error", props.onError);
      return ctrl;
    },
    {
      position: props.position,
    }
  );
  return true;
}
const noop = () => {};

GeocoderControl.defaultProps = {
  marker: true,
  onLoading: noop,
  onResults: noop,
  onResult: noop,
  onError: noop,
};
