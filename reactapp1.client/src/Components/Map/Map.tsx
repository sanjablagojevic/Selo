import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

const position: LatLngExpression = [51.505, -0.09];

const Map: React.FC = () => {
    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <MapContainer
                center={position}
                zoom={13}
                minZoom={3}  
                maxZoom={19}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                    <Popup>A sample marker in London.</Popup>
                </Marker>
            </MapContainer>

        </div>
    );
};

export default Map;
