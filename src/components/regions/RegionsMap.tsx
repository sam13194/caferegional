// src/components/regions/RegionsMap.tsx
"use client";

import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import type { Region } from '@/types';

interface RegionsMapProps {
  regions: Region[];
}

export default function RegionsMap({ regions }: RegionsMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-red-100 text-red-700">
        Google Maps API Key no está configurada.
      </div>
    );
  }

  const center = { lat: 7.55, lng: -72.75 };

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={center}
        defaultZoom={9}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId="cafeRegionalMap" // Optional: for custom styling in Google Cloud Console
        style={{ width: '100%', height: '100%' }}
      >
        {regions.map((region) => (
          <Marker key={region.id} position={{ lat: region.lat, lng: region.lng }} title={region.name} />
        ))}
      </Map>
    </APIProvider>
  );
}
