import React, { useState } from 'react'
import { Dog, Cat, Car, UserCog } from 'lucide-react'
import DriverPanel from './components/DriverPanel'
import ClientPanel from './components/ClientPanel'
import AdminPanel from './components/AdminPanel'
import { Driver } from './types'

function App() {
  const [activePanel, setActivePanel] = useState<'driver' | 'client' | 'admin'>('client')
  const [drivers, setDrivers] = useState<Driver[]>([])

  const addDriver = (driver: Driver) => {
    setDrivers([...drivers, driver])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Dog className="mr-2" />
            <Cat className="mr-2" />
            PetRides
          </h1>
          <nav>
            <button
              className={`mr-4 ${activePanel === 'client' ? 'font-bold' : ''}`}
              onClick={() => setActivePanel('client')}
            >
              Cliente
            </button>
            <button
              className={`mr-4 ${activePanel === 'driver' ? 'font-bold' : ''}`}
              onClick={() => setActivePanel('driver')}
            >
              Conductor
            </button>
            <button
              className={activePanel === 'admin' ? 'font-bold' : ''}
              onClick={() => setActivePanel('admin')}
            >
              Admin
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto mt-8">
        {activePanel === 'driver' && <DriverPanel drivers={drivers} />}
        {activePanel === 'client' && <ClientPanel drivers={drivers} />}
        {activePanel === 'admin' && <AdminPanel addDriver={addDriver} />}
      </main>
    </div>
  )
}

export default App