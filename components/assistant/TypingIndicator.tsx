'use client'

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-cyber-blue-500/20 border border-cyber-blue-500">
            <div className="w-2 h-2 bg-cyber-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="bg-cyber-gray-200 border border-cyber-gray-300 rounded-lg px-4 py-3">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-cyber-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyber-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-cyber-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-cyber-gray-400 ml-2">AI is analyzing...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
