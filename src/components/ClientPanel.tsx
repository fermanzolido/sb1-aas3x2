import React, { useState } from 'react'
import { MapPin, Dog, Cat } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Driver } from '../types'
import 'leaflet/dist/leaflet.css'

interface ClientPanelProps {
  drivers: Driver[];
}

const ClientPanel: React.FC<ClientPanelProps> = ({ drivers }) => {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog')
  const [pickup, setPickup] = useState<[number, number]>([0, 0])
  const [dropoff, setDropoff] = useState<[number, number]>([0, 0])
  const [rideRequested, setRideRequested] = useState(false)

  const requestRide = () => {
    if (pickup && dropoff) {
      setRideRequested(true)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Solicitar un Viaje para tu Mascota</h2>
      {!rideRequested ? (
        <form onSubmit={(e) => { e.preventDefault(); requestRide(); }}>
          <div className="mb-4">
            <label className="block mb-2">Tipo de Mascota</label>
            <div className="flex">
              <button
                type="button"
                className={`flex items-center mr-4 p-2 rounded ${petType === 'dog' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setPetType('dog')}
              >
                <Dog className="mr-2" /> Perro
              </button>
              <button
                type="button"
                className={`flex items-center p-2 rounded ${petType === 'cat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setPetType('cat')}
              >
                <Cat className="mr-2" /> Gato
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Selecciona Punto de Recogida y Entrega en el Mapa</label>
            <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {drivers.map((driver) => (
                <Marker key={driver.id} position={driver.location}>
                  <Popup>{driver.name} - {driver.vehicle}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Solicitar Viaje
          </button>
        </form>
      ) : (
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="font-bold mb-2">¡Viaje Solicitado!</h3>
          <p>Un conductor está en camino para recoger a tu {petType === 'dog' ? 'perro' : 'gato'}.</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setRideRequested(false)}
          >
            Solicitar Otro Viaje
          </button>
        </div>
      )}
    </div>
  )
}

export default ClientPanel