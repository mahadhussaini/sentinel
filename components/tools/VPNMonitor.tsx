'use client'

import { useState, useEffect } from 'react'
import { ServerIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, WifiIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

interface VPNStatus {
  connected: boolean
  server: string
  location: string
  ipAddress: string
  protocol: string
  encryption: string
  ping: number
  speed: {
    download: number
    upload: number
  }
  dataUsed: number
  uptime: number
  lastHandshake: Date
  killSwitch: boolean
  dnsLeak: boolean
  webRTCLeak: boolean
}

export function VPNMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [status, setStatus] = useState<VPNStatus | null>(null)
  const [monitoringInterval, setMonitoringInterval] = useState<NodeJS.Timeout | null>(null)

  const startMonitoring = () => {
    setIsMonitoring(true)

    // Mock VPN status
    const mockStatus: VPNStatus = {
      connected: Math.random() > 0.1, // 90% chance of connected
      server: 'US-NYC-001',
      location: 'New York, USA',
      ipAddress: '104.28.15.120',
      protocol: 'WireGuard',
      encryption: 'AES-256-GCM',
      ping: Math.floor(Math.random() * 50) + 10,
      speed: {
        download: Math.floor(Math.random() * 50) + 50,
        upload: Math.floor(Math.random() * 20) + 10
      },
      dataUsed: Math.floor(Math.random() * 500) + 100,
      uptime: Math.floor(Math.random() * 3600),
      lastHandshake: new Date(Date.now() - Math.random() * 60000),
      killSwitch: Math.random() > 0.1,
      dnsLeak: Math.random() > 0.95, // 5% chance of DNS leak
      webRTCLeak: Math.random() > 0.98 // 2% chance of WebRTC leak
    }

    setStatus(mockStatus)

    // Update status periodically
    const interval = setInterval(() => {
      const updatedStatus = {
        ...mockStatus,
        ping: Math.floor(Math.random() * 50) + 10,
        speed: {
          download: Math.floor(Math.random() * 50) + 50,
          upload: Math.floor(Math.random() * 20) + 10
        },
        dataUsed: mockStatus.dataUsed + Math.random() * 10,
        uptime: mockStatus.uptime + 1,
        lastHandshake: new Date(Date.now() - Math.random() * 60000)
      }
      setStatus(updatedStatus)
    }, 5000)

    setMonitoringInterval(interval)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    if (monitoringInterval) {
      clearInterval(monitoringInterval)
      setMonitoringInterval(null)
    }
    setStatus(null)
  }

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatSpeed = (speed: number) => {
    return `${speed.toFixed(1)} Mbps`
  }

  const getConnectionQuality = (ping: number) => {
    if (ping < 20) return { text: 'Excellent', color: 'text-cyber-green-400' }
    if (ping < 50) return { text: 'Good', color: 'text-cyber-blue-400' }
    if (ping < 100) return { text: 'Fair', color: 'text-yellow-400' }
    return { text: 'Poor', color: 'text-cyber-red-400' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ServerIcon className="h-6 w-6 text-cyber-blue-500 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">VPN Connection Monitor</h3>
              <p className="text-sm text-cyber-gray-400">Monitor VPN status, security, and performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {status?.connected && (
              <div className="flex items-center text-cyber-green-400">
                <div className="w-2 h-2 bg-cyber-green-500 rounded-full animate-pulse mr-2"></div>
                Connected
              </div>
            )}
            <button
              onClick={isMonitoring ? stopMonitoring : startMonitoring}
              className={`cyber-button ${isMonitoring ? 'cyber-button-danger' : ''}`}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
          </div>
        </div>

        {!isMonitoring && (
          <div className="bg-cyber-gray-200/20 rounded p-4">
            <p className="text-cyber-gray-400 text-center">
              Click &quot;Start Monitoring&quot; to begin monitoring your VPN connection status and performance.
            </p>
          </div>
        )}
      </div>

      {/* VPN Status */}
      {status && isMonitoring && (
        <div className="space-y-6">
          {/* Connection Overview */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Connection Overview</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className={`text-2xl font-bold ${status.connected ? 'text-cyber-green-400' : 'text-cyber-red-400'}`}>
                  {status.connected ? 'Connected' : 'Disconnected'}
                </div>
                <div className="text-xs text-cyber-gray-400">Status</div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-blue-400">
                  {status.ping}ms
                </div>
                <div className="text-xs text-cyber-gray-400">Ping</div>
                <div className={`text-xs mt-1 ${getConnectionQuality(status.ping).color}`}>
                  {getConnectionQuality(status.ping).text}
                </div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-purple-400">
                  {formatUptime(status.uptime)}
                </div>
                <div className="text-xs text-cyber-gray-400">Uptime</div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-green-400">
                  {status.dataUsed.toFixed(1)}MB
                </div>
                <div className="text-xs text-cyber-gray-400">Data Used</div>
              </div>
            </div>
          </div>

          {/* Connection Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Server Information */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Server Information</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Server:</span>
                  <span className="text-white font-mono">{status.server}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Location:</span>
                  <div className="flex items-center text-white">
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    {status.location}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">IP Address:</span>
                  <span className="text-white font-mono">{status.ipAddress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Protocol:</span>
                  <span className="text-cyber-green-400">{status.protocol}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Encryption:</span>
                  <span className="text-cyber-green-400">{status.encryption}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Last Handshake:</span>
                  <span className="text-white text-sm">
                    {status.lastHandshake.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Speed Test */}
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Speed Performance</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Download:</span>
                  <span className="text-cyber-green-400 font-medium">
                    {formatSpeed(status.speed.download)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyber-gray-400">Upload:</span>
                  <span className="text-cyber-blue-400 font-medium">
                    {formatSpeed(status.speed.upload)}
                  </span>
                </div>

                {/* Speed visualization */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-cyber-gray-400 mb-2">
                    <span>Download Speed</span>
                    <span>{formatSpeed(status.speed.download)}</span>
                  </div>
                  <div className="w-full bg-cyber-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyber-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((status.speed.download / 100) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-cyber-gray-400 mb-2">
                    <span>Upload Speed</span>
                    <span>{formatSpeed(status.speed.upload)}</span>
                  </div>
                  <div className="w-full bg-cyber-gray-200 rounded-full h-2">
                    <div
                      className="bg-cyber-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((status.speed.upload / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Checks */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Security Status</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${
                status.killSwitch
                  ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
                  : 'bg-cyber-red-500/10 border-cyber-red-500/30'
              }`}>
                <div className="flex items-center mb-2">
                  {status.killSwitch ? (
                    <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 mr-2" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-cyber-red-500 mr-2" />
                  )}
                  <span className="font-medium text-white">Kill Switch</span>
                </div>
                <p className="text-sm text-cyber-gray-400">
                  {status.killSwitch
                    ? 'Active - Prevents data leaks'
                    : 'Inactive - Risk of data exposure'
                  }
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                !status.dnsLeak
                  ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
                  : 'bg-cyber-red-500/10 border-cyber-red-500/30'
              }`}>
                <div className="flex items-center mb-2">
                  {!status.dnsLeak ? (
                    <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 mr-2" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-cyber-red-500 mr-2" />
                  )}
                  <span className="font-medium text-white">DNS Leak</span>
                </div>
                <p className="text-sm text-cyber-gray-400">
                  {!status.dnsLeak
                    ? 'No DNS leaks detected'
                    : 'DNS requests leaking outside VPN'
                  }
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                !status.webRTCLeak
                  ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
                  : 'bg-cyber-red-500/10 border-cyber-red-500/30'
              }`}>
                <div className="flex items-center mb-2">
                  {!status.webRTCLeak ? (
                    <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 mr-2" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-cyber-red-500 mr-2" />
                  )}
                  <span className="font-medium text-white">WebRTC Leak</span>
                </div>
                <p className="text-sm text-cyber-gray-400">
                  {!status.webRTCLeak
                    ? 'WebRTC properly blocked'
                    : 'IP address leaking via WebRTC'
                  }
                </p>
              </div>
            </div>

            {(status.dnsLeak || status.webRTCLeak || !status.killSwitch) && (
              <div className="mt-4 p-4 bg-cyber-red-500/10 border border-cyber-red-500/30 rounded">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-cyber-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-cyber-red-400 mb-1">Security Issues Detected</h5>
                    <p className="text-sm text-cyber-gray-400">
                      Your VPN configuration has security vulnerabilities. Consider:
                    </p>
                    <ul className="text-sm text-cyber-gray-400 mt-2 space-y-1 ml-4">
                      {!status.killSwitch && <li>• Enable kill switch to prevent data leaks</li>}
                      {status.dnsLeak && <li>• Configure DNS leak protection</li>}
                      {status.webRTCLeak && <li>• Block WebRTC or use browser extension</li>}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">VPN Best Practices</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Use Kill Switch</h5>
                    <p className="text-xs text-cyber-gray-400">Prevents data leaks if VPN disconnects</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Check for Leaks</h5>
                    <p className="text-xs text-cyber-gray-400">Regularly test for DNS and WebRTC leaks</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Choose Strong Protocols</h5>
                    <p className="text-xs text-cyber-gray-400">Prefer WireGuard or OpenVPN over PPTP</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Server Location</h5>
                    <p className="text-xs text-cyber-gray-400">Choose servers close to your location for better speed</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">No-Logs Policy</h5>
                    <p className="text-xs text-cyber-gray-400">Verify VPN provider doesn&apos;t keep activity logs</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Regular Testing</h5>
                    <p className="text-xs text-cyber-gray-400">Test VPN connection and security weekly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
