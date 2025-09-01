'use client'

import { useState, useEffect } from 'react'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  ShieldExclamationIcon
} from '@heroicons/react/24/outline'

const statusTypes = {
  safe: {
    icon: ShieldCheckIcon,
    color: 'text-cyber-green-500',
    bgColor: 'bg-cyber-green-500/20',
    borderColor: 'border-cyber-green-500/30',
    text: 'SECURE',
    description: 'All systems operating normally'
  },
  warning: {
    icon: ShieldExclamationIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    text: 'WARNING',
    description: 'Minor threats detected'
  },
  critical: {
    icon: ExclamationTriangleIcon,
    color: 'text-cyber-red-500',
    bgColor: 'bg-cyber-red-500/20',
    borderColor: 'border-cyber-red-500/30',
    text: 'CRITICAL',
    description: 'Immediate attention required'
  }
}

export default function SecurityStatus() {
  const [currentStatus, setCurrentStatus] = useState<'safe' | 'warning' | 'critical'>('safe')
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const status = statusTypes[currentStatus]

  useEffect(() => {
    // Simulate random status changes
    const interval = setInterval(() => {
      const random = Math.random()
      if (random < 0.7) setCurrentStatus('safe')
      else if (random < 0.9) setCurrentStatus('warning')
      else setCurrentStatus('critical')
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + 2
      })
    }, 50)
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Security Status</h2>
        <button
          onClick={startScan}
          disabled={isScanning}
          className="cyber-button text-xs disabled:opacity-50"
        >
          {isScanning ? 'Scanning...' : 'Quick Scan'}
        </button>
      </div>

      {/* Main Status Display */}
      <div className={`${status.bgColor} ${status.borderColor} border rounded-lg p-6 mb-6 relative overflow-hidden`}>
        {isScanning && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-green-500/20 to-transparent scanning"></div>
        )}
        <div className="flex items-center justify-center mb-4">
          <status.icon className={`h-16 w-16 ${status.color}`} />
        </div>
        <div className="text-center">
          <h3 className={`text-2xl font-bold ${status.color} mb-2`}>
            {status.text}
          </h3>
          <p className="text-cyber-gray-400 text-sm">{status.description}</p>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-cyber-gray-400">Scanning...</span>
            <span className="text-sm text-cyber-green-500">{scanProgress}%</span>
          </div>
          <div className="w-full bg-cyber-gray-200 rounded-full h-2">
            <div 
              className="bg-cyber-green-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Security Metrics */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-cyber-gray-400">Firewall</span>
          <span className="text-cyber-green-500">Active</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-cyber-gray-400">Antivirus</span>
          <span className="text-cyber-green-500">Updated</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-cyber-gray-400">VPN</span>
          <span className="text-cyber-blue-500">Connected</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-cyber-gray-400">Last Scan</span>
          <span className="text-cyber-gray-500">2 hours ago</span>
        </div>
      </div>
    </div>
  )
}
