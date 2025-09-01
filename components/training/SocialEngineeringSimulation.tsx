'use client'

import { useState } from 'react'
import { UserGroupIcon, CheckCircleIcon, XCircleIcon, PhoneIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface SocialEngineeringScenario {
  id: string
  type: 'phone' | 'email' | 'person' | 'website'
  title: string
  attacker: string
  scenario: string
  attackerMessage: string
  redFlags: string[]
  correctResponse: 'ignore' | 'verify' | 'report' | 'hang_up'
  explanation: string
  consequences: string
}

const scenarios: SocialEngineeringScenario[] = [
  {
    id: '1',
    type: 'phone',
    title: 'Tech Support Scam',
    attacker: 'Fake Microsoft Support',
    scenario: 'You receive a call from someone claiming to be Microsoft technical support',
    attackerMessage: 'Hello, this is Microsoft technical support. We\'ve detected a virus on your computer. I need you to give me remote access to fix it.',
    redFlags: ['Unsolicited call', 'Urgency tactics', 'Request for remote access', 'Claims to be from Microsoft'],
    correctResponse: 'hang_up',
    explanation: 'Legitimate tech companies never call you unsolicited and never ask for remote access to your computer. This is a common tech support scam.',
    consequences: 'Scammers would gain access to your computer, steal personal information, or install malware.'
  },
  {
    id: '2',
    type: 'email',
    title: 'CEO Fraud',
    attacker: 'Fake Executive',
    scenario: 'You receive an email from your company\'s CEO asking for urgent wire transfer',
    attackerMessage: 'Hi, I\'m in an important meeting and need you to wire $50,000 immediately to this account for a business deal. Don\'t tell anyone - it\'s confidential.',
    redFlags: ['Urgent request', 'Confidential nature', 'Unusual payment method', 'Emotional pressure'],
    correctResponse: 'verify',
    explanation: 'Business email compromise attacks target employees with authority. Always verify unusual requests through multiple channels.',
    consequences: 'Company loses money, and the fraudster disappears with the funds.'
  },
  {
    id: '3',
    type: 'person',
    title: 'Tailgating Attempt',
    attacker: 'Fake Delivery Person',
    scenario: 'Someone shows up at your office door claiming to have a delivery but forgot their access card',
    attackerMessage: 'Hi, I have a package for the IT department. I forgot my access card - could you let me in? It\'ll just take a second.',
    redFlags: ['Unexpected visitor', 'Forgot access card', 'Urgent delivery', 'Asking to bypass security'],
    correctResponse: 'verify',
    explanation: 'Physical security is just as important as digital security. Always verify the identity of unexpected visitors.',
    consequences: 'Unauthorized person gains access to sensitive areas, potentially stealing data or equipment.'
  },
  {
    id: '4',
    type: 'website',
    title: 'Fake Login Page',
    attacker: 'Phishing Website',
    scenario: 'You receive a text message with a link to "verify your bank account"',
    attackerMessage: 'URGENT: Your bank account needs verification. Click here: [malicious-link]. If not verified in 24 hours, account will be suspended.',
    redFlags: ['Unsolicited message', 'Urgent threat', 'Suspicious link', 'Account suspension threat'],
    correctResponse: 'ignore',
    explanation: 'Banks never send unsolicited links for account verification. Always go directly to the official website or app.',
    consequences: 'Your login credentials are stolen, leading to account compromise and potential identity theft.'
  },
  {
    id: '5',
    type: 'email',
    title: 'Prize Winner Scam',
    attacker: 'Fake Lottery Company',
    scenario: 'You receive an email claiming you\'ve won a large prize',
    attackerMessage: 'Congratulations! You\'ve won $1,000,000 in our international lottery! To claim your prize, send $500 processing fee to this account.',
    redFlags: ['Unexpected prize', 'Request for money', 'Foreign lottery', 'Processing fee required'],
    correctResponse: 'ignore',
    explanation: 'Legitimate lotteries don\'t require you to pay to claim prizes. This is a classic advance-fee scam.',
    consequences: 'You lose the processing fee, and the scammer may continue asking for more money.'
  }
]

export function SocialEngineeringSimulation() {
  const [currentScenario, setCurrentScenario] = useState<SocialEngineeringScenario>(scenarios[0])
  const [userResponse, setUserResponse] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string>('')

  const responseOptions = [
    { value: 'ignore', label: 'Ignore and Delete', icon: '🚫' },
    { value: 'verify', label: 'Verify Independently', icon: '🔍' },
    { value: 'report', label: 'Report to Security', icon: '🚨' },
    { value: 'hang_up', label: 'Hang Up Immediately', icon: '📞' }
  ]

  const handleResponse = (response: string) => {
    setUserResponse(response)
    setShowResult(true)

    const isCorrect = response === currentScenario.correctResponse
    if (isCorrect) {
      setScore(prev => prev + 10)
      setFeedback('Correct! You made the right security decision.')
    } else {
      setFeedback('Incorrect. Let\'s learn from this scenario.')
    }

    setCompletedScenarios(prev => [...prev, currentScenario.id])
  }

  const nextScenario = () => {
    const remainingScenarios = scenarios.filter(s => !completedScenarios.includes(s.id))
    if (remainingScenarios.length > 0) {
      setCurrentScenario(remainingScenarios[0])
    } else {
      // Reset for another round
      setCompletedScenarios([])
      setCurrentScenario(scenarios[0])
    }
    setShowResult(false)
    setUserResponse('')
    setFeedback('')
  }

  const resetSimulation = () => {
    setCurrentScenario(scenarios[0])
    setShowResult(false)
    setUserResponse('')
    setScore(0)
    setCompletedScenarios([])
    setFeedback('')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone': return PhoneIcon
      case 'email': return ChatBubbleLeftRightIcon
      case 'person': return UserGroupIcon
      case 'website': return ExclamationTriangleIcon
      default: return ExclamationTriangleIcon
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'phone': return 'text-cyber-green-400'
      case 'email': return 'text-cyber-blue-400'
      case 'person': return 'text-cyber-purple-400'
      case 'website': return 'text-cyber-red-400'
      default: return 'text-cyber-gray-400'
    }
  }

  const TypeIcon = getTypeIcon(currentScenario.type)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cyber-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserGroupIcon className="h-6 w-6 text-cyber-purple-500 mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-white">Social Engineering Defense</h3>
              <p className="text-sm text-cyber-gray-400">Learn to recognize and respond to social engineering attacks</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${score >= 30 ? 'text-cyber-green-400' : score >= 20 ? 'text-yellow-400' : 'text-cyber-red-400'}`}>
              {score}/{scenarios.length * 10}
            </div>
            <div className="text-xs text-cyber-gray-400">Score</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-cyber-gray-400">
            Scenario {completedScenarios.length + 1} of {scenarios.length}
          </div>
          <button
            onClick={resetSimulation}
            className="text-cyber-gray-400 hover:text-white text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Scenario */}
      <div className="cyber-card">
        <div className="flex items-center mb-4">
          <TypeIcon className={`h-5 w-5 ${getTypeColor(currentScenario.type)} mr-2`} />
          <h4 className="text-lg font-semibold text-white">{currentScenario.title}</h4>
        </div>

        <div className="mb-6">
          <h5 className="font-medium text-white mb-2">Scenario:</h5>
          <p className="text-cyber-gray-400 bg-cyber-gray-200/20 rounded p-4">
            {currentScenario.scenario}
          </p>
        </div>

        <div className="mb-6">
          <h5 className="font-medium text-white mb-2">Attacker Message:</h5>
          <div className="bg-cyber-red-500/10 border border-cyber-red-500/30 rounded p-4">
            <div className="flex items-start">
              <div className="text-cyber-red-400 text-sm font-medium mr-2">⚠️</div>
              <p className="text-cyber-gray-300 italic">&quot;{currentScenario.attackerMessage}&quot;</p>
            </div>
          </div>
        </div>

        {!showResult && (
          <div>
            <h5 className="font-medium text-white mb-4">How would you respond?</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {responseOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(option.value)}
                  className="cyber-button text-left"
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {showResult && (
        <div className="cyber-card">
          <div className={`p-4 rounded-lg border mb-6 ${
            userResponse === currentScenario.correctResponse
              ? 'bg-cyber-green-500/10 border-cyber-green-500/30'
              : 'bg-cyber-red-500/10 border-cyber-red-500/30'
          }`}>
            <div className="flex items-center mb-3">
              {userResponse === currentScenario.correctResponse ? (
                <CheckCircleIcon className="h-6 w-6 text-cyber-green-500 mr-3" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-cyber-red-500 mr-3" />
              )}
              <div>
                <h5 className={`font-medium ${
                  userResponse === currentScenario.correctResponse ? 'text-cyber-green-400' : 'text-cyber-red-400'
                }`}>
                  {feedback}
                </h5>
                <p className="text-sm text-cyber-gray-400">
                  Your response: <span className="font-medium">{responseOptions.find(o => o.value === userResponse)?.label}</span>
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-sm font-medium text-white mb-2">Explanation:</h6>
              <p className="text-sm text-cyber-gray-400">{currentScenario.explanation}</p>
            </div>

            <div className="mb-4">
              <h6 className="text-sm font-medium text-cyber-red-400 mb-2">Potential Consequences:</h6>
              <p className="text-sm text-cyber-gray-400">{currentScenario.consequences}</p>
            </div>

            <div>
              <h6 className="text-sm font-medium text-cyber-yellow-400 mb-2">Red Flags in this scenario:</h6>
              <div className="flex flex-wrap gap-2">
                {currentScenario.redFlags.map((flag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-cyber-yellow-500/20 text-cyber-yellow-400 px-2 py-1 rounded"
                  >
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-cyber-gray-400">
              Best response: <span className="font-medium text-cyber-green-400">
                {responseOptions.find(o => o.value === currentScenario.correctResponse)?.label}
              </span>
            </div>
            <button
              onClick={nextScenario}
              className="cyber-button"
            >
              Next Scenario
            </button>
          </div>
        </div>
      )}

      {/* Social Engineering Education */}
      <div className="cyber-card">
        <h4 className="text-lg font-semibold text-white mb-4">Social Engineering Tactics</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-red-400 mb-2">🎭 Pretexting</h5>
              <p className="text-sm text-cyber-gray-400">
                Creating a fabricated scenario to obtain information. Attackers pretend to be someone they&apos;re not.
              </p>
            </div>

            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-orange-400 mb-2">⏰ Urgency</h5>
              <p className="text-sm text-cyber-gray-400">
                Creating time pressure to make you act without thinking. &quot;Act now or lose access!&quot;
              </p>
            </div>

            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-purple-400 mb-2">👔 Authority</h5>
              <p className="text-sm text-cyber-gray-400">
                Claiming to be from a position of authority (boss, government, tech support).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-blue-400 mb-2">🤝 Trust</h5>
              <p className="text-sm text-cyber-gray-400">
                Building rapport and trust before asking for sensitive information.
              </p>
            </div>

            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-green-400 mb-2">🎁 Greed</h5>
              <p className="text-sm text-cyber-gray-400">
                Appealing to greed with promises of prizes, money, or rewards.
              </p>
            </div>

            <div className="bg-cyber-gray-200/20 rounded p-4">
              <h5 className="font-medium text-cyber-yellow-400 mb-2">🛡️ Defense Tips</h5>
              <ul className="text-sm text-cyber-gray-400 space-y-1">
                <li>• Always verify requests independently</li>
                <li>• Never share sensitive info unsolicited</li>
                <li>• Be suspicious of urgent requests</li>
                <li>• Report suspicious activity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
