'use client'

import { useState, useEffect } from 'react'
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useNotifications } from '@/contexts/NotificationContext'

interface PasswordStrength {
  score: number
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong'
  color: string
  checks: {
    length: boolean
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    special: boolean
    noCommon: boolean
    noPersonal: boolean
  }
}

const commonPasswords = [
  'password', '123456', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', 'dragon'
]

export function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    label: 'Very Weak',
    color: 'bg-cyber-red-500',
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      numbers: false,
      special: false,
      noCommon: true,
      noPersonal: true
    }
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [generatedPassword, setGeneratedPassword] = useState('')
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (password) {
      analyzePassword(password)
    } else {
      resetAnalysis()
    }
  }, [password])

  const analyzePassword = (pwd: string) => {
    const checks = {
      length: pwd.length >= 12,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      numbers: /\d/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      noCommon: !commonPasswords.includes(pwd.toLowerCase()),
      noPersonal: !/(19|20)\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(pwd)
    }

    const score = Object.values(checks).filter(Boolean).length
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'] as const
    const colors = [
      'bg-cyber-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-cyber-blue-500',
      'bg-cyber-green-500'
    ]

    setStrength({
      score,
      label: labels[Math.min(score, 4)],
      color: colors[Math.min(score, 4)],
      checks
    })

    // Generate suggestions
    const newSuggestions: string[] = []
    if (!checks.length) newSuggestions.push('Use at least 12 characters')
    if (!checks.uppercase) newSuggestions.push('Include uppercase letters (A-Z)')
    if (!checks.lowercase) newSuggestions.push('Include lowercase letters (a-z)')
    if (!checks.numbers) newSuggestions.push('Include numbers (0-9)')
    if (!checks.special) newSuggestions.push('Include special characters (!@#$%^&*)')
    if (!checks.noCommon) newSuggestions.push('Avoid common passwords')
    if (!checks.noPersonal) newSuggestions.push('Avoid personal information')

    setSuggestions(newSuggestions)
  }

  const resetAnalysis = () => {
    setStrength({
      score: 0,
      label: 'Very Weak',
      color: 'bg-cyber-red-500',
      checks: {
        length: false,
        uppercase: false,
        lowercase: false,
        numbers: false,
        special: false,
        noCommon: true,
        noPersonal: true
      }
    })
    setSuggestions([])
  }

  const generateStrongPassword = () => {
    const chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    }

    let password = ''
    const length = 16

    // Ensure at least one of each type
    password += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)]
    password += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)]
    password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)]
    password += chars.special[Math.floor(Math.random() * chars.special.length)]

    // Fill the rest randomly
    const allChars = chars.lowercase + chars.uppercase + chars.numbers + chars.special
    for (let i = password.length; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('')

    setGeneratedPassword(password)
    setPassword(password)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Input */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Password Strength Checker</h3>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password to analyze..."
              className="cyber-input pr-12 w-full"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyber-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Strength Indicator */}
          {password && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-cyber-gray-400">Strength:</span>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  strength.label === 'Strong' ? 'text-cyber-green-400 bg-cyber-green-500/20' :
                  strength.label === 'Good' ? 'text-cyber-blue-400 bg-cyber-blue-500/20' :
                  strength.label === 'Fair' ? 'text-yellow-400 bg-yellow-500/20' :
                  'text-cyber-red-400 bg-cyber-red-500/20'
                }`}>
                  {strength.label}
                </span>
              </div>

              <div className="w-full bg-cyber-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                  style={{ width: `${(strength.score / 7) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Generate Password Button */}
          <button
            onClick={generateStrongPassword}
            className="cyber-button w-full"
          >
            Generate Strong Password
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {password && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Criteria Checklist */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Security Criteria</h4>

            <div className="space-y-3">
              {Object.entries(strength.checks).map(([key, passed]) => (
                <div key={key} className="flex items-center space-x-3">
                  {passed ? (
                    <CheckCircleIcon className="h-5 w-5 text-cyber-green-500 flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-cyber-red-500 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${passed ? 'text-cyber-green-400' : 'text-cyber-red-400'}`}>
                    {key === 'length' && 'At least 12 characters'}
                    {key === 'uppercase' && 'Contains uppercase letters'}
                    {key === 'lowercase' && 'Contains lowercase letters'}
                    {key === 'numbers' && 'Contains numbers'}
                    {key === 'special' && 'Contains special characters'}
                    {key === 'noCommon' && 'Not a common password'}
                    {key === 'noPersonal' && 'No personal information'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="cyber-card">
            <h4 className="text-lg font-semibold text-white mb-4">Improvement Suggestions</h4>

            {suggestions.length > 0 ? (
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-cyber-gray-400">{suggestion}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircleIcon className="h-12 w-12 text-cyber-green-500 mx-auto mb-4" />
                <p className="text-cyber-gray-400">Your password meets all security criteria!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generated Password */}
      {generatedPassword && (
        <div className="cyber-card">
          <h4 className="text-lg font-semibold text-white mb-4">Generated Password</h4>

          <div className="bg-cyber-gray-200/30 rounded p-4">
            <div className="flex items-center justify-between">
              <code className="text-cyber-green-400 font-mono text-lg">{generatedPassword}</code>
              <button
                onClick={() => copyToClipboard(generatedPassword)}
                className="cyber-button text-sm ml-4"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-cyber-gray-400">
            <p>💡 <strong>Tip:</strong> Store this password securely in a password manager and never reuse it across multiple accounts.</p>
          </div>
        </div>
      )}

      {/* Password Tips */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Password Security Tips</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Use Long Passphrases</h5>
                <p className="text-xs text-cyber-gray-400">Combine multiple words: &quot;BlueHorseBatteryStaple&quot; is stronger than &quot;B!ueH0rse&quot;</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Unique Passwords</h5>
                <p className="text-xs text-cyber-gray-400">Never reuse passwords across different accounts</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Regular Updates</h5>
                <p className="text-xs text-cyber-gray-400">Change passwords every 3-6 months for critical accounts</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Password Managers</h5>
                <p className="text-xs text-cyber-gray-400">Use secure password managers to generate and store complex passwords</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Two-Factor Authentication</h5>
                <p className="text-xs text-cyber-gray-400">Always enable 2FA when available for additional security</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Avoid Patterns</h5>
                <p className="text-xs text-cyber-gray-400">Don&apos;t use predictable patterns like &quot;Password123&quot; or keyboard sequences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
