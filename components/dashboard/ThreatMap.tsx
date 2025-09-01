'use client'

import { useState, useEffect } from 'react'
import { 
  GlobeAltIcon, 
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  MapPinIcon
} from '@heroicons/react/24/outline'

interface ThreatLocation {
  id: string
  country: string
  city: string
  lat: number
  lng: number
  threatType: 'malware' | 'phishing' | 'bruteforce' | 'ddos'
  severity: 'low' | 'medium' | 'high'
  count: number
  blocked: boolean
}

const mockThreats: ThreatLocation[] = [
  {
    id: '1',
    country: 'Russia',
    city: 'Moscow',
    lat: 55.7558,
    lng: 37.6176,
    threatType: 'bruteforce',
    severity: 'high',
    count: 247,
    blocked: true
  },
  {
    id: '2',
    country: 'China',
    city: 'Beijing',
    lat: 39.9042,
    lng: 116.4074,
    threatType: 'malware',
    severity: 'medium',
    count: 89,
    blocked: true
  },
  {
    id: '3',
    country: 'North Korea',
    city: 'Pyongyang',
    lat: 39.0392,
    lng: 125.7625,
    threatType: 'phishing',
    severity: 'high',
    count: 156,
    blocked: true
  },
  {
    id: '4',
    country: 'Iran',
    city: 'Tehran',
    lat: 35.6892,
    lng: 51.3890,
    threatType: 'ddos',
    severity: 'low',
    count: 34,
    blocked: false
  },
  {
    id: '5',
    country: 'Brazil',
    city: 'São Paulo',
    lat: -23.5505,
    lng: -46.6333,
    threatType: 'phishing',
    severity: 'medium',
    count: 67,
    blocked: true
  }
]

const threatTypeConfig = {
  malware: {
    color: 'text-cyber-red-400',
    bgColor: 'bg-cyber-red-500/20',
    name: 'Malware'
  },
  phishing: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    name: 'Phishing'
  },
  bruteforce: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    name: 'Brute Force'
  },
  ddos: {
    color: 'text-cyber-purple-400',
    bgColor: 'bg-cyber-purple-500/20',
    name: 'DDoS'
  }
}

const severityConfig = {
  low: { color: 'text-cyber-blue-400', dots: 1 },
  medium: { color: 'text-yellow-400', dots: 2 },
  high: { color: 'text-cyber-red-400', dots: 3 }
}

export default function ThreatMap() {
  const [threats] = useState<ThreatLocation[]>(mockThreats)
  const [selectedThreat, setSelectedThreat] = useState<ThreatLocation | null>(null)

  const totalThreats = threats.reduce((sum, threat) => sum + threat.count, 0)
  const blockedThreats = threats.filter(threat => threat.blocked).reduce((sum, threat) => sum + threat.count, 0)

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Global Threat Map</h2>
        <GlobeAltIcon className="h-6 w-6 text-cyber-blue-400" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-cyber-gray-200/30 rounded p-3">
          <div className="text-2xl font-bold text-cyber-red-400">{totalThreats}</div>
          <div className="text-xs text-cyber-gray-400">Total Threats</div>
        </div>
        <div className="bg-cyber-gray-200/30 rounded p-3">
          <div className="text-2xl font-bold text-cyber-green-400">{blockedThreats}</div>
          <div className="text-xs text-cyber-gray-400">Blocked</div>
        </div>
      </div>

      {/* Simplified World Map Representation */}
      <div className="bg-cyber-gray-200/10 rounded-lg p-4 mb-4 relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-blue-500/10 to-cyber-purple-500/10 rounded-lg">
          {/* Simulated map with threat indicators */}
          {threats.map(threat => {
            const config = severityConfig[threat.severity]
            const typeConfig = threatTypeConfig[threat.threatType]
            
            // Simple positioning based on lat/lng (simplified)
            const x = ((threat.lng + 180) / 360) * 100
            const y = ((90 - threat.lat) / 180) * 100
            
            return (
              <div
                key={threat.id}
                className={`absolute cursor-pointer transition-all hover:scale-110`}
                style={{ 
                  left: `${Math.max(5, Math.min(90, x))}%`, 
                  top: `${Math.max(5, Math.min(85, y))}%` 
                }}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className={`w-3 h-3 rounded-full ${threat.blocked ? 'bg-cyber-green-500' : 'bg-cyber-red-500'} animate-pulse`}>
                  <div className={`absolute inset-0 rounded-full ${threat.blocked ? 'bg-cyber-green-500' : 'bg-cyber-red-500'} animate-ping opacity-75`}></div>
                </div>
                <div className="absolute -top-1 -right-1 text-xs font-bold text-white bg-cyber-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                  {threat.count > 99 ? '99+' : threat.count}
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-4 h-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-cyber-gray-300/20"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Details */}
      {selectedThreat && (
        <div className="bg-cyber-gray-200/20 rounded p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-white">
              {selectedThreat.city}, {selectedThreat.country}
            </h3>
            <button 
              onClick={() => setSelectedThreat(null)}
              className="text-cyber-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-cyber-gray-400">Threat Type:</span>
              <span className={threatTypeConfig[selectedThreat.threatType].color}>
                {threatTypeConfig[selectedThreat.threatType].name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-gray-400">Severity:</span>
              <span className={severityConfig[selectedThreat.severity].color}>
                {selectedThreat.severity.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-gray-400">Attempts:</span>
              <span className="text-white">{selectedThreat.count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyber-gray-400">Status:</span>
              <span className={selectedThreat.blocked ? 'text-cyber-green-400' : 'text-cyber-red-400'}>
                {selectedThreat.blocked ? 'BLOCKED' : 'MONITORING'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-cyber-green-500 rounded-full mr-2"></div>
          <span className="text-cyber-gray-400">Blocked</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-cyber-red-500 rounded-full mr-2"></div>
          <span className="text-cyber-gray-400">Active Threat</span>
        </div>
      </div>
    </div>
  )
}
