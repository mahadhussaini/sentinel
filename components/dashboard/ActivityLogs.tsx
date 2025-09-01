'use client'

import { useState, useEffect } from 'react'
import { 
  ClockIcon, 
  UserIcon, 
  ShieldCheckIcon,
  ComputerDesktopIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface ActivityLog {
  id: string
  timestamp: Date
  user: string
  action: string
  details: string
  status: 'success' | 'warning' | 'error'
  ip: string
}

const mockLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: 'admin@company.com',
    action: 'Login',
    details: 'Successful authentication',
    status: 'success',
    ip: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    user: 'john.doe@company.com',
    action: 'File Access',
    details: 'Accessed confidential/reports.pdf',
    status: 'warning',
    ip: '192.168.1.105'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    user: 'system',
    action: 'Security Scan',
    details: 'Completed full system scan - 0 threats found',
    status: 'success',
    ip: 'localhost'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    user: 'unknown',
    action: 'Failed Login',
    details: 'Invalid credentials attempt',
    status: 'error',
    ip: '203.45.67.89'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
    user: 'jane.smith@company.com',
    action: 'Password Change',
    details: 'Successfully updated password',
    status: 'success',
    ip: '192.168.1.102'
  }
]

const statusConfig = {
  success: {
    color: 'text-cyber-green-400',
    bgColor: 'bg-cyber-green-500/10',
    icon: ShieldCheckIcon
  },
  warning: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    icon: ClockIcon
  },
  error: {
    color: 'text-cyber-red-400',
    bgColor: 'bg-cyber-red-500/10',
    icon: ArrowRightIcon
  }
}

export default function ActivityLogs() {
  const [logs] = useState<ActivityLog[]>(mockLogs)
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter)

  const getTimeAgo = (date: Date) => {
    if (!mounted) return '--m ago'

    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  return (
    <div className="cyber-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Activity Logs</h2>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'success', 'warning', 'error'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                filter === status
                  ? 'bg-cyber-green-500 text-black'
                  : 'bg-cyber-gray-200 text-cyber-gray-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredLogs.map(log => {
          const config = statusConfig[log.status]
          const IconComponent = config.icon
          
          return (
            <div
              key={log.id}
              className={`${config.bgColor} border border-cyber-gray-200 rounded p-3 hover:bg-cyber-gray-200/20 transition-all`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <IconComponent className={`h-4 w-4 ${config.color} mt-0.5`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-white text-sm">{log.action}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${config.color} ${config.bgColor} border border-current`}>
                        {log.status}
                      </span>
                    </div>
                    <p className="text-cyber-gray-400 text-sm mb-2">{log.details}</p>
                    <div className="flex items-center space-x-4 text-xs text-cyber-gray-500">
                      <div className="flex items-center">
                        <UserIcon className="h-3 w-3 mr-1" />
                        {log.user}
                      </div>
                      <div className="flex items-center">
                        <ComputerDesktopIcon className="h-3 w-3 mr-1" />
                        {log.ip}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-cyber-gray-500 ml-4">
                  {getTimeAgo(log.timestamp)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-cyber-gray-200">
        <button className="text-cyber-green-500 hover:text-cyber-green-400 text-sm font-medium">
          View All Logs →
        </button>
      </div>
    </div>
  )
}
