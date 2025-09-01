'use client'

import { useState, useEffect } from 'react'
import { DevicePhoneMobileIcon, KeyIcon, ShieldCheckIcon, XCircleIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

interface TwoFactorMethod {
  id: string
  name: string
  description: string
  icon: any
  setupSteps: string[]
  pros: string[]
  cons: string[]
}

interface AuthAttempt {
  id: string
  timestamp: Date
  method: string
  success: boolean
  details: string
}

const twoFactorMethods: TwoFactorMethod[] = [
  {
    id: 'authenticator',
    name: 'Authenticator App',
    description: 'Use an app like Google Authenticator or Authy to generate codes',
    icon: DevicePhoneMobileIcon,
    setupSteps: [
      'Download an authenticator app',
      'Scan the QR code from your account settings',
      'Enter the 6-digit code to verify'
    ],
    pros: [
      'Works offline',
      'Most secure option',
      'No SMS fees',
      'Backup codes available'
    ],
    cons: [
      'Requires smartphone',
      'App must be accessible during login'
    ]
  },
  {
    id: 'sms',
    name: 'SMS/Text Message',
    description: 'Receive verification codes via text message',
    icon: KeyIcon,
    setupSteps: [
      'Enter your phone number',
      'Receive verification code',
      'Enter code to complete setup'
    ],
    pros: [
      'Easy to set up',
      'Works on any phone',
      'No additional apps needed'
    ],
    cons: [
      'SMS can be intercepted',
      'Delayed delivery possible',
      'Phone number changes require updates'
    ]
  },
  {
    id: 'hardware',
    name: 'Hardware Key',
    description: 'Use a physical security key like YubiKey',
    icon: ShieldCheckIcon,
    setupSteps: [
      'Insert hardware key into USB port',
      'Follow device-specific setup instructions',
      'Test authentication flow'
    ],
    pros: [
      'Highest security level',
      'Resistant to phishing',
      'Works offline',
      'No batteries required'
    ],
    cons: [
      'Most expensive option',
      'Physical device required',
      'Can be lost or damaged'
    ]
  }
]

export function TwoFactorSimulator() {
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod>(twoFactorMethods[0])
  const [currentStep, setCurrentStep] = useState(0)
  const [verificationCode, setVerificationCode] = useState('')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResult, setSimulationResult] = useState<'success' | 'failure' | null>(null)
  const [authHistory, setAuthHistory] = useState<AuthAttempt[]>([])
  const [timeLeft, setTimeLeft] = useState(30)

  useEffect(() => {
    if (isSimulating && selectedMethod.id === 'authenticator') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsSimulating(false)
            setSimulationResult('failure')
            addAuthAttempt('authenticator', false, 'Code expired')
            clearInterval(timer)
            return 30
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isSimulating, selectedMethod.id])

  const startSimulation = () => {
    setIsSimulating(true)
    setSimulationResult(null)
    setVerificationCode('')
    setCurrentStep(0)

    if (selectedMethod.id === 'sms') {
      // Simulate SMS delay
      setTimeout(() => {
        setVerificationCode('123456') // Mock code
      }, 2000)
    } else if (selectedMethod.id === 'authenticator') {
      setTimeLeft(30)
      // Mock TOTP code generation
      setVerificationCode(Math.floor(100000 + Math.random() * 900000).toString())
    }
  }

  const verifyCode = () => {
    const success = verificationCode === '123456' // Mock verification
    setSimulationResult(success ? 'success' : 'failure')
    setIsSimulating(false)
    addAuthAttempt(selectedMethod.name, success, success ? 'Valid code entered' : 'Invalid code')
  }

  const addAuthAttempt = (method: string, success: boolean, details: string) => {
    const attempt: AuthAttempt = {
      id: Date.now().toString(),
      timestamp: new Date(),
      method,
      success,
      details
    }
    setAuthHistory(prev => [attempt, ...prev.slice(0, 9)]) // Keep last 10 attempts
  }

  const resetSimulation = () => {
    setIsSimulating(false)
    setSimulationResult(null)
    setVerificationCode('')
    setCurrentStep(0)
    setTimeLeft(30)
  }

  return (
    <div className="space-y-6">
      {/* Method Selection */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Choose 2FA Method</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {twoFactorMethods.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                selectedMethod.id === method.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-2">
                <method.icon className={`h-5 w-5 mr-2 ${
                  selectedMethod.id === method.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <h4 className="font-medium text-white">{method.name}</h4>
              </div>
              <p className="text-sm text-cyber-gray-400">{method.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Method Details */}
      <div className="cyber-card">
        <div className="flex items-center mb-4">
          <selectedMethod.icon className="h-6 w-6 text-cyber-green-500 mr-3" />
          <h4 className="text-lg font-semibold text-white">{selectedMethod.name} Setup</h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Setup Steps */}
          <div>
            <h5 className="font-medium text-white mb-3">Setup Steps:</h5>
            <ol className="list-decimal list-inside space-y-2 text-sm text-cyber-gray-400">
              {selectedMethod.setupSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Pros and Cons */}
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-cyber-green-400 mb-2">Pros:</h5>
              <ul className="space-y-1 text-sm text-cyber-gray-400">
                {selectedMethod.pros.map((pro, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 text-cyber-green-500 mr-2 flex-shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-cyber-red-400 mb-2">Cons:</h5>
              <ul className="space-y-1 text-sm text-cyber-gray-400">
                {selectedMethod.cons.map((con, index) => (
                  <li key={index} className="flex items-center">
                    <XCircleIcon className="h-4 w-4 text-cyber-red-500 mr-2 flex-shrink-0" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">2FA Simulation</h4>

        <div className="space-y-4">
          {!isSimulating && !simulationResult && (
            <button
              onClick={startSimulation}
              className="cyber-button w-full"
            >
              Start {selectedMethod.name} Simulation
            </button>
          )}

          {isSimulating && (
            <div className="space-y-4">
              <div className="bg-cyber-blue-500/10 border border-cyber-blue-500/30 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyber-blue-400 font-medium">
                    {selectedMethod.id === 'sms' ? 'SMS Sent!' : 'Authenticator Code Generated'}
                  </span>
                  {selectedMethod.id === 'authenticator' && (
                    <div className="flex items-center text-cyber-red-400">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm font-mono">{timeLeft}s</span>
                    </div>
                  )}
                </div>

                {selectedMethod.id === 'sms' && (
                  <p className="text-sm text-cyber-gray-400">
                    Check your phone for the verification code
                  </p>
                )}

                {selectedMethod.id === 'authenticator' && (
                  <p className="text-sm text-cyber-gray-400">
                    Use this code in your authenticator app
                  </p>
                )}
              </div>

              {verificationCode && (
                <div className="space-y-3">
                  <div className="bg-cyber-gray-200/30 rounded p-4">
                    <div className="text-center">
                      <div className="text-2xl font-mono font-bold text-cyber-green-400 mb-2">
                        {verificationCode}
                      </div>
                      <p className="text-xs text-cyber-gray-400">
                        {selectedMethod.id === 'sms' ? 'Your SMS verification code' : 'Your TOTP code'}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <input
                      type="text"
                      placeholder="Enter verification code"
                      className="cyber-input flex-1"
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button
                      onClick={verifyCode}
                      className="cyber-button"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {simulationResult && (
            <div className={`p-4 rounded-lg border ${
              simulationResult === 'success'
                ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
                : 'bg-cyber-red-500/10 border-cyber-red-500/30'
            }`}>
              <div className="flex items-center">
                {simulationResult === 'success' ? (
                  <CheckCircleIcon className="h-6 w-6 text-cyber-green-500 mr-3" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-cyber-red-500 mr-3" />
                )}
                <div>
                  <h5 className={`font-medium ${
                    simulationResult === 'success' ? 'text-cyber-green-400' : 'text-cyber-red-400'
                  }`}>
                    {simulationResult === 'success' ? 'Authentication Successful!' : 'Authentication Failed'}
                  </h5>
                  <p className="text-sm text-cyber-gray-400">
                    {simulationResult === 'success'
                      ? 'You have successfully completed two-factor authentication.'
                      : 'The verification code was incorrect or expired.'
                    }
                  </p>
                </div>
              </div>

              <button
                onClick={resetSimulation}
                className="mt-4 cyber-button w-full"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Authentication History */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Authentication Attempts</h4>

        {authHistory.length === 0 ? (
          <div className="text-center py-8">
            <ShieldCheckIcon className="h-12 w-12 text-cyber-gray-400 mx-auto mb-4" />
            <p className="text-cyber-gray-400">No authentication attempts yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {authHistory.map(attempt => (
              <div
                key={attempt.id}
                className="flex items-center justify-between p-3 bg-cyber-gray-200/20 rounded"
              >
                <div className="flex items-center space-x-3">
                  {attempt.success ? (
                    <CheckCircleIcon className="h-5 w-5 text-cyber-green-500" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-cyber-red-500" />
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">{attempt.method}</div>
                    <div className="text-xs text-cyber-gray-400">{attempt.details}</div>
                  </div>
                </div>
                <div className="text-xs text-cyber-gray-500">
                  {attempt.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">2FA Security Best Practices</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-white">Use Authenticator Apps</h5>
                <p className="text-xs text-cyber-gray-400">More secure than SMS, works offline</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-white">Backup Codes</h5>
                <p className="text-xs text-cyber-gray-400">Store backup codes securely for emergencies</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <XCircleIcon className="h-5 w-5 text-cyber-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-white">Avoid SMS-Only</h5>
                <p className="text-xs text-cyber-gray-400">SMS can be intercepted by attackers</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-medium text-white">Multiple Methods</h5>
                <p className="text-xs text-cyber-gray-400">Use different 2FA methods for different accounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
