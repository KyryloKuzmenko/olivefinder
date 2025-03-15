import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

const userIcon = new L.Icon({
  iconUrl: "/src/assets/img/bunny.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const UserPosition = ({ position }) => {
  return <Marker position={position} icon={userIcon}>
    <Popup offset={[0, 10]}>You are here</Popup>
  </Marker>;
};

export default UserPosition;
