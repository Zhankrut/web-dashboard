import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";

// Fixing default marker icon issue
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const IpLocationMap = ({ latitude, longitude, ip, as_name }) => {
    if (!latitude || !longitude) return null;

    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-300">
            <MapContainer center={[latitude, longitude]} zoom={6} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        <strong>{ip}</strong><br />
                        {as_name}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default IpLocationMap;
