'use client'

import { useState, useEffect } from 'react'
import { 
  ExclamationTriangleIcon, 
  ShieldExclamationIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface ThreatAlert {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  source: string
  isRead: boolean
}

const mockAlerts: ThreatAlert[] = [
  {
    id: '1',
    title: 'Suspicious Login Attempt',
    description: 'Failed login from IP 192.168.1.100 - Multiple attempts detected',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    source: 'Authentication System',
    isRead: false
  },
  {
    id: '2',
    title: 'Phishing Email Detected',
    description: 'Malicious email blocked from sender: fake-bank@malicious.com',
    severity: 'medium',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    source: 'Email Security',
    isRead: false
  },
  {
    id: '3',
    title: 'Unusual Network Traffic',
    description: 'High bandwidth usage detected on port 443 - Possible data exfiltration',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    source: 'Network Monitor',
    isRead: true
  },
  {
    id: '4',
    title: 'Malware Signature Detected',
    description: 'File quarantined: suspicious.exe - Trojan.Generic detected',
    severity: 'high',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    source: 'Antivirus Engine',
    isRead: false
  }
]

const severityConfig = {
  low: {
    color: 'text-cyber-blue-400',
    bgColor: 'bg-cyber-blue-500/10',
    borderColor: 'border-l-cyber-blue-500',
    icon: EyeIcon
  },
  medium: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-l-yellow-500',
    icon: ShieldExclamationIcon
  },
  high: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-l-orange-500',
    icon: ExclamationTriangleIcon
  },
  critical: {
    color: 'text-cyber-red-400',
    bgColor: 'bg-cyber-red-500/10',
    borderColor: 'border-l-cyber-red-500',
    icon: ExclamationTriangleIcon
  }
}

export default function ThreatAlerts() {
  const [alerts, setAlerts] = useState<ThreatAlert[]>(mockAlerts)
  
  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ))
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const unreadCount = alerts.filter(alert => !alert.isRead).length

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-white">Threat Alerts</h2>
          {unreadCount > 0 && (
            <span className="ml-3 bg-cyber-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-cyber-gray-400 hover:text-white text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <ShieldExclamationIcon className="h-12 w-12 text-cyber-gray-400 mx-auto mb-4" />
            <p className="text-cyber-gray-400">No active threats detected</p>
          </div>
        ) : (
          alerts.map(alert => {
            const config = severityConfig[alert.severity]
            const IconComponent = config.icon
            
            return (
              <div
                key={alert.id}
                className={`${config.bgColor} border-l-4 ${config.borderColor} p-4 rounded-r relative ${
                  !alert.isRead ? 'border-r border-t border-b border-cyber-gray-200' : ''
                }`}
                onClick={() => markAsRead(alert.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <IconComponent className={`h-5 w-5 ${config.color} mr-2`} />
                      <h3 className={`font-semibold ${!alert.isRead ? 'text-white' : 'text-cyber-gray-300'}`}>
                        {alert.title}
                      </h3>
                      <span className={`ml-2 text-xs px-2 py-1 rounded uppercase font-mono ${config.color} ${config.bgColor} border border-current`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-cyber-gray-400 text-sm mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center text-xs text-cyber-gray-500">
                      <span>{alert.source}</span>
                      <span className="mx-2">•</span>
                      <span>{getTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      dismissAlert(alert.id)
                    }}
                    className="text-cyber-gray-400 hover:text-white ml-4"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
                {!alert.isRead && (
                  <div className="absolute top-2 right-8 w-2 h-2 bg-cyber-red-500 rounded-full"></div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
