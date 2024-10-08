import React, { useState } from 'react'
import { Car, DollarSign } from 'lucide-react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import { Driver, Ride } from '../types'
import 'leaflet/dist/leaflet.css'

interface DriverPanelProps {
  drivers: Driver[];
}

const DriverPanel: React.FC<DriverPanelProps> = ({ drivers }) => {
  const [availableRides, setAvailableRides] = useState<Ride[]>([
    { id: '1', client: 'Ana', petType: 'dog', pickup: [40.7128, -74.0060], dropoff: [40.7484, -73.9857], status: 'pending' },
    { id: '2', client: 'Carlos', petType: 'cat', pickup: [34.0522, -118.2437], dropoff: [34.0549, -118.2426], status: 'pending' },
  ])

  const [activeRide, setActiveRide] = useState<Ride | null>(null)

  const acceptRide = (ride: Ride) => {
    setActiveRide(ride)
    setAvailableRides(availableRides.filter(r => r.id !== ride.id))
  }

  const completeRide = () => {
    setActiveRide(null)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Panel del Conductor</h2>
      {activeRide ? (
        <div>
          <div className="bg-green-100 p-4 rounded-md mb-4">
            <h3 className="font-bold mb-2">Viaje Activo</h3>
            <p>Cliente: {activeRide.client}</p>
            <p>Mascota: {activeRide.petType === 'dog' ? 'Perro' : 'Gato'}</p>
          </div>
          <MapContainer center={activeRide.pickup} zoom={13} style={{ height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={[activeRide.pickup, activeRide.dropoff]} />
          </MapContainer>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={completeRide}
          >
            Completar Viaje
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold mb-2">Viajes Disponibles</h3>
          {availableRides.map(ride => (
            <div key={ride.id} className="bg-gray-100 p-4 rounded-md mb-4">
              <p>Cliente: {ride.client}</p>
              <p>Mascota: {ride.petType === 'dog' ? 'Perro' : 'Gato'}</p>
              <MapContainer center={ride.pickup} zoom={13} style={{ height: '200px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={[ride.pickup, ride.dropoff]} />
              </MapContainer>
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => acceptRide(ride)}
                >
                  Aceptar Viaje
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setAvailableRides(availableRides.filter(r => r.id !== ride.id))}
                >
                  Rechazar Viaje
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8">
        <h3 className="font-bold mb-2">Estadísticas</h3>
        <div className="flex items-center">
          <Car className="mr-2" />
          <span>Viajes completados hoy: 5</span>
        </div>
        <div className="flex items-center mt-2">
          <DollarSign className="mr-2" />
          <span>Ganancias del día: $75.00</span>
        </div>
      </div>
    </div>
  )
}

export default DriverPanel