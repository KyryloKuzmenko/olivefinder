import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { getOlives, addOlive } from "../../services/api";
import OlivesLayer from "./OlivesLayer";
import MapEventHandler from "./MapEventHandler";
import UserPosition from "./UserPosition";

import styles from "./MapView.module.css";

const MapView = () => {
  const [olives, setOlives] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const token = localStorage.getItem("token");

  // 1) Определяем геолокацию пользователя
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setUserLocation([50.4501, 30.5234]);
        },
        {
          enableHighAccuracy: true, // gps
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setUserLocation([50.4501, 30.5234]);
    }
  }, []);

  // 2) Загружаем маркеры с бэкенда
  const fetchOlives = async () => {
    try {
      const { data } = await getOlives(token);
      setOlives(data.data);
    } catch (error) {
      console.error("Error fetching olives:", error);
    }
  };

  useEffect(() => {
    fetchOlives();

    const interval = setInterval(fetchOlives, 12000);

    return () => clearInterval(interval);
  }, [token]);

  // 3) Обработка двойного клика: добавляем новый маркер
  const handleMapDblClick = async (e) => {
    const { lat, lng } = e.latlng;
    try {
      const { data } = await addOlive(token, {
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
      });
      // Добавляем маркер, вернувшийся с сервера, в стейт
      setOlives((prev) => [...prev, data.data]);
    } catch (error) {
      console.error("Error adding olive:", error);
    }
  };

  // Если геолокация ещё не получена, показываем "Загрузка..."
  if (!userLocation) return <div>Loading map...</div>;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={userLocation}
        zoom={13}
        doubleClickZoom={false}
        className={styles.map}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <UserPosition position={userLocation} />
        <OlivesLayer olives={olives} />
        <MapEventHandler onDoubleClick={handleMapDblClick} />
      </MapContainer>
    </div>
  );
};

export default MapView;
