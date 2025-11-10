import React from "react";
import { LocationEntity } from "@/core/entities/location.entity";

interface MapTabProps {
 location: LocationEntity;
}

export function MapTab({ location }: MapTabProps) {
 return (
  <div className="h-full bg-dark-tertiary rounded-lg border border-border-primary flex items-center justify-center">
   <p className="text-text-secondary">
    Mapa para a localização: {location.coordinates.lat},{" "}
    {location.coordinates.lng}
   </p>
   {/* A integração com um mapa real (Google Maps, Leaflet, etc.) entraria aqui */}
  </div>
 );
}
