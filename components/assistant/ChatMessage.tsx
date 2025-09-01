'use client'

import { UserIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { Message } from './ChatInterface'

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser
              ? 'bg-cyber-green-500/20 border border-cyber-green-500'
              : 'bg-cyber-blue-500/20 border border-cyber-blue-500'
          }`}>
            {isUser ? (
              <UserIcon className="h-5 w-5 text-cyber-green-500" />
            ) : (
              <CpuChipIcon className="h-5 w-5 text-cyber-blue-500" />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className={`rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-cyber-green-500 text-black'
            : 'bg-cyber-gray-200 border border-cyber-gray-300'
        }`}>
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>

          {/* Timestamp */}
          <div className={`text-xs mt-2 ${
            isUser ? 'text-black/70' : 'text-cyber-gray-400'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {message.suggestions && message.suggestions.length > 0 && (
        <div className="w-full mt-3">
          <div className="flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs bg-cyber-gray-200/50 hover:bg-cyber-gray-200 text-cyber-gray-400 hover:text-white px-3 py-2 rounded-full border border-cyber-gray-300 hover:border-cyber-gray-400 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
