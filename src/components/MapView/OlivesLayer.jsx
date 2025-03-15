import { Marker } from "react-leaflet";
import L from "leaflet";

const oliveIcon = new L.Icon({
    iconUrl: "/img/olive.png",
    iconSize: [60, 60],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
});

const OlivesLayer = ({ olives }) => {
  return (
    <>
      {olives.map((o, i) => {
        if (!o.location?.coordinates) return null;
        const [lng, lat] = o.location.coordinates;
        return <Marker key={i} position={[lat, lng]}  icon={oliveIcon}/>;
      })}
    </>
  );
};

export default OlivesLayer;
