'use client'

import { useState } from 'react'
import { QuestionMarkCircleIcon, BookOpenIcon, ChatBubbleLeftRightIcon, PlayIcon } from '@heroicons/react/24/outline'
import { FAQSection } from '@/components/help/FAQSection'
import { UserGuide } from '@/components/help/UserGuide'
import { VideoTutorials } from '@/components/help/VideoTutorials'
import { Support } from '@/components/help/Support'

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<'faq' | 'guide' | 'videos' | 'support'>('faq')

  const sections = [
    {
      id: 'faq',
      name: 'FAQ',
      description: 'Frequently asked questions',
      icon: QuestionMarkCircleIcon,
      color: 'cyber-blue'
    },
    {
      id: 'guide',
      name: 'User Guide',
      description: 'Comprehensive documentation',
      icon: BookOpenIcon,
      color: 'cyber-green'
    },
    {
      id: 'videos',
      name: 'Video Tutorials',
      description: 'Learn with video guides',
      icon: PlayIcon,
      color: 'cyber-purple'
    },
    {
      id: 'support',
      name: 'Support',
      description: 'Get help and contact us',
      icon: ChatBubbleLeftRightIcon,
      color: 'cyber-red'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Help & Documentation</h1>
          <p className="text-cyber-gray-500 mt-1">
            Find answers, learn features, and get support for DesAIgn
          </p>
        </div>
        <QuestionMarkCircleIcon className="h-8 w-8 text-cyber-green-500" />
      </div>

      {/* Help Navigation */}
      <div className="cyber-card">
        <h3 className="text-xl font-semibold text-white mb-4">Help Categories</h3>
        <div className="grid-responsive-1 gap-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 text-left ${
                activeSection === section.id
                  ? 'border-cyber-green-500 bg-cyber-green-500/10'
                  : 'border-cyber-gray-300 bg-cyber-gray-200/30 hover:bg-cyber-gray-200/50'
              }`}
            >
              <div className="flex items-center mb-3">
                <section.icon className={`h-6 w-6 mr-3 ${
                  activeSection === section.id ? 'text-cyber-green-500' : 'text-cyber-gray-400'
                }`} />
                <h4 className="font-medium text-white">{section.name}</h4>
              </div>
              <p className="text-sm text-cyber-gray-400">{section.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active Help Section */}
      <div className="min-h-[600px]">
        {activeSection === 'faq' && <FAQSection />}
        {activeSection === 'guide' && <UserGuide />}
        {activeSection === 'videos' && <VideoTutorials />}
        {activeSection === 'support' && <Support />}
      </div>
    </div>
  )
}
