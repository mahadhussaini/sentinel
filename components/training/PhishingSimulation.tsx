'use client'

import { useState, useEffect } from 'react'
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon, EyeIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline'

interface PhishingEmail {
  id: string
  from: string
  subject: string
  preview: string
  isPhishing: boolean
  redFlags: string[]
  explanation: string
  sender: string
  content: string
}

const mockEmails: PhishingEmail[] = [
  {
    id: '1',
    from: 'support@paypal-secure.com',
    subject: 'URGENT: Your PayPal Account Has Been Limited',
    preview: 'Dear valued customer, your account access has been temporarily restricted...',
    isPhishing: true,
    redFlags: ['Suspicious domain', 'Urgent language', 'Account limitation threat'],
    explanation: 'This is a phishing email pretending to be from PayPal. Real PayPal emails come from @paypal.com, not paypal-secure.com. The urgent language is designed to create panic.',
    sender: 'Fraudster',
    content: `Dear PayPal Customer,

Your account has been temporarily LIMITED due to unusual activity.

To restore full access, please verify your account information immediately by clicking the link below:

[VERIFY ACCOUNT NOW]

If you do not verify within 24 hours, your account will be permanently suspended.

Thank you,
PayPal Security Team`
  },
  {
    id: '2',
    from: 'amazon@order-update.amazon.com',
    subject: 'Your Amazon Order #123-4567890-1234567',
    preview: 'Your order has shipped! Track your package here...',
    isPhishing: true,
    redFlags: ['Subdomain mismatch', 'Generic greeting', 'Unexpected attachment'],
    explanation: 'This email uses a suspicious subdomain and includes an attachment that could contain malware. Legitimate Amazon emails come from @amazon.com.',
    sender: 'Fake Amazon',
    content: `Hello,

Your recent order has shipped! Please find your tracking information attached.

If you have any questions, please contact our support team.

Best regards,
Amazon Customer Service

[Download Tracking Info.pdf]`
  },
  {
    id: '3',
    from: 'hr@company.com',
    subject: 'Updated Employee Handbook - Please Review',
    preview: 'Dear team, we have updated our employee handbook with new policies...',
    isPhishing: false,
    redFlags: [],
    explanation: 'This appears to be a legitimate internal company email about policy updates. It uses the correct company domain and has appropriate content.',
    sender: 'HR Department',
    content: `Dear Team,

We have updated our employee handbook to include new remote work policies and updated benefits information.

Please review the attached document and acknowledge receipt by replying to this email.

Key updates include:
- New remote work guidelines
- Updated health insurance options
- Revised vacation policy

Thank you,
Human Resources`
  },
  {
    id: '4',
    from: 'microsoft@account-security.live.com',
    subject: 'Security Alert: Unusual Sign-in Activity',
    preview: 'We detected unusual sign-in activity on your Microsoft account...',
    isPhishing: true,
    redFlags: ['Microsoft subdomain', 'Account compromise fear', 'Suspicious link'],
    explanation: 'This phishing email uses a fake Microsoft subdomain and creates fear about account compromise to trick users into clicking malicious links.',
    sender: 'Account Hacker',
    content: `Microsoft Account Security Alert

We have detected unusual sign-in activity on your Microsoft account.

Your account may have been compromised. To secure your account:

1. Click here to reset your password: [SECURE ACCOUNT]
2. Verify your identity
3. Review recent activity

Failure to act immediately may result in account suspension.

Microsoft Security Team`
  }
]

export function PhishingSimulation() {
  const [currentEmail, setCurrentEmail] = useState<PhishingEmail>(mockEmails[0])
  const [showResult, setShowResult] = useState(false)
  const [userGuess, setUserGuess] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [completedEmails, setCompletedEmails] = useState<string[]>([])
  const [showContent, setShowContent] = useState(false)

  const handleGuess = (isPhishing: boolean) => {
    setUserGuess(isPhishing)
    setShowResult(true)

    if (isPhishing === currentEmail.isPhishing) {
      setScore(prev => prev + 10)
    }

    setCompletedEmails(prev => [...prev, currentEmail.id])
  }

  const nextEmail = () => {
    const remainingEmails = mockEmails.filter(email => !completedEmails.includes(email.id))
    if (remainingEmails.length > 0) {
      setCurrentEmail(remainingEmails[0])
    } else {
      // Reset for another round
      setCompletedEmails([])
      setCurrentEmail(mockEmails[0])
    }
    setShowResult(false)
    setUserGuess(null)
    setShowContent(false)
  }

  const resetSimulation = () => {
    setCurrentEmail(mockEmails[0])
    setShowResult(false)
    setUserGuess(null)
    setScore(0)
    setCompletedEmails([])
    setShowContent(false)
  }

  const getScoreColor = () => {
    const percentage = (score / (mockEmails.length * 10)) * 100
    if (percentage >= 80) return 'text-cyber-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-cyber-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <EnvelopeIcon className="h-6 w-6 text-cyber-red-500 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Phishing Email Simulation</h3>
              <p className="text-sm text-cyber-gray-400">Identify phishing emails and learn red flags</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getScoreColor()}`}>
              {score}/{mockEmails.length * 10}
            </div>
            <div className="text-xs text-cyber-gray-400">Score</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-cyber-gray-400">
            Email {completedEmails.length + 1} of {mockEmails.length}
          </div>
          <button
            onClick={resetSimulation}
            className="text-cyber-gray-400 hover:text-white text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Email Display */}
      <div className="cyber-card">
        <div className="border border-cyber-gray-300 rounded-lg p-4 bg-cyber-gray-200/20">
          {/* Email Header */}
          <div className="border-b border-cyber-gray-300 pb-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium text-white">From: {currentEmail.from}</div>
              <button
                onClick={() => setShowContent(!showContent)}
                className="text-cyber-gray-400 hover:text-white flex items-center text-sm"
              >
                <EyeIcon className="h-4 w-4 mr-1" />
                {showContent ? 'Hide' : 'View'} Content
              </button>
            </div>
            <div className="font-medium text-white mb-2">Subject: {currentEmail.subject}</div>
            <div className="text-cyber-gray-400 text-sm">{currentEmail.preview}</div>
          </div>

          {/* Email Content */}
          {showContent && (
            <div className="mb-4">
              <div className="bg-white text-black p-4 rounded border font-mono text-sm whitespace-pre-wrap">
                {currentEmail.content}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!showResult && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleGuess(true)}
                className="cyber-button-danger flex-1"
              >
                <ShieldExclamationIcon className="h-4 w-4 mr-2" />
                This is Phishing
              </button>
              <button
                onClick={() => handleGuess(false)}
                className="cyber-button flex-1"
              >
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                This is Safe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className="cyber-card">
          <div className={`p-4 rounded-lg border ${
            userGuess === currentEmail.isPhishing
              ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
              : 'bg-cyber-red-500/10 border-cyber-red-500/30'
          }`}>
            <div className="flex items-center mb-3">
              {userGuess === currentEmail.isPhishing ? (
                <CheckCircleIcon className="h-6 w-6 text-cyber-green-500 mr-3" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-cyber-red-500 mr-3" />
              )}
              <div>
                <h4 className={`font-medium ${
                  userGuess === currentEmail.isPhishing ? 'text-cyber-green-400' : 'text-cyber-red-400'
                }`}>
                  {userGuess === currentEmail.isPhishing ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-sm text-cyber-gray-400">
                  This email {currentEmail.isPhishing ? 'is' : 'is not'} phishing
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-white mb-2">Explanation:</h5>
              <p className="text-sm text-cyber-gray-400">{currentEmail.explanation}</p>
            </div>

            {currentEmail.redFlags.length > 0 && (
              <div className="mb-4">
                <h5 className="font-medium text-white mb-2">Red Flags:</h5>
                <div className="flex flex-wrap gap-2">
                  {currentEmail.redFlags.map((flag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-cyber-red-500/20 text-cyber-red-400 px-2 py-1 rounded"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-cyber-gray-400">
                Sender: {currentEmail.sender}
              </div>
              <button
                onClick={nextEmail}
                className="cyber-button"
              >
                Next Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phishing Tips */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Phishing Detection Tips</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Check the Sender</h5>
                <p className="text-xs text-cyber-gray-400">Hover over email addresses to see the real sender</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Look for Urgency</h5>
                <p className="text-xs text-cyber-gray-400">Phishers create panic to make you act quickly</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Verify Links</h5>
                <p className="text-xs text-cyber-gray-400">Hover over links to see the actual destination</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Generic Greetings</h5>
                <p className="text-xs text-cyber-gray-400">Legitimate companies use your name</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Unexpected Requests</h5>
                <p className="text-xs text-cyber-gray-400">Be suspicious of requests for personal information</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-white">Contact Directly</h5>
                <p className="text-xs text-cyber-gray-400">Verify suspicious emails by contacting the company directly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
