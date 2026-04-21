import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Map({ lat, lng, title }) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            className="h-72 w-full rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
                <Popup>{title}</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;