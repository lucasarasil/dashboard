export interface Coordinates {
 lat: number;
 lng: number;
}

export interface LocationEntity {
 id: string;
 name: string;
 address: string;
 coordinates: Coordinates;
 city: string;
 state: string;
 postalCode?: string;
 country: string;
 metadata?: Record<string, unknown>;
 createdAt: Date;
 updatedAt: Date;
}

export class LocationFactory {
 static create(data: Partial<LocationEntity>): LocationEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   name: data.name ?? "",
   address: data.address ?? "",
   coordinates: data.coordinates ?? { lat: 0, lng: 0 },
   city: data.city ?? "",
   state: data.state ?? "",
   postalCode: data.postalCode,
   country: data.country ?? "Brasil",
   metadata: data.metadata,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
  };
 }

 private static generateId(): string {
  return `LOC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}

export class Distance {
 constructor(private readonly meters: number) {
  if (meters < 0) {
   throw new Error("Distance cannot be negative");
  }
 }

 getMeters(): number {
  return this.meters;
 }

 getKilometers(): number {
  return this.meters / 1000;
 }

 getMiles(): number {
  return this.meters / 1609.34;
 }

 format(): string {
  if (this.meters < 1000) {
   return `${Math.round(this.meters)}m`;
  }
  return `${(this.meters / 1000).toFixed(2)}km`;
 }

 static calculate(from: Coordinates, to: Coordinates): Distance {
  // Haversine formula
  const R = 6371e3; // Earth radius in meters
  const φ1 = (from.lat * Math.PI) / 180;
  const φ2 = (to.lat * Math.PI) / 180;
  const Δφ = ((to.lat - from.lat) * Math.PI) / 180;
  const Δλ = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
   Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
   Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return new Distance(distance);
 }
}
