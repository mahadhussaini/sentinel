'use client'

import { useState } from 'react'
import { GlobeAltIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface SSLResult {
  domain: string
  valid: boolean
  issuer: string
  expiryDate: Date
  daysUntilExpiry: number
  protocol: string
  cipher: string
  keySize: number
  issues: string[]
}

export function SSLChecker() {
  const [domain, setDomain] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<SSLResult | null>(null)
  const [error, setError] = useState('')

  const checkSSL = async () => {
    if (!domain) {
      setError('Please enter a domain name')
      return
    }

    if (!isValidDomain(domain)) {
      setError('Please enter a valid domain name')
      return
    }

    setIsChecking(true)
    setError('')
    setResult(null)

    // Simulate SSL check
    setTimeout(() => {
      const mockResult: SSLResult = {
        domain,
        valid: Math.random() > 0.2, // 80% chance of valid
        issuer: 'Let\'s Encrypt Authority X3',
        expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000),
        daysUntilExpiry: Math.floor(Math.random() * 365),
        protocol: 'TLS 1.3',
        cipher: 'ECDHE-RSA-AES256-GCM-SHA384',
        keySize: 2048,
        issues: Math.random() > 0.5 ? ['Certificate expires soon', 'Weak cipher suite'] : []
      }
      setResult(mockResult)
      setIsChecking(false)
    }, 2000)
  }

  const isValidDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(?:\.[a-zA-Z]{2,})+$/
    return domainRegex.test(domain)
  }

  const getSSLStatusColor = (result: SSLResult) => {
    if (!result.valid) return 'text-cyber-red-400'
    if (result.daysUntilExpiry < 30) return 'text-orange-400'
    if (result.daysUntilExpiry < 90) return 'text-yellow-400'
    return 'text-cyber-green-400'
  }

  const getSSLStatusText = (result: SSLResult) => {
    if (!result.valid) return 'Invalid'
    if (result.daysUntilExpiry < 30) return 'Expiring Soon'
    if (result.daysUntilExpiry < 90) return 'Expires Soon'
    return 'Valid'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">SSL Certificate Checker</h3>
        <p className="text-cyber-gray-400 mb-6">
          Verify SSL certificates, check expiry dates, and assess security configurations for any website.
        </p>

        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="cyber-input flex-1"
              onKeyPress={(e) => e.key === 'Enter' && checkSSL()}
            />
            <button
              onClick={checkSSL}
              disabled={isChecking}
              className="cyber-button px-6"
            >
              {isChecking ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Checking...
                </div>
              ) : (
                <div className="flex items-center">
                  <GlobeAltIcon className="h-4 w-4 mr-2" />
                  Check SSL
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

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Certificate Status */}
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Certificate Status</h4>
              <div className={`flex items-center ${
                result.valid ? 'text-cyber-green-400' : 'text-cyber-red-400'
              }`}>
                {result.valid ? (
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                ) : (
                  <XCircleIcon className="h-5 w-5 mr-2" />
                )}
                <span className="font-medium">{getSSLStatusText(result)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-cyber-gray-200/20 rounded p-4">
                  <h5 className="font-medium text-white mb-2">Certificate Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Domain:</span>
                      <span className="text-white font-mono">{result.domain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Issuer:</span>
                      <span className="text-white">{result.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Expires:</span>
                      <span className={`font-medium ${getSSLStatusColor(result)}`}>
                        {result.expiryDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Days Left:</span>
                      <span className={`font-medium ${getSSLStatusColor(result)}`}>
                        {result.daysUntilExpiry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-cyber-gray-200/20 rounded p-4">
                  <h5 className="font-medium text-white mb-2">Security Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Protocol:</span>
                      <span className="text-cyber-green-400">{result.protocol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Cipher:</span>
                      <span className="text-white font-mono text-xs">{result.cipher.split('-')[0]}-{result.cipher.split('-')[1]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Key Size:</span>
                      <span className="text-white">{result.keySize} bits</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-cyber-gray-400">Status:</span>
                      <span className={`font-medium ${result.valid ? 'text-cyber-green-400' : 'text-cyber-red-400'}`}>
                        {result.valid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="cyber-card">
              <h4 className="text-lg font-semibold text-white mb-4">Security Issues</h4>
              <div className="space-y-3">
                {result.issues.map((issue, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-cyber-red-500/10 border border-cyber-red-500/30 rounded">
                    <ExclamationTriangleIcon className="h-5 w-5 text-cyber-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-cyber-red-400 font-medium">{issue}</p>
                      <p className="text-sm text-cyber-gray-400 mt-1">
                        {issue.includes('expires') ? 'Renew certificate before expiry to maintain security.' :
                         issue.includes('cipher') ? 'Consider updating to stronger encryption algorithms.' :
                         'Address this security concern immediately.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Recommendations</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Monitor Expiry Dates</h5>
                    <p className="text-xs text-cyber-gray-400">Set up alerts for certificates expiring within 30 days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Use Strong Ciphers</h5>
                    <p className="text-xs text-cyber-gray-400">Ensure TLS 1.3 with modern cipher suites</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Automate Renewal</h5>
                    <p className="text-xs text-cyber-gray-400">Use Let&apos;s Encrypt or similar services for auto-renewal</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-medium text-white">Regular Audits</h5>
                    <p className="text-xs text-cyber-gray-400">Perform SSL checks monthly to catch issues early</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">SSL Certificate Guide</h4>

        <div className="space-y-4 text-sm text-cyber-gray-400">
          <div>
            <h5 className="font-medium text-white mb-2">What is SSL/TLS?</h5>
            <p>SSL (Secure Sockets Layer) and TLS (Transport Layer Security) are cryptographic protocols that provide secure communication over networks. They encrypt data between a client and server to prevent eavesdropping and tampering.</p>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Why SSL Matters</h5>
            <p>SSL certificates not only encrypt data but also verify the identity of websites. They protect sensitive information like passwords, credit card details, and personal data from being intercepted by attackers.</p>
          </div>

          <div>
            <h5 className="font-medium text-white mb-2">Certificate Types</h5>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>DV (Domain Validated):</strong> Basic validation, cheapest option</li>
              <li><strong>OV (Organization Validated):</strong> Validates organization details</li>
              <li><strong>EV (Extended Validation):</strong> Highest validation, shows company name in browser</li>
              <li><strong>Wildcard:</strong> Covers all subdomains of a domain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
