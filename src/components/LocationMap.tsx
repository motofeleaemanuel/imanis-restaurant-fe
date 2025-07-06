'use client';

import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Tell Leaflet where to find its icon images:
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl:      '/leaflet/marker-icon.png',
  shadowUrl:    '/leaflet/marker-shadow.png',
});

export default function LocationMap() {
  const position: [number, number] = [38.6491, 0.0741];

  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>Our Cafeteria Location</Popup>
      </Marker>
    </MapContainer>
  );
}