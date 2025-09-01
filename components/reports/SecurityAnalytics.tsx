'use client'

import { useState, useEffect } from 'react'
import {
  ChartBarIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { ThreatChart } from './charts/ThreatChart'
import { RiskDistribution } from './charts/RiskDistribution'
import { TimelineChart } from './charts/TimelineChart'

interface MetricCard {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'stable'
  icon: any
  color: string
}

const mockMetrics: MetricCard[] = [
  {
    title: 'Total Threats Detected',
    value: '1,247',
    change: 12.5,
    trend: 'up',
    icon: ExclamationTriangleIcon,
    color: 'cyber-red'
  },
  {
    title: 'Active Security Alerts',
    value: '23',
    change: -8.2,
    trend: 'down',
    icon: ShieldCheckIcon,
    color: 'cyber-orange'
  },
  {
    title: 'System Uptime',
    value: '99.8%',
    change: 0.1,
    trend: 'up',
    icon: ArrowTrendingUpIcon,
    color: 'cyber-green'
  },
  {
    title: 'Response Time',
    value: '2.3s',
    change: -0.5,
    trend: 'down',
    icon: ChartBarIcon,
    color: 'cyber-blue'
  }
]

const timeRanges = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' }
]

export function SecurityAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(false)

  const handleTimeRangeChange = async (range: string) => {
    setIsLoading(true)
    setSelectedTimeRange(range)

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Security Analytics Dashboard</h3>
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="h-5 w-5 text-cyber-gray-400" />
            <select
              value={selectedTimeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="cyber-input text-sm py-2 px-3"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-green-500"></div>
            <span className="ml-3 text-cyber-gray-400">Loading analytics...</span>
          </div>
        )}
      </div>

      {/* Key Metrics */}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockMetrics.map((metric, index) => (
              <div key={index} className="cyber-card">
                <div className="flex items-center justify-between mb-3">
                  <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-cyber-green-400' :
                    metric.trend === 'down' ? 'text-cyber-red-400' : 'text-cyber-gray-400'
                  }`}>
                    {metric.trend === 'up' && <ArrowUpIcon className="h-4 w-4 mr-1" />}
                    {metric.trend === 'down' && <ArrowDownIcon className="h-4 w-4 mr-1" />}
                    {Math.abs(metric.change)}%
                  </div>
                </div>

                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-sm text-cyber-gray-400">{metric.title}</div>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Trends */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Threat Trends</h4>
              <ThreatChart timeRange={selectedTimeRange} />
            </div>

            {/* Risk Distribution */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Risk Distribution</h4>
              <RiskDistribution />
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Security Events Timeline</h4>
            <TimelineChart timeRange={selectedTimeRange} />
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Threat Sources */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Top Threat Sources</h4>
              <div className="space-y-3">
                {[
                  { source: 'Email Phishing', count: 145, percentage: 35 },
                  { source: 'Malicious Websites', count: 98, percentage: 24 },
                  { source: 'Network Attacks', count: 76, percentage: 18 },
                  { source: 'USB Devices', count: 54, percentage: 13 },
                  { source: 'Social Engineering', count: 32, percentage: 8 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-white">{item.source}</div>
                      <div className="w-full bg-cyber-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-cyber-red-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-cyber-gray-400 ml-3">
                      {item.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Score Trends */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Security Score Trends</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-cyber-gray-400">Current Score</span>
                  <span className="text-2xl font-bold text-cyber-green-400">87/100</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-gray-400">Firewall</span>
                    <span className="text-cyber-green-400">95/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-gray-400">Antivirus</span>
                    <span className="text-cyber-green-400">92/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-gray-400">Updates</span>
                    <span className="text-yellow-400">78/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyber-gray-400">Access Control</span>
                    <span className="text-cyber-green-400">88/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Recent Security Events</h4>
              <div className="space-y-3">
                {[
                  { event: 'Phishing Email Blocked', time: '2 hours ago', severity: 'medium' },
                  { event: 'Failed Login Attempt', time: '4 hours ago', severity: 'low' },
                  { event: 'Security Update Applied', time: '6 hours ago', severity: 'info' },
                  { event: 'Malware Scan Completed', time: '8 hours ago', severity: 'info' },
                  { event: 'Suspicious Network Traffic', time: '12 hours ago', severity: 'high' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      item.severity === 'high' ? 'bg-cyber-red-500' :
                      item.severity === 'medium' ? 'bg-yellow-500' :
                      item.severity === 'low' ? 'bg-cyber-blue-500' : 'bg-cyber-green-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-sm text-white">{item.event}</div>
                      <div className="text-xs text-cyber-gray-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Export Analytics</h4>
            <div className="flex flex-wrap gap-3">
              <button className="cyber-button">
                📊 Export PDF Report
              </button>
              <button className="cyber-button">
                📈 Export CSV Data
              </button>
              <button className="cyber-button">
                📧 Schedule Email Reports
              </button>
              <button className="cyber-button">
                🔄 Generate API Key
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
