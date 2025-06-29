// src/components/regions/RegionsMap.tsx
"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Region } from '@/types';

interface RegionsMapProps {
  regions: Region[];
}

export default function RegionsMap({ regions }: RegionsMapProps) {
    // This effect runs on the client and fixes the default icon issue with Leaflet in React.
    useEffect(() => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
    }, []);

  const apiKey = process.env.NEXT_PUBLIC_STADIA_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-red-100 text-red-700">
        Stadia Maps API Key no está configurada.
      </div>
    );
  }

  const center: L.LatLngExpression = [7.55, -72.75]; // Centered on the general area

  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${apiKey}`}
        />
        {regions.map((region) => (
        <Marker key={region.id} position={{ lat: region.lat, lng: region.lng }}>
            <Popup>
            <b>{region.name}</b><br />
            {region.shortDescription}
            </Popup>
        </Marker>
        ))}
    </MapContainer>
  );
}
