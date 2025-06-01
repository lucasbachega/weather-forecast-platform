import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import type { FC } from "react";

interface MapProps {
  center: google.maps.LatLngLiteral;
}

const containerStyle = {
  width: "100%",
  height: "180px",
  borderRadius: "20px",
};

const Map: FC<MapProps> = ({ center }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{
          disableDefaultUI: true,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          keyboardShortcuts: false,
          clickableIcons: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
