'use client'

import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline'
import { ChatMessage } from './ChatMessage'
import { QuickActions } from './QuickActions'
import { TypingIndicator } from './TypingIndicator'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  suggestions?: string[]
}

const initialSuggestions = [
  "Is my system secure right now?",
  "Show me unusual login attempts",
  "How do I secure my email against phishing?",
  "What are the latest security threats?",
  "Help me configure my firewall",
  "Check for data breaches"
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI cybersecurity assistant. I can help you with security analysis, threat detection, and provide recommendations to keep your systems safe. What would you like to know?",
      timestamp: new Date(),
      suggestions: initialSuggestions
    }
  ])

  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleVoiceInput = () => {
    if (isListening) {
      setIsListening(false)
      // In a real implementation, this would stop voice recognition
    } else {
      setIsListening(true)
      // In a real implementation, this would start voice recognition
      setTimeout(() => {
        setIsListening(false)
        handleSendMessage("Voice input simulation: Check my security status")
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div className="cyber-card h-full flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-cyber-gray-200">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-cyber-green-500 rounded-full animate-pulse mr-3"></div>
          <div>
            <h3 className="text-lg font-semibold text-white">Security AI Assistant</h3>
            <p className="text-sm text-cyber-gray-400">Online and ready to help</p>
          </div>
        </div>
        <div className="text-sm text-cyber-gray-500">
          {mounted && currentTime ? currentTime.toLocaleTimeString() : '--:--:-- --'}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <QuickActions onAction={handleQuickAction} />
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-cyber-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about security, threats, or get recommendations..."
              className="cyber-input resize-none w-full min-h-[44px] max-h-32"
              rows={1}
              style={{ height: 'auto', minHeight: '44px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = Math.min(target.scrollHeight, 128) + 'px'
              }}
            />
          </div>

          <button
            onClick={handleVoiceInput}
            className={`p-3 rounded-lg transition-all duration-200 ${
              isListening
                ? 'bg-cyber-red-500 text-white animate-pulse'
                : 'bg-cyber-gray-200 text-cyber-gray-400 hover:text-white hover:bg-cyber-gray-300'
            }`}
          >
            {isListening ? (
              <StopIcon className="h-5 w-5" />
            ) : (
              <MicrophoneIcon className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="cyber-button p-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>

        {isListening && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center px-3 py-1 bg-cyber-red-500/20 text-cyber-red-400 rounded-full text-sm">
              <div className="w-2 h-2 bg-cyber-red-500 rounded-full animate-pulse mr-2"></div>
              Listening...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function generateAIResponse(userInput: string): Message {
  const responses = {
    security: {
      response: "Your system appears to be in a secure state. I've analyzed recent activity and found no critical threats. Here's what I recommend:\n\n✅ Firewall is active\n✅ Antivirus is up to date\n✅ No suspicious login attempts detected\n\nKeep monitoring your system regularly and ensure all software is updated.",
      suggestions: [
        "Show me recent security events",
        "How can I improve my password security?",
        "Check for software updates"
      ]
    },
    login: {
      response: "I've checked your login history. I found 3 failed login attempts from an unrecognized IP address (203.45.67.89) yesterday. This could indicate a brute force attack attempt.\n\n**Recommended actions:**\n• Enable two-factor authentication\n• Change your password\n• Monitor for additional suspicious activity\n\nWould you like me to help you secure your account further?",
      suggestions: [
        "Help me enable 2FA",
        "Generate a strong password",
        "Block suspicious IP addresses"
      ]
    },
    phishing: {
      response: "Phishing attacks are one of the most common cyber threats. Here's how to protect yourself:\n\n🛡️ **Email Protection:**\n• Never click links from unknown senders\n• Verify email addresses carefully\n• Use email filters and antivirus\n\n🛡️ **Browser Protection:**\n• Keep browsers updated\n• Use HTTPS everywhere\n• Enable browser security features\n\n🛡️ **General Tips:**\n• Be suspicious of urgent requests\n• Verify requests through other channels\n• Use unique passwords for each account",
      suggestions: [
        "Check my email security settings",
        "How do I spot phishing emails?",
        "Set up email filters"
      ]
    },
    default: {
      response: "I understand you're asking about security. Let me provide you with relevant information and recommendations based on current best practices.\n\nCould you provide more details about what specific security concern you'd like help with?",
      suggestions: [
        "Analyze my current security setup",
        "Help me with password security",
        "Explain common cyber threats"
      ]
    }
  }

  let responseType = 'default'
  const input = userInput.toLowerCase()

  if (input.includes('secure') || input.includes('security') || input.includes('status')) {
    responseType = 'security'
  } else if (input.includes('login') || input.includes('attempt')) {
    responseType = 'login'
  } else if (input.includes('phishing') || input.includes('email')) {
    responseType = 'phishing'
  }

  return {
    id: Date.now().toString(),
    type: 'assistant',
    content: responses[responseType as keyof typeof responses].response,
    timestamp: new Date(),
    suggestions: responses[responseType as keyof typeof responses].suggestions
  }
}
