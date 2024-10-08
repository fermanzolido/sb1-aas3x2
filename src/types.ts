export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  licensePlate: string;
  location: [number, number];
}

export interface Ride {
  id: string;
  client: string;
  petType: 'dog' | 'cat';
  pickup: [number, number];
  dropoff: [number, number];
  status: 'pending' | 'accepted' | 'completed';
  driverId?: string;
}