'use client'

import { useState } from 'react'
import { MagnifyingGlassIcon, ShieldCheckIcon, ExclamationTriangleIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface BreachResult {
  email: string
  breaches: {
    name: string
    domain: string
    breachDate: string
    description: string
    dataClasses: string[]
    isVerified: boolean
    isFabricated: boolean
    isSensitive: boolean
    isRetired: boolean
    isSpamList: boolean
  }[]
  found: boolean
}

// Mock breach data for demonstration
const mockBreaches = [
  {
    name: 'Adobe',
    domain: 'adobe.com',
    breachDate: '2013-10-04',
    description: 'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, encrypted password and a password hint in plain text. The password cryptography was poorly done and many were quickly resolved back to plain text. The unencrypted hints also disclosed much about the passwords adding further to the risk that hundreds of millions of Adobe customers already faced.',
    dataClasses: ['Email addresses', 'Passwords', 'Usernames'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    isRetired: false,
    isSpamList: false
  },
  {
    name: 'LinkedIn',
    domain: 'linkedin.com',
    breachDate: '2012-05-05',
    description: 'In May 2012, LinkedIn suffered a data breach that exposed 6.4 million user passwords. The passwords were hashed using SHA-1, but many were easily cracked due to weak hashing and lack of salt.',
    dataClasses: ['Email addresses', 'Passwords'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    isRetired: false,
    isSpamList: false
  },
  {
    name: 'Yahoo',
    domain: 'yahoo.com',
    breachDate: '2013-08-28',
    description: 'Yahoo suffered a major breach in 2013 affecting 3 billion accounts. The breach included email addresses, hashed passwords, and other personal information.',
    dataClasses: ['Email addresses', 'Passwords', 'Names', 'Phone numbers'],
    isVerified: true,
    isFabricated: false,
    isSensitive: false,
    isRetired: false,
    isSpamList: false
  }
]

export function BreachChecker() {
  const [email, setEmail] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<BreachResult | null>(null)
  const [error, setError] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const checkBreaches = async () => {
    if (!email) {
      setError('Please enter an email address')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsChecking(true)
    setError('')
    setResult(null)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock breach check - in real implementation, this would call an API
    const hasBreaches = Math.random() > 0.5
    const breaches = hasBreaches ? mockBreaches.slice(0, Math.floor(Math.random() * 3) + 1) : []

    const breachResult: BreachResult = {
      email,
      breaches,
      found: breaches.length > 0
    }

    setResult(breachResult)
    setSearchHistory(prev => [email, ...prev.filter(e => e !== email)].slice(0, 5))
    setIsChecking(false)
  }

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const clearResult = () => {
    setResult(null)
    setError('')
  }

  const getSeverityColor = (breachCount: number) => {
    if (breachCount === 0) return 'text-cyber-green-400'
    if (breachCount <= 2) return 'text-yellow-400'
    return 'text-cyber-red-400'
  }

  const getSeverityLabel = (breachCount: number) => {
    if (breachCount === 0) return 'Safe'
    if (breachCount <= 2) return 'Caution'
    return 'High Risk'
  }

  return (
    <div className="space-y-6">
      {/* Email Input */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Data Breach Checker</h3>
        <p className="text-cyber-gray-400 mb-6">
          Check if your email address has been involved in known data breaches
          This helps you identify accounts that may need password changes.
        </p>

        <div className="space-y-4">
          <div className="flex space-x-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="cyber-input flex-1"
              onKeyPress={(e) => e.key === 'Enter' && checkBreaches()}
            />
            <button
              onClick={checkBreaches}
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
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Check
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
          {/* Summary */}
          <div className="cyber-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Check Results</h4>
              <button
                onClick={clearResult}
                className="text-cyber-gray-400 hover:text-white text-sm"
              >
                Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
                <div className={`text-2xl font-bold ${getSeverityColor(result.breaches.length)}`}>
                  {result.breaches.length}
                </div>
                <div className="text-xs text-cyber-gray-400">Breaches Found</div>
              </div>
              <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
                <div className={`text-2xl font-bold ${getSeverityColor(result.breaches.length)}`}>
                  {getSeverityLabel(result.breaches.length)}
                </div>
                <div className="text-xs text-cyber-gray-400">Risk Level</div>
              </div>
              <div className="bg-cyber-gray-200/30 rounded p-4 text-center">
                <div className="text-2xl font-bold text-cyber-blue-400">
                  {result.email}
                </div>
                <div className="text-xs text-cyber-gray-400">Checked Email</div>
              </div>
            </div>

            {result.found ? (
              <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-6 w-6 text-cyber-red-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-cyber-red-400 mb-2">Security Risk Detected</h5>
                    <p className="text-sm text-cyber-gray-400">
                      Your email address appears in {result.breaches.length} known data breach{result.breaches.length !== 1 ? 'es' : ''}.
                      It&apos;s recommended to change passwords for affected accounts and enable two-factor authentication.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-cyber-green-500/10 border border-cyber-green-500/30 rounded p-4">
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-6 w-6 text-cyber-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-cyber-green-400 mb-2">No Breaches Found</h5>
                    <p className="text-sm text-cyber-gray-400">
                      Good news! Your email address was not found in any known data breaches.
                      Continue practicing good security habits to maintain this status.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Breach Details */}
          {result.found && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Breach Details</h4>

              {result.breaches.map((breach, index) => (
                <div key={index} className="cyber-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="text-lg font-semibold text-white">{breach.name}</h5>
                      <p className="text-sm text-cyber-gray-400">{breach.domain}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-cyber-gray-400">Breach Date</div>
                      <div className="text-sm text-white">{new Date(breach.breachDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <p className="text-sm text-cyber-gray-400 mb-4">{breach.description}</p>

                  <div className="mb-4">
                    <h6 className="text-sm font-medium text-white mb-2">Compromised Data:</h6>
                    <div className="flex flex-wrap gap-2">
                      {breach.dataClasses.map((dataClass, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-cyber-red-500/20 text-cyber-red-400 px-2 py-1 rounded"
                        >
                          {dataClass}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {breach.isVerified && (
                        <span className="text-xs text-cyber-green-400 flex items-center">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      )}
                      {breach.isSensitive && (
                        <span className="text-xs text-cyber-red-400 flex items-center">
                          <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                          Sensitive
                        </span>
                      )}
                    </div>

                    <button className="text-cyber-blue-400 hover:text-cyber-blue-300 text-sm">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="cyber-card">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Searches</h4>
          <div className="space-y-2">
            {searchHistory.map((searchEmail, index) => (
              <button
                key={index}
                onClick={() => setEmail(searchEmail)}
                className="w-full text-left p-3 bg-cyber-gray-200/20 hover:bg-cyber-gray-200/30 rounded transition-colors"
              >
                <div className="text-sm text-cyber-gray-400">{searchEmail}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Information */}
      <div className="cyber-card">
        <div className="flex items-start">
          <InformationCircleIcon className="h-6 w-6 text-cyber-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">How It Works</h4>
            <div className="space-y-2 text-sm text-cyber-gray-400">
              <p>
                This tool checks your email address against a database of known data breaches.
                If your email appears in a breach, it means that data associated with your account
                may have been exposed.
              </p>
              <p>
                <strong>What to do if you&apos;re affected:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Change passwords for affected accounts immediately</li>
                <li>Enable two-factor authentication wherever possible</li>
                <li>Monitor your accounts for suspicious activity</li>
                <li>Consider using unique passwords for each account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
