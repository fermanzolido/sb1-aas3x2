import React, { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { Driver } from '../types'

interface AdminPanelProps {
  addDriver: (driver: Driver) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ addDriver }) => {
  const [name, setName] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newDriver: Driver = {
      id: Date.now().toString(),
      name,
      vehicle,
      licensePlate,
      location: [0, 0], // Default location, should be updated when driver goes online
    }
    addDriver(newDriver)
    setName('')
    setVehicle('')
    setLicensePlate('')
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Panel de Administrador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Nombre del Conductor</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="vehicle" className="block mb-1">Vehículo</label>
          <input
            type="text"
            id="vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="licensePlate" className="block mb-1">Placa</label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <UserPlus className="mr-2" />
          Registrar Conductor
        </button>
      </form>
    </div>
  )
}

export default AdminPanel