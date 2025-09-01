'use client'

import { useState, useEffect } from 'react'
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon, 
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  ServerIcon
} from '@heroicons/react/24/outline'
import SecurityStatus from '@/components/dashboard/SecurityStatus'
import ThreatAlerts from '@/components/dashboard/ThreatAlerts'
import ActivityLogs from '@/components/dashboard/ActivityLogs'
import QuickStats from '@/components/dashboard/QuickStats'
import ThreatMap from '@/components/dashboard/ThreatMap'

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-cyber-gray-500 mt-1 text-sm sm:text-base">
            Real-time monitoring and threat detection
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm text-cyber-gray-500">Current Time</div>
          <div className="text-lg font-mono text-cyber-green-500">
            {mounted && currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Status */}
        <div className="lg:col-span-1">
          <SecurityStatus />
        </div>

        {/* Threat Alerts */}
        <div className="lg:col-span-2">
          <ThreatAlerts />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Activity Logs */}
        <ActivityLogs />

        {/* Threat Map */}
        <ThreatMap />
      </div>
    </div>
  )
}
