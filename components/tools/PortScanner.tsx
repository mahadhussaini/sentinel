'use client'

import { useState } from 'react'
import { KeyIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, CpuChipIcon } from '@heroicons/react/24/outline'

interface PortResult {
  port: number
  status: 'open' | 'closed' | 'filtered'
  service: string
  risk: 'low' | 'medium' | 'high'
  description: string
}

interface ScanResult {
  target: string
  ports: PortResult[]
  scanTime: number
  totalPorts: number
  openPorts: number
  riskLevel: 'low' | 'medium' | 'high'
}

export function PortScanner() {
  const [target, setTarget] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')
  const [scanType, setScanType] = useState<'common' | 'full' | 'custom'>('common')

  const commonPorts = [
    { port: 21, service: 'FTP', risk: 'medium' as const },
    { port: 22, service: 'SSH', risk: 'low' as const },
    { port: 23, service: 'Telnet', risk: 'high' as const },
    { port: 25, service: 'SMTP', risk: 'medium' as const },
    { port: 53, service: 'DNS', risk: 'low' as const },
    { port: 80, service: 'HTTP', risk: 'low' as const },
    { port: 110, service: 'POP3', risk: 'medium' as const },
    { port: 143, service: 'IMAP', risk: 'medium' as const },
    { port: 443, service: 'HTTPS', risk: 'low' as const },
    { port: 993, service: 'IMAPS', risk: 'low' as const },
    { port: 995, service: 'POP3S', risk: 'low' as const },
    { port: 3389, service: 'RDP', risk: 'high' as const }
  ]

  const scanPorts = async () => {
    if (!target) {
      setError('Please enter a target IP or hostname')
      return
    }

    if (!isValidTarget(target)) {
      setError('Please enter a valid IP address or hostname')
      return
    }

    setIsScanning(true)
    setError('')
    setResult(null)

    // Simulate port scanning
    const portsToScan = scanType === 'common' ? commonPorts :
                       scanType === 'full' ? Array.from({ length: 1024 }, (_, i) => ({
                         port: i + 1,
                         service: 'Unknown',
                         risk: 'low' as const
                       })) : commonPorts

    setTimeout(() => {
      const mockResults: PortResult[] = portsToScan.map(port => ({
        port: port.port,
        status: Math.random() > 0.7 ? 'open' : Math.random() > 0.5 ? 'filtered' : 'closed',
        service: port.service,
        risk: port.risk,
        description: getPortDescription(port.port, port.service)
      }))

      const scanResult: ScanResult = {
        target,
        ports: mockResults,
        scanTime: Math.floor(Math.random() * 30) + 10,
        totalPorts: mockResults.length,
        openPorts: mockResults.filter(p => p.status === 'open').length,
        riskLevel: getOverallRisk(mockResults)
      }

      setResult(scanResult)
      setIsScanning(false)
    }, 3000 + Math.random() * 2000)
  }

  const isValidTarget = (target: string): boolean => {
    // Simple validation for IP or hostname
    const ipRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/
    const hostnameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z]{2,})+$/
    return ipRegex.test(target) || hostnameRegex.test(target)
  }

  const getPortDescription = (port: number, service: string): string => {
    const descriptions: { [key: string]: string } = {
      '21': 'File Transfer Protocol - used for transferring files',
      '22': 'Secure Shell - secure remote access',
      '23': 'Telnet - unencrypted remote access (insecure)',
      '25': 'Simple Mail Transfer Protocol - email sending',
      '53': 'Domain Name System - DNS resolution',
      '80': 'Hypertext Transfer Protocol - web traffic',
      '110': 'Post Office Protocol - email retrieval',
      '143': 'Internet Message Access Protocol - email access',
      '443': 'HTTP Secure - encrypted web traffic',
      '993': 'IMAP Secure - secure email access',
      '995': 'POP3 Secure - secure email retrieval',
      '3389': 'Remote Desktop Protocol - remote desktop access'
    }
    return descriptions[port.toString()] || `${service} service`
  }

  const getOverallRisk = (ports: PortResult[]): 'low' | 'medium' | 'high' => {
    const highRiskOpen = ports.filter(p => p.status === 'open' && p.risk === 'high').length
    const mediumRiskOpen = ports.filter(p => p.status === 'open' && p.risk === 'medium').length

    if (highRiskOpen > 0) return 'high'
    if (mediumRiskOpen > 2) return 'high'
    if (mediumRiskOpen > 0) return 'medium'
    return 'low'
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-cyber-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-cyber-green-400'
      default: return 'text-cyber-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-cyber-red-400 bg-cyber-red-500/20'
      case 'filtered': return 'text-yellow-400 bg-yellow-500/20'
      case 'closed': return 'text-cyber-green-400 bg-cyber-green-500/20'
      default: return 'text-cyber-gray-400 bg-cyber-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Port Scanner</h3>
        <p className="text-cyber-gray-400 mb-6">
          Scan for open ports and identify potential security vulnerabilities on target systems.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-cyber-gray-400 mb-2">Target</label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 or example.com"
                className="cyber-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-cyber-gray-400 mb-2">Scan Type</label>
              <select
                value={scanType}
                onChange={(e) => setScanType(e.target.value as any)}
                className="cyber-input w-full"
              >
                <option value="common">Common Ports (12 ports)</option>
                <option value="full">Full Range (1-1024)</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={scanPorts}
              disabled={isScanning}
              className="cyber-button px-6"
            >
              {isScanning ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Scanning...
                </div>
              ) : (
                <div className="flex items-center">
                  <CpuChipIcon className="h-4 w-4 mr-2" />
                  Start Scan
                </div>
              )}
            </button>
          </div>

          {error && (
            <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-3">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 text-cyber-red-500 mr-2" />
                <span className="text-cyber-red-400">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Results */}
      {result && (
        <div className="space-y-6">
          {/* Scan Summary */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Scan Summary</h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-white">{result.totalPorts}</div>
                <div className="text-xs text-cyber-gray-400">Ports Scanned</div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-green-400">{result.totalPorts - result.openPorts}</div>
                <div className="text-xs text-cyber-gray-400">Closed</div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-red-400">{result.openPorts}</div>
                <div className="text-xs text-cyber-gray-400">Open</div>
              </div>
              <div className="bg-cyber-gray-200/20 rounded p-4 text-center">
                <div className={`text-2xl font-bold ${getRiskColor(result.riskLevel)}`}>
                  {result.riskLevel.toUpperCase()}
                </div>
                <div className="text-xs text-cyber-gray-400">Risk Level</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-cyber-gray-400">
              <span>Target: <span className="text-white font-mono">{result.target}</span></span>
              <span>Scan Time: <span className="text-white">{result.scanTime}s</span></span>
            </div>
          </div>

          {/* Port Details */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Port Details</h4>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {result.ports.map(port => (
                <div key={port.port} className="flex items-center justify-between p-3 bg-cyber-gray-200/20 rounded">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm font-mono text-white w-16">{port.port}</div>
                    <div className="text-sm text-white">{port.service}</div>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(port.status)}`}>
                      {port.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-medium ${getRiskColor(port.risk)}`}>
                      {port.risk.toUpperCase()} RISK
                    </span>
                    {port.status === 'open' && (
                      <ExclamationTriangleIcon className={`h-4 w-4 ${getRiskColor(port.risk)}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Recommendations */}
          {result.openPorts > 0 && (
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Security Recommendations</h4>

              <div className="space-y-3">
                {result.ports.filter(p => p.status === 'open' && p.risk === 'high').length > 0 && (
                  <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-4">
                    <div className="flex items-start">
                      <ExclamationTriangleIcon className="h-5 w-5 text-cyber-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-cyber-red-400">High-Risk Ports Open</h5>
                        <p className="text-sm text-cyber-gray-400">
                          Close high-risk ports immediately or restrict access to trusted IPs only.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-cyber-gray-200/20 rounded p-4">
                    <h5 className="font-medium text-white mb-2">Immediate Actions</h5>
                    <ul className="text-sm text-cyber-gray-400 space-y-1">
                      <li>• Configure firewall rules</li>
                      <li>• Disable unnecessary services</li>
                      <li>• Use intrusion detection</li>
                      <li>• Regular port scanning</li>
                    </ul>
                  </div>

                  <div className="bg-cyber-gray-200/20 rounded p-4">
                    <h5 className="font-medium text-white mb-2">Best Practices</h5>
                    <ul className="text-sm text-cyber-gray-400 space-y-1">
                      <li>• Principle of least privilege</li>
                      <li>• Network segmentation</li>
                      <li>• Regular security audits</li>
                      <li>• Keep systems updated</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Information */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Port Scanning Guide</h4>

        <div className="space-y-4 text-sm text-cyber-gray-400">
          <div>
            <h5 className="font-medium text-white mb-2">What are Ports?</h5>
            <p>Ports are communication endpoints that allow computers to send and receive data. Different services use different ports (e.g., HTTP uses port 80, HTTPS uses port 443).</p>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Port Status Meanings</h5>
            <ul className="space-y-1 ml-4">
              <li><strong className="text-cyber-green-400">Closed:</strong> Port is not accepting connections</li>
              <li><strong className="text-cyber-red-400">Open:</strong> Port is accepting connections</li>
              <li><strong className="text-yellow-400">Filtered:</strong> Port status cannot be determined (likely blocked by firewall)</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Security Considerations</h5>
            <p>Only necessary ports should be open. Open ports can be exploited by attackers. Always use firewalls and keep systems updated.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
