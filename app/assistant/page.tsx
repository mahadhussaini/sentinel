'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/assistant/ChatInterface'
import { AIAnalysisPanel } from '@/components/assistant/AIAnalysisPanel'
import { SecurityInsights } from '@/components/assistant/SecurityInsights'
import { ChatBubbleLeftRightIcon, CpuChipIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function AssistantPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'analysis' | 'insights'>('chat')

  const tabs = [
    { id: 'chat', name: 'AI Assistant', icon: ChatBubbleLeftRightIcon },
    { id: 'analysis', name: 'Threat Analysis', icon: CpuChipIcon },
    { id: 'insights', name: 'Security Insights', icon: LightBulbIcon }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Security Assistant</h1>
          <p className="text-cyber-gray-500 mt-1">
            Intelligent threat analysis and security recommendations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyber-green-500 rounded-full animate-pulse"></div>
          <span className="text-cyber-green-500 text-sm font-mono">AI ONLINE</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-cyber-gray-200/20 p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-cyber-green-500 text-black shadow-lg'
                : 'text-cyber-gray-400 hover:text-white hover:bg-cyber-gray-200/30'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="min-h-[600px]">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'analysis' && <AIAnalysisPanel />}
        {activeTab === 'insights' && <SecurityInsights />}
      </div>
    </div>
  )
}
